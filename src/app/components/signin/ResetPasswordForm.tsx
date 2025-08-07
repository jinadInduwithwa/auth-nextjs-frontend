import React, { useState, FormEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FcGoogle, FcCheckmark } from "react-icons/fc";

type StepType = 'login' | 'resetPassword';

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-green-500 text-white p-6 rounded-xl max-w-sm w-full">
        <div className="flex items-center justify-center mb-4">
          <FcCheckmark size={32} />
        </div>
        <h2 className="text-xl font-bold text-center">{title}</h2>
        <p className="text-sm text-center mt-2">{message}</p>
        <button
          type="button"
          className="mt-4 w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

interface ResetPasswordFormProps {
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ setStep }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate password reset (replace with actual API call)
    setShowModal(true);
  };

  return (
    <>
      <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="block text-sm">Current Password</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
              required
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
            Back to login?{" "}
            <button
              type="button"
              className="text-blue-900 font-semibold"
              onClick={() => setStep('login')}
            >
              Login
            </button>
          </p>
        </div>
      </form>
      <WarningModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setStep('login');
        }}
        title="Success"
        message="Password reset successful!"
      />
    </>
  );
};

export default ResetPasswordForm;
