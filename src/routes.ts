import { Router } from 'express';
import express from "express";
import {getOboToken} from "./apiProxy";
import {verifyJWTToken, getTokenFromRequestHeader} from "./tokenValidation";

const routes = Router();
export const helloWorldRoute = routes.get('/obo/:app',
    verifyJWTToken,
    async (req, res) => {
        const token = await getOboToken(getTokenFromRequestHeader(req), req.params.app);
        res.send(token);
});


export const setupStaticServedFiles = express.static("public");