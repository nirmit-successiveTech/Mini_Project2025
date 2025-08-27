"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Loader from "@/components/visuals/Loader";

export default function ExploreDish() {
  const params = useParams();
  const [dish, setDish] = useState(null);
  const currentPrice = parseInt(Math.random() * 1000);

  useEffect(() => {
    const fetchDish = async () => {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
      );
      setDish(res.data.meals[0]);
    };
    fetchDish();
  }, []);

  if (!dish)
    return (
      <div className="text-center mt-10">
        <Loader />
      </div>
    );

  return (
    <div className="m-6 lg:m-16">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 border-l-4 border-purple-600 pl-4">
          {dish.strMeal}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/5">
          <img
            src={dish.strMealThumb}
            alt={dish.strMeal}
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>

        <div className="lg:w-3/5 space-y-6">
          <div className="text-lg text-gray-700">
            <p>
              <span className="font-semibold text-gray-900">Origin:</span>{" "}
              {dish.strArea}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Category:</span>{" "}
              {dish.strCategory}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-purple-700">
              Ingredients
            </h2>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 10 }, (_, index) =>
                dish[`strIngredient${index + 1}`] ? (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full shadow-sm hover:bg-purple-200"
                  >
                    {dish[`strIngredient${index + 1}`]}
                  </span>
                ) : null
              )}
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div>
              <button className="px-8 py-2 bg-purple-700 text-white rounded-2xl font-bold">
                Buy
              </button>
            </div>
            <div className="bg-red-600 px-8 py-2 rounded-2xl font-bold text-white tracking-tight">${currentPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
