import { UserController } from "../controllers/userController";

export class UserMiddleware {
    private _userController: UserController;

    constructor() {
        this._userController = new UserController();
    }

    public async fetchUsers(req: any, res: any, next: any): Promise<void> {
        try {
            await this._userController.getUsers(req, res);
            next();

        } catch (error) {
            res.status(500).json({ message: "Error fetching users" });
        }
    }
}