import { Router } from 'express';
import express from "express";
import {getOboToken} from "./apiProxy";
import {verifyJWTToken, getTokenFromRequestHeader} from "./tokenValidation";

const routes = Router();
export const helloWorldRoute = routes.get('/obo/:app',
    verifyJWTToken,
    async (req, res) => {
        try {
            const tokenResponse = await getOboToken(getTokenFromRequestHeader(req), req.params.app);
            res.send(tokenResponse);
        } catch (error) {
            console.error("Error occurred:", error.stack || error); // Log the error details on the server
            res.status(500).send("An internal server error occurred."); // Send a generic error message to the client
        }
});


export const setupStaticServedFiles = express.static("public");