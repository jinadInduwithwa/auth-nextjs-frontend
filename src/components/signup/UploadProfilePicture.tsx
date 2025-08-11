"use client";

import React, { useState, useCallback, FormEvent, useTransition } from "react";
import Cropper, { Area } from "react-easy-crop";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { registerUser, saveImages } from "../../actions/customerActions";
import { UserType } from "../../types/user.type";

type StepType = "mobile" | "verification" | "details" | "profilePicture";

interface UploadProfilePictureProps {
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

export default function UploadProfilePicture({
  setStep,
  user,
  setUser,
}: UploadProfilePictureProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    setOriginalFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const getCroppedImage = async (): Promise<string | null> => {
    if (!imageSrc || !croppedAreaPixels) return null;

    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageSrc) {
      toast.error("Please upload an image.");
      return;
    }
    if (!croppedAreaPixels) {
      toast.error("Please crop the image before submitting.");
      return;
    }

    startTransition(async () => {
      try {
        const croppedImage = await getCroppedImage();
        if (croppedImage && originalFile) {
          const imageResult = await saveImages(originalFile, croppedImage);

          if ("error" in imageResult) {
            toast.error(imageResult.error || "Failed to save images.");
            return;
          }

          const updatedUser: UserType = {
            ...user,
            image: imageResult.image || "",
            fullSizeImage: imageResult.fullSizeImage || "",
          };
          setUser(updatedUser);

          const result = await registerUser(updatedUser);

          if ("error" in result) {
            toast.error(result.error || "Registration failed.");
          } else if (result.isSuccessful) {
            toast.success(result.message || "Registration successful!");
          } else {
            toast.error(result.message || "Registration failed.");
          }
        }
      } catch (err: any) {
        if (err?.digest === "NEXT_REDIRECT") return;
        console.error("Register Error:", err);
        toast.error("Registration failed.");
      }
    });
  };

  const handleSkip = () => {
    startTransition(async () => {
      try {
        const updatedUser: UserType = {
          ...user,
          image: "",
          fullSizeImage: "",
        };
        setUser(updatedUser);

        const result = await registerUser(updatedUser);

        if ("error" in result) {
          toast.error(result.error || "Registration failed.");
        } else if (result.isSuccessful) {
          toast.success(result.message || "Registration successful (skipped image)!");
        } else {
          toast.error(result.message || "Registration failed.");
        }
      } catch (err: any) {
        if (err?.digest === "NEXT_REDIRECT") return;
        console.error("Register Error:", err);
        toast.error("Registration failed.");
      }
    });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="block text-sm">Upload Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
            disabled={isPending}
          />
        </div>

        {imageSrc && (
          <div className="relative w-full h-64">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="round"
              showGrid={false}
            />
          </div>
        )}

        <div className="space-y-4 mt-6">
          <button
            type="submit"
            className="w-full border-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
            disabled={isPending || !imageSrc}
          >
            {isPending ? "Submitting..." : "Finish"}
          </button>
          <button
            type="button"
            className="w-full border-2 border-gray-500 text-gray-500 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
            onClick={handleSkip}
            disabled={isPending}
          >
            Skip this time
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">
            Back to personal details?{" "}
            <button
              type="button"
              className="text-blue-900 font-semibold"
              onClick={() => setStep("details")}
              disabled={isPending}
            >
              Enter Personal Details
            </button>
          </p>
          <p className="text-sm">
            Back to login?{" "}
            <Link href="/signin">
              <button type="button" className="text-blue-900 font-semibold" disabled={isPending}>
                Login
              </button>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
