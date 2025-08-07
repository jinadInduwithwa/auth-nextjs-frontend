'use client'

import React from "react";
import Image from "next/image";

type StepType = 'mobile' | 'verification' | 'password' | 'login';


interface LeftSectionProps {
  step: StepType;
}

// LeftSection component
const LeftSection = ({ step }:LeftSectionProps) => {
  return (
    <div className="relative hidden lg:block lg:w-1/2 h-screen">
        
      <Image
        src="/images/background.jpg"
        alt="men and women in gym"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Heading and descriptions */}
      <div className="absolute top-10 left-6 right-6 flex flex-col space-y-10 w-4/5 max-w-2xl">
        <h1 className="text-white font-bold text-4xl">AlphaFlex</h1>
        <p className="text-white text-lg leading-tight">
          {step === 'mobile' || step === 'login'
            ? "Access your personalized AlphaFlex fitness experience by logging into your account, where you can explore high-quality equipment, energetic workout environments, and tailored support designed to help you achieve your health and wellness goals."
            : step === 'verification'
            ? "Enter the verification code sent to your mobile number to proceed with resetting your password and regain access to your AlphaFlex account."
            : "Set a new password to secure your AlphaFlex account and continue enjoying our premium workout spaces and personalized training plans."}
        </p>
      </div>

      <div className="absolute bottom-0 left-6 right-6 text-white text-lg leading-tight p-4">
        <p>Jinad Gamage</p>
        <p>CEO @ AlphaFlex</p>
      </div>
    </div>
  );
};

export default LeftSection
