import { Request, Response, Router } from "express";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
    res.send("Server is up and running");
});

export default router;