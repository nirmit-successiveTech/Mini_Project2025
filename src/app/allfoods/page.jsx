"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AddFoodButton from "@/components/visuals/addFoodButton";
import { useRouter } from "next/navigation";
import MyComponent from "@/components/visuals/TypeWriter";
import Loader from "@/components/visuals/Loader";

export default function FetchFood() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/allfood", {
          withCredentials: true,
        });
        setFoods(res.data.data);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  if (loading) return <div className="text-center"><Loader /></div>;
  if (error) return <div className="text-center text-red-500 h-screen">{error}</div>;

  return (
    <div className="m-6 h-screen">
      <MyComponent />
      <div
        className="flex justify-end m-6 gap-6"
        onClick={() => router.push("/donate-food")}
      >
        <AddFoodButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {foods.map((food) => (
          <div
            key={food._id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={food.imageUrl}
                alt={food.title}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {food.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {food.description}
              </p>
              <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                Posted by:{" "}
                <span className="font-medium text-gray-900 dark:text-gray-200">
                  {food.userId?.name}
                </span>{" "}
                ({food.userId?.email})
              </p>
              <a
                href={`/fooddetails/${food._id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
