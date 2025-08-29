"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { userAuth } from "@/app/context/User/userContext";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [error, setError] = useState("");
  const auth = userAuth();
  const router = useRouter();
  const [details, setDetails] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/register",
        form,
        {
          withCredentials: true,
        }
      );

      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        pincode: "",
      });

      toast("User Signed Up Successfully", {
        style: {
          backgroundColor: "#28a745",
          color: "white",
        },
      });
      await fetchUser();

      setTimeout(() => {
        router.push("/allfoods");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
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
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
      <div className="mb-4">
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
      <div className="mb-4">
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium">Pincode</label>
        <input
          type="text"
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
      >
        Sign Up
      </button>
    </form>
  );
}
