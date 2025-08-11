"use client";

import React, { useState } from "react";
import LeftSection from "../../../components/LeftSection";
import MobileForm from "../../../components/signup/MobileForm";
import VerificationForm from "../../../components/signup/VerificationForm";
import PersonalDetailsForm from "../../../components/signup/PersonalDetailsForm";
import UploadProfilePicture from "../../../components/signup/UploadProfilePicture";
import { UserType } from "../../../types/user.type";

type StepType = "mobile" | "verification" | "details" | "profilePicture";

const Page = () => {
  const [step, setStep] = useState<StepType>("mobile");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [user, setUser] = useState<UserType>({
    contactNumber: "",
    dateOfBirth: "",
    firstName: "",
    gender: "",
    lastName: "",
    image: "", // Base64 cropped
    fullSizeImage: "", // Base64 original
  });

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
              mobileNumber={mobileNumber} // Pass for verification
              setUser={setUser} // To set contactNumber after success
            />
          ) : step === "details" ? (
            <PersonalDetailsForm 
              user={user}
              setUser={setUser}
              setStep={setStep}
            />
          ) : step === "profilePicture" ? (
            <UploadProfilePicture 
              setStep={setStep}
              user={user}
              setUser={setUser}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Page;