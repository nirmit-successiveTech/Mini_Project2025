"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FoodForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    userId: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setForm((prevForm) => ({ ...prevForm, userId }));
    }
  }, []);

  const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:8000/api/users/postfood",
        form,
        {
          withCredentials: true,
        }
      );
      setForm({
        title: "",
        description: "",
        imageUrl: "",
        userId: "",
      });
    } catch (error) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="h-screen">
    <form
      className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add Food Item</h2>

      <div>{error && <p className="text-red-500">{error}</p>}</div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Image URL</label>
        <input
          type="url"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/food.jpg"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Your Id</label>
        <input
          type="text"
          name="userId"
          value={form.userId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
      >
        Submit
      </button>
    </form>
    </div>


  );
}
