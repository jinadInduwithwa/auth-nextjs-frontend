import React, { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';

type StepType = 'mobile' | 'verification' | 'password';

interface MobileFormProps {
  mobileNumber: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

const MobileForm: React.FC<MobileFormProps> = ({setStep }) => {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep('verification');
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
      
      <div className="space-y-4 mt-6">
        <button
          type="submit"
          className="w-full border-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Send Verification Code
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
           <Link href="/signin">
            <button
              type="button"
              className="text-blue-900 font-semibold"
            >
              Login
            </button>
           </Link>
        </p>
        
      </div>
    </form>
  );
};

export default MobileForm;