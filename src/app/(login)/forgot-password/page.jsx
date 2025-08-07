'use client'

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import LeftSection from '../../components/LeftSection';
import MobileForm from '../../components/forget-password/MobileForm';
import VerificationForm from '../../components/forget-password/VerificationForm';
import PasswordForm from '../../components/forget-password/PasswordForm';

const Page = () => {
  const [step, setStep] = useState('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');



  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left section */}
      <LeftSection step={step} />
      

      {/* Right section - forms */}
      <div className="flex flex-1 w-full justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl">
              {step === 'login' ? "Login to Account" : 
               step === 'mobile' ? "Reset Password" : 
               step === 'verification' ? "Verify Code" : "Set New Password"}
            </h1>
            <span className="text-gray-500">Let’s get started with your 30 days free trial</span>
          </div>

          {step === 'mobile' ? (
             <MobileForm
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              setStep={setStep}
            />
          ) : step === 'verification' ? (
            <VerificationForm
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              setStep={setStep}
            />
          ) : step === 'password' && (
            <PasswordForm
              setStep={setStep}
              setMobileNumber={setMobileNumber}
              setVerificationCode={setVerificationCode}
            />
          ) }
        </div>
      </div>
    </div>
  );
};

export default Page;