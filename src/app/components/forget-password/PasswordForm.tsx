import React, { useState, FormEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import WarningModal from '../modal/WarningModal';

type StepType = 'mobile' | 'verification' | 'password' | 'login';

interface PasswordFormProps {
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ setStep, setMobileNumber, setVerificationCode, setShowModal }) => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showModal, setLocalShowModal] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLocalShowModal(true); 
    setShowModal(true); 
  };

  const handleModalClose = () => {
    setLocalShowModal(false);
    setShowModal(false);
    setStep('mobile');
    setMobileNumber('');
    setVerificationCode('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <>
      <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
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
        </div>
        <div className="text-center mt-4">
          <p className="text-sm">
            Back to login?{" "}
            <button
              type="button"
              className="text-blue-900 font-semibold"
              onClick={() => {
                setStep('mobile');
                setMobileNumber('');
                setVerificationCode('');
                setShowNewPassword(false);
                setShowConfirmPassword(false);
                setLocalShowModal(false);
                setShowModal(false);
              }}
            >
              Login
            </button>
          </p>
        </div>
      </form>
      <WarningModal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Success"
        message="Password reset successful!"
      />
    </>
  );
};

export default PasswordForm;
