import express from 'express';
import {setupStaticServedFiles, helloWorldRoute} from "./routes";
import {setupActuators} from "./actuators";

class App {
    public server;

    constructor() {
        this.server = express();
        this.routes();
        setupActuators(this.server);
    }

    routes() {
        this.server.use(helloWorldRoute);
        this.server.use(setupStaticServedFiles);
    }
}

export default new App().server;