export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ICardProps {
    user: IUser;
}