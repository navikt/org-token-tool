import axios from "axios";
import jose from "node-jose";
import { v4 as uuidv4 } from "uuid";

import config from "./config";

export type OnBehalfOfResponse = {
  expires_in: number;
  access_token: string;
};

function getCurrentUnixTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}

async function createClientAssertion() {
  const now = getCurrentUnixTimestampInSeconds();
  const assertionPayload = {
    sub: config.azureApp.clientId,
    aud: config.azureApp.issuer,
    iss: config.azureApp.clientId,
    iat: now,
    nbf: now,
    exp: now + 60,
    jti: uuidv4(),
  };

  return jose.JWS.createSign(
    {
      alg: "RS256",
      format: "compact",
    },
    JSON.parse(config.azureApp.jwk)
  )
    .update(JSON.stringify(assertionPayload), "utf8")
    .final();
}

export async function getOboToken(userAccessToken: string, scope: string) {
  const parameters = new URLSearchParams();
  parameters.append("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
  parameters.append("client_id", config.azureApp.clientId);
  parameters.append("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer");
  parameters.append("requested_token_use", "on_behalf_of");
  parameters.append("scope", "api://"+scope+"/.default");
  parameters.append("assertion", userAccessToken);

  const clientAssertion = await createClientAssertion();
  parameters.append("client_assertion", clientAssertion.toString());

  try {
    const onBehalfOfResponse = await axios.post<OnBehalfOfResponse>(config.azureApp.tokenEndpoint, parameters, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("Requested new access token");
    return onBehalfOfResponse.data;
  } catch (error) {
    console.log("error", error);
    return error
  }
}
