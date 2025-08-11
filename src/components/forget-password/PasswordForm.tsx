

import React, { useState, FormEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

type StepType = 'mobile' | 'verification' | 'password';

interface PasswordFormProps {
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ setStep, setMobileNumber, setVerificationCode }) => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // minimum 8 characters, at least one letter and one number

    if (!formData.newPassword) {
      toast.error("New password is required.");
      return false;
    }
    if (!passwordRegex.test(formData.newPassword)) {
      toast.error(
        "New password must be at least 8 characters long and include at least one letter and one number."
      );
      return false;
    }

    if (!formData.confirmPassword) {
      toast.error("Confirm password is required.");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      //setStep("login");
    }
  };


  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="block text-sm">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
              required
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
              required
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
        </div>
        <div className="text-center mt-4">
          <p className="text-sm">
            Back to login?{" "}
            <button
              type="button"
              className="text-blue-900 font-semibold"
              onClick={() => {
              }}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </>
  );
};

export default PasswordForm;