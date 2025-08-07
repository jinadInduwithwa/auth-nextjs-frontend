import React, { useState, FormEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link'

type StepType = 'login' | 'resetPassword';

interface LoginFormProps {
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setStep }) => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("resetPassword");
  };

  return (
    <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="block text-sm">Mobile Number</label>
        <input
          type="text"
          className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm">Password</label>
        <div className="relative">
          <input
            type={showLoginPassword ? "text" : "password"}
            className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
            required
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
        <Link href="/forgot-password">
        <button
          type="button"
          className="text-black text-sm hover:underline"
        >
          Forgot Password?
        </button>
        </Link>
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
  );
};

export default LoginForm;
