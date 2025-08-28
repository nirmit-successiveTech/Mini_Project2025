"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { User, Settings, LogOut, Home } from "lucide-react"; // icons
import { userAuth } from "../context/User/userContext";
import Loader from "@/components/visuals/Loader";

export default function Dashboard() {

  const { myuserId ,logout} = userAuth();
  const loggedId = myuserId;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/me", {
          withCredentials: true, 
        });
        setUser(res.data.user);
      } catch (err) {
        setError("Unauthorized, please login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [loggedId]);


  if (loading) return <div className="text-center mt-10"><Loader /></div>;
  if(!loggedId){
    return <div className="text-center mt-10 text-red-600 font-semibold h-screen">Unauthorized, please login</div>;
  }
  if (error)
    return <div className="text-center mt-10 text-red-600 font-semibold h-screen">{error}</div>;



  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-64 bg-purple-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">My Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <a
            href="/"
            className="flex items-center gap-2 p-2 rounded hover:bg-purple-700 transition"
          >
            <Home size={18} /> Home
          </a>
          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded hover:bg-purple-700 transition"
          >
            <User size={18} /> Profile
          </a>
          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded hover:bg-purple-700 transition"
          >
            <Settings size={18} /> Settings
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-2 p-2 rounded hover:bg-red-600 transition mt-auto"
          >
            <LogOut size={18}/> Logout
          </button>
        </nav>
      </aside>

 
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center bg-white shadow p-4 rounded-lg mb-6">
          <h1 className="text-2xl font-bold text-purple-700">
            Welcome, {user?.name} 
          </h1>
          <span className="text-gray-500">ID: {user?._id}</span>
        </header>

    
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm font-semibold">Email</h2>
            <p className="text-lg font-medium">{user?.email}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm font-semibold">Phone</h2>
            <p className="text-lg font-medium">{user?.phone}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm font-semibold">Address</h2>
            <p className="text-lg font-medium">{user?.address}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-500 text-sm font-semibold">Pincode</h2>
            <p className="text-lg font-medium">{user?.pincode}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
