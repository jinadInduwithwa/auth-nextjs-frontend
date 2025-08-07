
import React, { useState, useRef, FormEvent, useEffect } from "react";

type StepType = 'mobile' | 'verification' | 'details';

interface VerificationFormProps {
  verificationCode: string;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ verificationCode, setVerificationCode, setStep }) => {
  const [codeArray, setCodeArray] = useState<string[]>(Array(6).fill('')); // State for 6 input boxes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Refs for focusing inputs

  // Handle input change for individual boxes
  const handleInputChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) { // Accept only single digit
      const newCodeArray = [...codeArray];
      newCodeArray[index] = value;
      setCodeArray(newCodeArray);
      setVerificationCode(newCodeArray.join(''));

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace to focus previous input
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codeArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newCodeArray = pastedData.split('');
      setCodeArray(newCodeArray);
      setVerificationCode(pastedData);
      inputRefs.current[5]?.focus(); // Focus last input
    }
    e.preventDefault();
  };

  // Sync codeArray with verificationCode prop
  useEffect(() => {
    if (verificationCode.length === 0) {
      setCodeArray(Array(6).fill(''));
    }
  }, [verificationCode]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate verifying code (replace with actual API call)
    setStep('details');
  };

  return (
    <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="block text-sm">Enter the Verification Code</label>
        <div className="flex justify-between">
          {Array(6).fill(0).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={codeArray[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined} // Paste only on first input
              className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
              required
              aria-label={`Verification code digit ${index + 1}`}
            />
          ))}
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
            onClick={() => setStep('mobile')}
          >
            Enter Mobile Number
          </button>
        </p>
      </div>
    </form>
  );
};

export default VerificationForm;