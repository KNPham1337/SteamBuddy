import React, { useEffect, useState } from "react";
import axios from "axios";

import SteamProfile from "../../../backend/src/types/types";

const BACKEND_URL = "http://localhost:3000";
const Dashboard: React.FC = () => {
  const [userInfo, setUserInfo] = useState<SteamProfile | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user-info`, {
          withCredentials: true,
        });
        console.log(response.data as SteamProfile);

        setUserInfo(response.data as SteamProfile);
      } catch (err) {
        console.error(`Error fetching user info: ${err}`);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to your dashboard!</h1>
      <p className="mt-4">Steam ID: {userInfo.id}</p>
      <p className="mt-4">Display Name: {userInfo.displayName}</p>
      <img className="mt-4" src={userInfo.photos[0].value} alt="Profile" />
    </div>
  );
};

export default Dashboard;
