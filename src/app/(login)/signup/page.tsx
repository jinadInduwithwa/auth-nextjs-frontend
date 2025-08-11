"use client";

import React, { useState } from "react";
import LeftSection from "../../components/LeftSection";
import MobileForm from "../../components/signup/MobileForm";
import VerificationForm from "../../components/signup/VerificationForm";
import PersonalDetailsForm from "../../components/signup/PersonalDetailsForm";
import UploadProfilePicture from "../../components/signup/UploadProfilePicture";

type StepType = "mobile" | "verification" | "details" | "profilePicture";
type UserType = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
};
const Page = () => {
  const [step, setStep] = useState<StepType>("mobile");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
   const [user, setUser] = useState<UserType>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
  });

  // Debugging to catch number error
  console.log("Page step:", step, typeof step);
  if (typeof step !== "string") {
    console.error("Invalid step type:", step);
    setStep("mobile"); // Reset to default
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left section */}
      <LeftSection />

      {/* Right section - forms */}
      <div className="flex flex-1 w-full justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl">
              {step === "mobile"
                ? "Verify Number"
                : step === "verification"
                ? "Verify Code"
                : step === "details"
                ? "Personal Details"
                : "Upload Profile Picture"}
            </h1>
            <span className="text-gray-500">Let’s get started with your 30 days free trial</span>
          </div>

          {step === "mobile" ? (
            <MobileForm
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              setStep={setStep}
            />
          ) : step === "verification" ? (
            <VerificationForm
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              setStep={setStep}
            />
          ) : step === "details" ? (
            <PersonalDetailsForm 
            user={user}
            setUser={setUser}
            setStep={setStep} />
          ) : step === "profilePicture" ? (
            <UploadProfilePicture setStep={setStep} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Page;