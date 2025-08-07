
import React, { useState, useCallback, FormEvent } from "react";
import Cropper, { Area } from "react-easy-crop"; // Updated import

type StepType = 'mobile' | 'verification' | 'details' | 'profilePicture' | 'login';

interface UploadProfilePictureProps {
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
}

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({ setStep }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle crop completion
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Generate cropped image (simplified, replace with actual canvas cropping logic)
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

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImage();
      if (croppedImage) {
        // Simulate uploading cropped image (replace with actual API call)
        console.log("Cropped image ready for upload:", croppedImage);
        setStep('mobile'); // Reset to mobile or adjust to login
      }
    } else {
      alert("Please upload and crop an image before submitting.");
    }
  };

  // Handle skip action
  const handleSkip = () => {
    setStep('mobile'); // Reset to mobile or adjust to login
  };

  return (
    <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="block text-sm">Upload Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-0 py-3 border-b border-black bg-transparent focus:outline-none"
        />
      </div>
      {imageSrc && (
        <div className="relative w-full h-64">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1} // Square aspect ratio for profile picture
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
          disabled={!imageSrc}
        >
          Upload Profile Picture
        </button>
        <button
          type="button"
          className="w-full border-2 border-gray-500 text-gray-500 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
          onClick={handleSkip}
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
            onClick={() => setStep('details')}
          >
            Enter Personal Details
          </button>
        </p>
      </div>
    </form>
  );
};

export default UploadProfilePicture;
