/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import NavBar from "@/components/navigation/NavBar";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting:", { email, password });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <NavBar />
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md rounded-[42px] shadow-[0_35px_130px_-65px_rgb(248,86,6)] p-10 bg-white">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-4xl">Welcome</h2>
          <h2 className="text-2xl mb-8">Sign Up To Get Started</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="appearance-none border border-secondary rounded-full w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              required
            />
          </div>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="appearance-none border border-secondary rounded-full w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center mr-4">
              {showPassword ? (
                <EyeOffIcon
                  className="h-6 w-6 text-gray-500 cursor-pointer"
                  onClick={toggleShowPassword}
                />
              ) : (
                <EyeIcon
                  className="h-6 w-6 text-gray-500 cursor-pointer"
                  onClick={toggleShowPassword}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{
                backgroundColor: "#f85606",
              }}
            >
              Sign Up
            </button>
            <div className="ml-4">
              <Link href="/login">
              <span className="text-gray-600">Already have an account?</span>
              <div
                className="text-blue-500 hover:text-primary ml-2"
                style={{
                  color: "#f85606",
                }} 
              >
                Sign in
              </div>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
