import { useContext, useEffect, useState } from 'react'
import UserCard from '../components/UserCard';
import { RouteContext } from '../context/RouterContext';

const UserList = () => {

  const [userList, setUserList] = useState([]);
  const [error, setError] = useState<boolean>(false);
  const { navigate } = useContext(RouteContext);
  const [isUnAuthenticated, setIsUnAuthenticated] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("sunvoy-token") as string || "",
        }
      });
      const data = await response.json();
      if (!response.ok) {
        if(data?.message === "Unauthorized") return setIsUnAuthenticated(true);
        alert(`Error fetching users: ${data.message}`);
        setError(true);
        return;
      }
      setUserList(data);
      console.log("Fetched users:", data);
    }
    catch (error) {
      alert("Something went wrong. Please try again later.");
      setError(true);
    }
  }

  const handleNavigation = () => {
    navigate('/settings');
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if(isUnAuthenticated)  return <div className="m-2">Unauthorized</div>
  if (error) return <div>Error fetching users. Please try again later.</div>
  if (!userList || userList.length === 0) return <div>Loading...</div>

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User List</h1>
        <div id="userList" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userList.map((user: any) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
        <div className="mt-6">
          <button onClick={handleNavigation} className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded">
            Settings
          </button>
        </div>
      </div>
    </div>

  )
}

export default UserList
