import { data } from "../libs/data";

export class UserController {
    public async getUsers(req: any, res: any): Promise<void> {
        try {
            return res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error fetching users" });
        }
    }
}