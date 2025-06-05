import { Request, Response, Router } from "express";
import UserRoutes from "./controllers/router"

const router = Router();

router.get("/health", (req: Request, res: Response) => {
    res.send("Server is up and running");
});

router.use("/users", UserRoutes);

export default router;