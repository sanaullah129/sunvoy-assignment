import { useContext, useEffect, useState } from 'react'
import { RouteContext } from '../context/RouterContext';

const Settings = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { navigate } = useContext(RouteContext);
  const [isUnAuthenticated, setIsUnAuthenticated] = useState<boolean>(false);

  const handleNavigate = () => {
    navigate('/list');
  };

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/users/settings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("sunvoy-token") as string || "",
        }
      });
      const data = await response.json();
      if (!response.ok) {
        if(data?.message === "Unauthorized") return setIsUnAuthenticated(true);
        alert(`Error fetching user info: ${data.message}`);
        return;
      }
      setUserInfo(data?.user);
    }
    catch (error) {
      alert("Something went wrong. Please try again later.");
    }
    finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  if(isUnAuthenticated)  return <div className="m-2">Unauthorized</div>
  if (isLoading) return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div id="settingsContent">Loading settings...</div>
      <div className="mt-6">
        <a
          href="/list"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to List
        </a>
      </div>
    </div>
  )
  return (
    userInfo && (
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <div id="settingsContent">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">User Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">User ID</label>
                  <input type="text" value={userInfo.id} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" value={userInfo.firstName} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" value={userInfo.lastName} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={userInfo.email} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500" />
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={handleNavigate} className="bg-gray-500 hover:bg-gray-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded">
              Back to List
            </button>
          </div>
        </div>
        <script>
          window.REMOTE_API_URL = "https://api.challenge.sunvoy.com";
        </script>
        <script src="/js/settings.fefd531f237bcd266fc9.js"></script>
      </div>
    )
  )
}

export default Settings
