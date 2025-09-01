"use client";

import { userAuth } from "@/app/context/User/userContext";
import axios from "axios";
import { Bell, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSubscription } from "@apollo/client/react";
import gql from "graphql-tag";

const FOOD_ADDED_SUBSCRIPTION = gql`
  subscription OnFoodAdded {
    foodAdded {
      id
      title
      description
      imageUrl
      userId
    }
  }
`;

export default function Navbar() {
  const { myuserId } = userAuth();
  const [openPage, setOpenPage] = useState(false);
  const [username, setUsername] = useState(null);
  const router = useRouter();

  const { data } = useSubscription(FOOD_ADDED_SUBSCRIPTION);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    if (data?.foodAdded) {
      setFoods((prev) => [data.foodAdded, ...prev]);
    }
  }, [data]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/me", {
          withCredentials: true,
        });
        setUsername(response.data.user.name);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUsername();
  }, []);

  return (
    <nav className="bg-purple-700 text-white px-6 py-4 shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-bold tracking-wide hover:text-gray-200"
          >
            HungerHub
          </Link>
          <div className="flex gap-6">
            <Link href="/allfoods">Serve Community</Link>
            <Link href="/buy-food">Buy Food</Link>
          </div>
        </div>

        {myuserId ? (
          <div className="flex items-center gap-4">
            <div
              onClick={() => router.push("/dashboard")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 cursor-pointer"
            >
              {username ? username.slice(0, 1).toUpperCase() : "U"}
            </div>

            <div className="relative">
              <Bell
                onClick={() => setOpenPage(!openPage)}
                className="cursor-pointer hover:text-gray-200"
              />
              {foods.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/signup">Sign Up</Link>
            <Link href="/signin">Sign In</Link>
          </div>
        )}
      </div>

      {openPage && (
        <div className="absolute right-4 top-16 w-80 bg-white text-black rounded-xl shadow-xl border p-4 z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Notifications</h3>
            <X
              className="cursor-pointer text-gray-500 hover:text-black"
              onClick={() => setOpenPage(false)}
            />
          </div>
          <div className="max-h-96 overflow-y-auto space-y-3">
            {foods.length === 0 ? (
              <p>No notifications yet</p>
            ) : (
              foods.map((food) => (
                <div
                  key={food.id}
                  className="p-2 border rounded-lg shadow-sm bg-gray-50"
                >
                  <p className="font-semibold">🍴 {food.title}</p>
                  <p className="text-sm">{food.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
