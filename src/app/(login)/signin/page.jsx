'use client'

import React, { useState } from "react";
import LoginForm from "../../components/signin/LoginForm";
import ResetPasswordForm from "../../components/signin/ResetPasswordForm";
import LeftSection from "../../components/LeftSection";


const Page = () => {
  const [step, setStep] = useState('login');

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <LeftSection step={step} />
      <div className="flex flex-1 w-full justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl">
              {step === 'login' ? "Login to Account" : "Update Password"}
            </h1>
            <span className="text-gray-500">Let’s get started with your 30 days free trial</span>
          </div>
          {step === 'login' ? (
            <LoginForm setStep={setStep} />
          ) : (
            <ResetPasswordForm setStep={setStep} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
