import express from "express";
import {getToken, requestOboToken, validateToken} from "@navikt/oasis";

export const tokenFromRequest = async (req: express.Request, audience: string) => {
  const bearerToken = req.header("Authorization").split(" ")[1];
  const token = getToken(bearerToken);
  if (!token) {
    throw new Error("Missing token");
  }

  const validation = await validateToken(token);
  if (!validation.ok) {
    throw new Error("Invalid token");
  }

  const obo = await requestOboToken(token, `api://${audience}/.default`);
  if (!obo.ok) {
    throw new Error("Failed to acquire obo-token");
  }
  return obo.token;
}
