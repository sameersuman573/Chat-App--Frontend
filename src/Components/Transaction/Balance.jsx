import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Layout/Loaders";
import { Server } from "../../Constants/Config";

export const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("https://example.com/your-avatar.jpg"); // Replace with your avatar URL

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          `${Server}/api/v1/account/balance`,
          {
            withCredentials: true, // This will send the cookie along with the request
          }
        );
        setBalance(res.data.data.balance);
        console.log("this is my balance", res);
      } catch (error) {
        console.log("Error in fetching the balance", error);
        setError("Failed to fetch balance. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
      <img
        src={"https://images.unsplash.com/photo-1623582854588-d60de57fa33f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"}
        alt="Avatar"
        className="w-24 h-24 rounded-full mb-4"
      />
      <div className="font-bold text-2xl mb-4">Your Balance</div>
      <div className="font-semibold text-xl">
        {loading ? (
          <Loader color="#123abc" loading={loading} size={50} />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="text-green-500">Rs {balance}</div>
        )}
      </div>
    </div>
  );
};
