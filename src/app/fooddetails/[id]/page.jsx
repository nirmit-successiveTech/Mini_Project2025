"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { userAuth } from "@/app/context/User/userContext";
import Loader from "@/components/visuals/Loader";

export default function FoodDetails() {
  const params = useParams();
  const foodId = params.id;

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[fetched,setFetched]=useState(false);

  const { myuserId } = userAuth();
  const router = useRouter();

  const fetchFoodDescription = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/users/food/${foodId}`,
        { withCredentials: true }
      );
      setFood(res.data.data);
    } catch (err) {
      setError("Failed to fetch food details");
    } finally {
      setLoading(false);
    }
  };

  const currentUser = myuserId;
  const handleClaimFood = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/users/claim`,
        {
          email: food?.userId?.email,
          user: currentUser,
          status:"claimed",
          foodId:foodId
        },
        { withCredentials: true }
      );
      setFetched(true)
      alert(res.data.message || "Food claimed successfully!");
      router.push("/allfoods");
    } catch (err) {
      alert("Failed to claim food. Try again later.");
    }
  };

  useEffect(() => {
    fetchFoodDescription();
  },[fetched]);

  if (loading) return <div className="text-center mt-6"><Loader /></div>;
  if (error) return <div className="text-center text-red-600 mt-6">{error}</div>;

  return (
    <div className="min-h-screen py-10">
      <div className="flex justify-center mt-10 gap-6 max-w-6xl mx-auto">
        <div className="w-3/5">
          <img
            src={food?.imageUrl}
            alt={food?.title}
            className="w-full h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="w-2/5 flex flex-col justify-between p-6 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="text-3xl font-bold text-purple-700">
              {food?.title}
            </h2>
            <p className="mt-4 text-gray-700">{food?.description}</p>

            <div className="mt-6 space-y-2 text-gray-600">
              <p>
                <strong>Donor:</strong> {food?.userId?.name}
              </p>
              <p>
                <strong>Email:</strong> {food?.userId?.email}
              </p>
              <p>
                <strong>Phone:</strong> {food?.userId?.phone || "Not provided"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {food?.status || "Not provided"}
              </p>
            </div>
          </div>

          <button
            onClick={handleClaimFood}
            className="mt-8 w-full bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-800 transition"
          >
            Claim This Food
          </button>
        </div>
      </div>
    </div>
  );
}
