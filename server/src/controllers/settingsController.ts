import { Response } from "express";
import { userDetails } from "../libs/constants";

export class SettingsController {

    public async fetchUserInfo(res: Response) {
        try {
            delete userDetails.password;
            return res.status(200).json({ user: userDetails });
        } catch (error) {
            return res.status(500).json({ message: "Error  while fetching user information" });
        }
    }
}