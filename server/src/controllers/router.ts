import { NextFunction, Request, Response, Router } from "express"
import { UserMiddleware } from "../middlewares/userMiddleware";
import { validateToken } from "../libs/helpers";
import { SettingsMiddleware } from "../middlewares/settingsMiddleware";

const router = Router();
const userMiddleware = new UserMiddleware();
const settingsMiddleware = new SettingsMiddleware()

router.post("/login", userMiddleware.login.bind(userMiddleware));

router.use((req: Request, res: Response, next: NextFunction) => validateToken(req, res, next));

router.get("/", userMiddleware.fetchUsers.bind(userMiddleware));
router.get("/settings", settingsMiddleware.fetchUserInfo.bind(settingsMiddleware));

export default router;