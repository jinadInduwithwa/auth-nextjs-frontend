"use client";

import React, { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

type StepType = "mobile" | "verification" | "password";

interface MobileFormProps {
  mobileNumber: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

const MobileForm: React.FC<MobileFormProps> = ({ mobileNumber, setMobileNumber, setStep }) => {
  const validateForm = () => {
    
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileNumber) {
      toast.error("Mobile number is required.");
      return false;
    }
    if (!mobileRegex.test(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Verification code sent!");
      setStep("verification");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="block text-sm">Mobile Number</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
            required
          />
        </div>

        <div className="space-y-4 mt-6">
          <button
            type="submit"
            className="w-full border-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Send Verification Code
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm">
            Back to login?{" "}
            <Link href="/signin">
              <button type="button" className="text-blue-900 font-semibold">
                Login
              </button>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default MobileForm;