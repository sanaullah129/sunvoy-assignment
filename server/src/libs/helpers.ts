import { NextFunction, Request, Response } from "express";
import { tokenObj, unauthorizedMsg } from "./constants";

export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization || req.header("Authorization");
    if (!token) {
        res.status(401).json({ message: unauthorizedMsg });
        return;
    }

    if (token !== tokenObj.token) {
        res.status(401).json({ message: unauthorizedMsg });
        return;
    }

    if (tokenObj.expDate && new Date(tokenObj.expDate) < new Date()) {
        res.status(401).json({ message: unauthorizedMsg });
        return;
    }

    next();
}