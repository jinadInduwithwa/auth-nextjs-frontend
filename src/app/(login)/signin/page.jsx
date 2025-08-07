'use client'

import React, { useState } from "react";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  const [showResetForm, setShowResetForm] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleForm = () => {
    setShowResetForm(!showResetForm);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left section */}
      <div className="relative hidden lg:block lg:w-1/2 h-screen">
        <Image
          src="/images/background.jpg"
          alt="men and women in gym"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Heading and descriptions */}
        <div className="absolute top-10 left-6 right-6 flex flex-col space-y-10 w-4/5 max-w-2xl">
          <h1 className="text-white font-bold text-4xl">AlphaFlex</h1>
          <p className="text-white text-lg leading-tight">
            {showResetForm
              ? "For your security and continued access to our premium workout spaces, personalized training plans, and progress-tracking tools, please update your password regularly to keep your AlphaFlex account safe and protected."
              : "Access your personalized AlphaFlex fitness experience by logging into your account, where you can explore high-quality equipment, energetic workout environments, and tailored support designed to help you achieve your health and wellness goals."}
          </p>
        </div>

        {/* CEO block pinned to the bottom */}
        <div className="absolute bottom-0 left-6 right-6 text-white text-lg leading-tight p-4">
          <p>Jinad Gamage</p>
          <p>CEO @ AlphaFlex</p>
        </div>
      </div>

      {/* Right section - forms */}
      <div className="flex flex-1 w-full justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl">{showResetForm ? "Update Password" : "Login to Account"}</h1>
            <span className="text-gray-500">Let’s get started with your 30 days free trial</span>
          </div>

          {showResetForm ? (
            <form className="space-y-4 mt-10">
              <div className="space-y-1">
                <label className="block text-sm">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <button
                  type="submit"
                  className="w-full border-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  Reset Password
                </button>
                <button
                  type="button"
                  className="w-full border-2 border-gray-500 text-gray-500 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  Signup with Google
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Back to login?{" "}
                  <button
                    type="button"
                    className="text-blue-900 font-semibold"
                    onClick={toggleForm}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <form className="space-y-4 mt-10">
              <div className="space-y-1">
                <label className="block text-sm">Mobile Number</label>
                <input
                  type="text"
                  className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm">Password</label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                  >
                    {showLoginPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-black text-sm"
                  onClick={toggleForm}
                >
                  Forgot Password?
                </button>
              </div>

              <div className="space-y-4 mt-6">
                <button
                  type="submit"
                  className="w-full border-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 border-2 border-gray-500 text-gray-500 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  <FcGoogle size={22} />
                  Signup with Google
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Don’t have an account?{" "}
                  <a className="text-blue-900 font-semibold" href="/signup">
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;