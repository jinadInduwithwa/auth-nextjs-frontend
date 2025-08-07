
import React, { useState, FormEvent } from "react";
import Link from "next/link";

type StepType = 'mobile' | 'verification' | 'details' | 'profilePicture';

interface PersonalDetailsFormProps {
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ setStep }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep('profilePicture');
  };

  return (
    <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="space-y-1 flex-1">
          <label className="block text-sm">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
            required
          />
        </div>
        <div className="space-y-1 flex-1">
          <label className="block text-sm">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
            required
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="block text-sm">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
          required
        >
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="space-y-4 mt-6">
        <button
          type="submit"
          className="w-full border-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
           onClick={() => setStep('profilePicture')}
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
          >
            Enter Verification Code
          </button>
        </p>
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

export default PersonalDetailsForm;
