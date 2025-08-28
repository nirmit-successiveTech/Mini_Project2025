"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { userAuth } from "@/app/context/User/userContext";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const auth = userAuth();
  const router = useRouter();
  const [details, setDetails] = useState("");

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        form,
        { withCredentials: true }
      );
      setForm({ name: "", email: "", password: "" });
      await fetchUser();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users/me", {
        withCredentials: true,
      });
      setDetails(res.data.user);
    } catch (err) {
      setError("Unauthorized, please login");
    }
  };

  useEffect(() => {
    if (details?._id) {
      auth.login(details._id);
    }
    if(details){
    setTimeout(()=>{
        router.push("/");
    },1000)
    }

  }, [details]);

  if (error) {
    alert(error);
    setError("");
  }

  return (
    <form
      className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10 h-screen"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
      >
        Sign In
      </button>
    </form>
  );
}
