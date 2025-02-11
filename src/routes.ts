import { Router } from 'express';
import express from "express";
import {getOboToken} from "./apiProxy";
import {verifyJWTToken, getTokenFromRequestHeader} from "./tokenValidation";

const routes = Router();
export const helloWorldRoute = routes.get('/obo/:app',
    verifyJWTToken,
    async (req, res) => {
        const tokenResponse = await getOboToken(getTokenFromRequestHeader(req), req.params.app);
        if (tokenResponse.error) {
            res.status(500).send(tokenResponse.error);
        } else {
            res.send(tokenResponse);
        }
});


export const setupStaticServedFiles = express.static("public");