import React, { FormEvent } from "react";

type StepType = 'mobile' | 'verification' | 'password' | 'login';


interface VerificationFormProps {
  verificationCode: string;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ verificationCode, setVerificationCode, setStep }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate verifying code (replace with actual API call)
    setStep('password');
  };

  return (
    <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="block text-sm">Verification Code</label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
          required
        />
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
            onClick={() => setStep('mobile')}
          >
            Enter Mobile Number
          </button>
        </p>
      </div>
    </form>
  );
};

export default VerificationForm
