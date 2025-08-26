"use client";

import { userAuth } from "@/app/context/User/userContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { login, logout, myuserId } = userAuth();
  const [username, setUsername] = useState(null)

  useEffect(()=>{
    const fetchUsername = async () => {
      try {
        console.log('..........')
        const response = await axios.get(`http://localhost:8000/api/users/me`,{
          withCredentials: true,
        });
        setUsername(response.data.user.name);
        console.log("details are in avbar", response.data.user.name);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
      fetchUsername();
  }, [myuserId]);

  console.log("my user id in navbar is", myuserId);
  console.log('username in navbar is', username);

  return (

    <nav className="bg-purple-700 text-white px-6 py-4 shadow-md z-999 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-bold tracking-wide hover:text-gray-200"
          >
            HungerHub
          </Link>

          <div className="flex gap-6">
            <Link href="/allfoods" className="hover:text-gray-200 transition">
              Server Community
            </Link>
            <Link href="/buy-food" className="hover:text-gray-200 transition">
              Buy Food
            </Link>
          </div>
        </div>
        {myuserId ? (
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300"> {username? username.slice(0, 1).toUpperCase() : "U"}</span>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-white text-purple-700 font-semibold hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
            <Link
              href="/signin"
              className="px-4 py-2 rounded-lg bg-purple-900 font-semibold hover:bg-purple-800 transition"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}