
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

interface ImageCaptureProps {
  onCapture: (imageData: string) => void;
  capturedImage: string | null;
  onGenerate: () => void;
  onBack: () => void;
}

const ImageCapture = ({ 
  onCapture, 
  capturedImage, 
  onGenerate, 
  onBack 
}: ImageCaptureProps) => {
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const webcamRef = useRef<Webcam | null>(null);
  
  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
        toast.success("Image captured successfully!");
      } else {
        toast.error("Failed to capture image. Please try again.");
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File is too large. Maximum size is 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onCapture(event.target.result as string);
          toast.success("Image uploaded successfully!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    onCapture("");
  };

  const toggleMethod = () => {
    setUseWebcam(!useWebcam);
    onCapture("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Upload Your Photo
      </h2>

      <div className="space-y-4">
        {!capturedImage ? (
          <>
            <div className="flex justify-center mb-4">
              <Button 
                variant="outline" 
                onClick={toggleMethod}
                className="text-theme-600 border-theme-300"
              >
                {useWebcam ? "Switch to File Upload" : "Switch to Camera"}
              </Button>
            </div>

            {useWebcam ? (
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-auto"
                    videoConstraints={{
                      width: 480,
                      height: 480,
                      facingMode: "user"
                    }}
                  />
                </div>
                <Button 
                  onClick={handleCapture}
                  className="w-full bg-theme-600 hover:bg-theme-700 text-white"
                >
                  Capture Photo
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Label 
                    htmlFor="file-upload" 
                    className="cursor-pointer text-theme-600 hover:text-theme-700 block"
                  >
                    <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-theme-100 dark:bg-theme-900">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-theme-600">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">
                      Click to upload or drag and drop
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-4">
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-auto"
              />
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={handleRetake}
                className="flex-1 border-theme-300"
              >
                Retake
              </Button>
              <Button 
                onClick={onGenerate}
                className="flex-1 bg-theme-600 hover:bg-theme-700 text-white"
              >
                Generate
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="pt-4 text-center">
        <Button 
          variant="link" 
          onClick={onBack}
          className="text-gray-500 dark:text-gray-400"
        >
          &larr; Back to Personal Details
        </Button>
      </div>
    </div>
  );
};

export default ImageCapture;
