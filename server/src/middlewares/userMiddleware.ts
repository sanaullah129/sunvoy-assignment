import { NextFunction, Request, Response } from "express";
import { UserController } from "../controllers/userController";

export class UserMiddleware {
    private _userController: UserController;

    constructor() {
        this._userController = new UserController();
    }

    public async fetchUsers(req: Request, res: Response): Promise<Response> {
        try {
            await this._userController.getUsers(req, res);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching users" });
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            if (!req.body) {
                return res.status(400).json({ message: "Request body is required" });
            }
            const { email = "", password = "" } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }
            await this._userController.login(req.body, res);

        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).json({ message: "Error  while logging in" });
        }
    }
}