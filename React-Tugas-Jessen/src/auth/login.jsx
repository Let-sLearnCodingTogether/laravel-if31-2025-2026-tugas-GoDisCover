import { useDebugValue, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import http from "../api/apiClient";
import apiClient from "../api/apiClient";

export default function Login() {
  const navigate = useNavigate();
  const [logins, setLogins] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handlerOnChange = (event) => {
    const { value, name } = event.target
    setLogins({
      ...logins,
      [name]: value
    })
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      const response = await http.post("/login", logins)
      console.log(response.data)

      if (response.data?.token) {
        sessionStorage.setItem('token', response.data.token);
        setIsAuthenticated(true)
      } else {
        setError("Invalid credentials. Please try again.");
      }

    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "Something went wrong. Please try again.");

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true })
    }
  }, [isAuthenticated, navigate])
  return (
    <div className="flex flex-col flex-1 bg-gambar-1">
      <div className="bg-gambar-1 md:block">
        <div className="flex flex-col justify-center flex-1 w-full min-h-screen max-w-md mx-auto ">
          <div className="bg-gray-100 p-10 rounded-2xl">
            <div >
              <h1 className="mb-2 font-bold text-gray-800 text-2xl">
                Sign In
              </h1>
              <p className="text-sm text-gray-500 ">
                Enter your email and password to sign in!
              </p>
            </div>
            <form onSubmit={onSubmit}>
              {error && (
                <div className="px-4 py-2.5 text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg">
                  {error}
                </div>
              )}
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>{" "}
                  </label>
                  <input className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 "
                    placeholder="Your Email"
                    value={logins.email}
                    onChange={handlerOnChange}
                    label="Email"
                    name="email" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-400">
                    Password <span className="text-red-500">*</span>{" "}
                  </label>
                  <input className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-"
                    placeholder="Your Password"
                    value={logins.password}
                    onChange={handlerOnChange}
                    name="password"
                    label="Password" />
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
                Don't have an account? {""}
                <NavLink
                  to="/register"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400 font-bold"
                >
                  Register
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
