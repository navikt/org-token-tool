import {Router} from 'express';
import express from "express";
import {tokenFromRequest} from "./apiProxy";

const routes = Router();


export const oboTokenRoute = routes.get('/obo/:app',
    async (req, res) => {
        try {
            const tokenResponse = await tokenFromRequest(req, req.params["app"]);
            res.send(tokenResponse);
        } catch (error) {
            console.error("Error occurred:", error.stack || error); // Log the error details on the server
            res.status(500).send("An internal server error occurred."); // Send a generic error message to the client
        }
    });


export const setupStaticServedFiles = express.static("public");

export const livenessRoute = routes.get("/internal/health/liveness", (req, res) => res.status(200).send({
    status: "UP",
}))
export const readinessRoute = routes.get("/internal/health/readiness", (req, res) => res.status(200).send({
    status: "UP",
}))