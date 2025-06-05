import { NextFunction, Request, Response, Router } from "express"
import { UserMiddleware } from "../middlewares/userMiddleware";
import { validateToken } from "../libs/helpers";

const router = Router();
const userMiddleware = new UserMiddleware();

router.post("/login", userMiddleware.login.bind(userMiddleware));

router.use((req: Request, res: Response, next: NextFunction) => validateToken(req, res, next));

router.get("/", userMiddleware.fetchUsers.bind(userMiddleware));

export default router;