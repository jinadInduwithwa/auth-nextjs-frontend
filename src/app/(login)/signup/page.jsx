'use client'

import React, { useState } from "react";
import LeftSection from '../../components/LeftSection';
import MobileForm from '../../components/signup/MobileForm';
import VerificationForm from '../../components/signup/VerificationForm';
import PersonalDetailsForm from '../../components/signup/PersonalDetailsForm';
import UploadProfilePicture from '../../components/signup/UploadProfilePicture';

const Page = () => {
  const [step, setStep] = useState('mobile');

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left section */}
      <LeftSection step={step} />
      

      {/* Right section - forms */}
      <div className="flex flex-1 w-full justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl">
              { 
               step === 'mobile' ? "Verify Number" : 
               step === 'verification' ? "Verify Code" : 
               "Personal Details"
               }
            </h1>
            <span className="text-gray-500">Let’s get started with your 30 days free trial</span>
          </div>

          {step === 'mobile' ? (
            < MobileForm setStep={setStep} />

          ) : step === 'verification' ? (
            <VerificationForm setStep={setStep} />

          ) : step === 'details' ? (
            <PersonalDetailsForm setStep={setStep} />

          ) : step === 'profilePicture' ? (
            <UploadProfilePicture setStep={setStep} />
            
          ) : (
            <LoginForm setStep={setStep} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;