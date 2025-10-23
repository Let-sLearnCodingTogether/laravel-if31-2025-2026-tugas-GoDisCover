import { useDebugValue, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import http from "../api/apiClient";

export default function register() {

  const navigate = useNavigate();
  const [registers, setRegisters] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handlerOnChange = (event) => {
    const { value, name } = event.target
    setRegisters({
      ...registers,
      [name]: value
    })
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      const response = await http.post("/register", registers)
      console.log(response.data)
      setSuccess("Registration successful! Please sign in.");

    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "Something went wrong. Please try again.");

    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col flex-1 bg-gambar-1">
      <div className="flex flex-col justify-center flex-1 w-full min-h-screen max-w-md mx-auto">
        <div className="bg-gray-100 p-10 rounded-2xl">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-bold text-gray-800 dark:text-white/90 text-2xl sm:text-3xl">
              Register
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to register!
            </p>
          </div>
          <form onSubmit={onSubmit}>
            {error && (
              <div className="px-4 py-2.5 text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg">
                {error}
              </div>
            )}{success && (
              <div className="px-4 py-2.5 text-sm text-green-600 bg-green-100 border border-green-300 rounded-lg">
                {success}
              </div>
            )}
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Name <span className="text-red-500">*</span>{" "}
                </label>
                <input className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 "
                  placeholder="Your Name"
                  value={registers.name}
                  onChange={handlerOnChange}
                  label="Name"
                  name="name" />
              </div>
              <div className="space-y-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Email <span className="text-red-500">*</span>{" "}
                </label>
                <input className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 "
                  placeholder="Your Email"
                  value={registers.email}
                  onChange={handlerOnChange}
                  label="Email"
                  name="email" />
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Password <span className="text-red-500">*</span>{" "}
                  </label>
                  <input className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                    placeholder="Your Password"
                    value={registers.password}
                    onChange={handlerOnChange}
                    name="password"
                    label="Password" />
                </div>
              </div>
              <div>
                <button className="w-full bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 bg-blue-400 px-4 py-3 text-sm rounded"
                  disabled={loading}
                  type="submit">
                  Sign in
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already Have Account? {""}
              <NavLink
                to="/"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400 font-bold"
              >
                Sign In
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

