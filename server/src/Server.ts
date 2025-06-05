import express, { Express } from "express";
import router from "./router";
import cors from 'cors';
import { API_PREFIX } from "./libs/constants";
import bodyParser from "body-parser";
export class Server {
    private app: Express;

    constructor() {
        this.app = express();
    }

    get application(): Express {
        return this.app;
    }

    public bootstrap(): void {
        this.setUpBodyParser();
        this.setUpCors();
        this.setupRoutes();
    }

    public setUpBodyParser(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    public setupRoutes(): void {
        this.app.use(API_PREFIX, router);
    }

    public setUpCors(): void {
        this.app.use(cors());
    }

    public run(): void {
        const port = process.env.PORT || 4000;
        this.app.listen(port, () => {
            console.info(`[server]: Server is running at http://localhost:${port}`);
        });
    }
}