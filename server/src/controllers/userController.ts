import { Request, Response } from "express";
import { data } from "../libs/data";
import { tokenObj, userDetails } from "../libs/constants";
import crypto from "crypto";
export class UserController {
    public async getUsers(req: Request, res: Response) {
        try {
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error fetching users" });
        }
    }

    public async login(body: any, res: Response) {
        try {
            const { email, password } = body;
            console.log("Login attempt with email:", email, " and password:", password);
            console.log("Current user details:", userDetails);
            tokenObj.token = "";
            tokenObj.expDate = null;
            if (userDetails.email !== email || userDetails.password !== password) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token: string = crypto.randomBytes(32).toString("hex");
            const expDate: Date = new Date(Date.now() + 60 * 60 * 1000); // Token valid for 1 hour

            tokenObj.token = token;
            tokenObj.expDate = expDate;

            return res.status(200).json({ token: token });
        } catch (error) {
            return res.status(500).json({ message: "Error  while logging in" });
        }
    }
}