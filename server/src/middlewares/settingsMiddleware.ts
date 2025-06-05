import { SettingsController } from "../controllers/settingsController";
import { NextFunction, Request, Response } from "express";

export class SettingsMiddleware {
    private _settingsController: SettingsController;

    constructor() {
        this._settingsController = new SettingsController();
    }

    public async fetchUserInfo(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            await this._settingsController.fetchUserInfo(res);
        } catch (error) {
            console.error("Error fetching user info:", error);
            return res.status(500).json({ message: "Error fetching users" });
        }
    }
}