"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/visuals/Loader";
import { toast, ToastContainer } from "react-toastify";

export default function AdminPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users/allfood", {
        withCredentials: true,
      });
      setFoods(res.data.data);
      console.log("food is ", foods);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this food item?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/users/removefood/${id}`, {
        withCredentials: true,
      });
      toast("Food deleted successfully");
      setFoods(foods.filter((food) => food._id !== id));
    } catch (err) {
      setError("Failed to delete food");
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/me", {
          withCredentials: true,
        });
        if (res.data.user.role == "user") {
          router.push("/");
        } else {
          await fetchFoods();
        }
      } catch (err) {
        router.push("/login");
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl mt-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div>
        <ToastContainer />
      </div>
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Admin Dashboard - Food Posts
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {foods.length === 0 ? (
          <p className="text-gray-600 text-center">No food items posted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Posted By</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food._id} className="border-t">
                    <td className="px-4 py-2 font-medium">{food.title}</td>
                    <td className="px-4 py-2">{food.description}</td>
                    <td className="px-4 py-2">{food.userId?.name}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
