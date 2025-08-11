"use client";

import React, { FormEvent } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

type StepType = "mobile" | "verification" | "details" | "profilePicture";
type UserType = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
};

interface PersonalDetailsFormProps {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ user, setUser, setStep }) => {
  const validateForm = () => {
    if (!user.firstName) {
      toast.error("First name is required.");
      return false;
    }
    if (!user.lastName) {
      toast.error("Last name is required.");
      return false;
    }
    if (!user.dob) {
      toast.error("Date of birth is required.");
      return false;
    }
    if (!user.gender) {
      toast.error("Gender is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Personal details saved!");
      setStep("profilePicture");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="space-y-1 flex-1">
            <label className="block text-sm">First Name</label>
            <input
              type="text"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
              required
            />
          </div>
          <div className="space-y-1 flex-1">
            <label className="block text-sm">Last Name</label>
            <input
              type="text"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-sm">Date of Birth</label>
          <input
            type="date"
            value={user.dob}
            onChange={(e) => setUser({ ...user, dob: e.target.value })}
            className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm">Gender</label>
          <select
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-4 mt-6">
          <button
            type="submit"
            className="w-full border-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Next Step
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm">
            Back to verification?{" "}
            <button
              type="button"
              className="text-blue-900 font-semibold"
              onClick={() => setStep("verification")}
            >
              Enter Verification Code
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

export default PersonalDetailsForm;