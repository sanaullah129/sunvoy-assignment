import type { FC } from "react"
import type { ICardProps } from "../types/ITypes"

const UserCard: FC<ICardProps> = ({ user }) => {

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">ID: {user.id}</p>
        </div>
    )
}

export default UserCard
