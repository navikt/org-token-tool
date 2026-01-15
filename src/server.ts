import {livenessRoute, oboTokenRoute, readinessRoute, setupStaticServedFiles} from "./routes";
import express from "express";

class App {
    public server;

    constructor() {
        this.server = express();
        this.routes();
    }

    routes() {
        this.server.use(oboTokenRoute);
        this.server.use(setupStaticServedFiles);
        this.server.use(livenessRoute)
        this.server.use(readinessRoute)
    }
}

const server = new App().server;

server.listen(3000);