"use client";

import React, { FormEvent } from "react";
import OtpInput from "react-otp-input";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

type StepType = "mobile" | "verification" | "details" | "profilePicture";

interface VerificationFormProps {
  verificationCode: string;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  verificationCode,
  setVerificationCode,
  setStep,
}) => {
  const validateForm = () => {
    const codeRegex = /^[0-9]{6}$/;
    if (!verificationCode) {
      toast.error("Verification code is required.");
      return false;
    }
    if (!codeRegex.test(verificationCode)) {
      toast.error("Please enter a valid 6-digit verification code.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Code verified successfully!");
      setStep("details");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="block text-sm">Enter the Verification Code</label>
          <div className="flex justify-between">
            <OtpInput
              value={verificationCode}
              onChange={setVerificationCode}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  type="text"
                  inputMode="numeric"
                  className="max-w-10 h-10 mx-5 text-center text-lg border-b-2 border-black bg-transparent focus:outline-none focus:border-blue-500 transition"
                />
              )}
            />
          </div>
        </div>
        <div className="space-y-4 mt-6">
          <button
            type="submit"
            className="w-full border-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Verify Code
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm">
            Back to mobile?{" "}
            <button
              type="button"
              className="text-blue-900 font-semibold"
              onClick={() => setStep("mobile")}
            >
              Enter Mobile Number
            </button>
          </p>
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

export default VerificationForm;