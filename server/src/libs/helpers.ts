import { NextFunction, Request, Response } from "express";
import { tokenObj, unauthorizedMsg } from "./constants";

export const validateToken = (req: Request, res: Response, next: NextFunction): Response => {
    const token = req.headers.authorization || req.header("Authorization");
    console.log("Token received:", token);
    console.log("Stored token:", JSON.stringify(tokenObj));
    if (!token) {
        res.status(401).json({ message: unauthorizedMsg });
        return;
    }

    if (token !== tokenObj.token) {
        return res.status(401).json({ message: unauthorizedMsg });
    }

    if (tokenObj.expDate && new Date(tokenObj.expDate) < new Date()) {
        tokenObj.token = "";
        tokenObj.expDate = null;
        return res.status(401).json({ message: unauthorizedMsg });
    }

    next();
}