
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Camera, Image, User, Star, Rocket, Gamepad, SquareUser } from "lucide-react";
import { ImageStyle } from "../types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageCaptureProps {
  onCapture: (imageData: string) => void;
  capturedImage: string | null;
  onGenerate: (style: ImageStyle) => void;
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
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>("professional");
  
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

  const imageStyles = [
    { id: "professional", name: "Professional", icon: <Image size={20} />, description: "Standard professional portrait" },
    { id: "linkedin", name: "LinkedIn", icon: <User size={20} />, description: "Professional headshot for LinkedIn" },
    { id: "avatar", name: "AI Avatar", icon: <SquareUser size={20} />, description: "Realistic AI avatar based on your role" },
    { id: "marvel", name: "Marvel", icon: <Star size={20} />, description: "Marvel superhero character" },
    { id: "rockstar", name: "Rockstar", icon: <Rocket size={20} />, description: "Music rockstar style" },
    { id: "gta", name: "GTA", icon: <Gamepad size={20} />, description: "GTA 5 game character style" }
  ];

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
                {useWebcam ? <Camera className="mr-2" size={16} /> : <Image className="mr-2" size={16} />}
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
                  <Camera className="mr-2" size={16} />
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
              <AspectRatio ratio={1/1} className="bg-muted">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>

            <Tabs defaultValue="professional" onValueChange={(value) => setSelectedStyle(value as ImageStyle)} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                <TabsTrigger value="avatar">AI Avatar</TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="marvel">Marvel</TabsTrigger>
                <TabsTrigger value="rockstar">Rockstar</TabsTrigger>
                <TabsTrigger value="gta">GTA 5</TabsTrigger>
              </TabsList>

              <div className="mt-4">
                {imageStyles.map((style) => (
                  <TabsContent key={style.id} value={style.id} className="mt-0">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-background rounded-full">{style.icon}</div>
                        <div>
                          <h3 className="font-medium">{style.name}</h3>
                          <p className="text-xs text-muted-foreground">{style.description}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={handleRetake}
                className="flex-1 border-theme-300"
              >
                Retake
              </Button>
              <Button 
                onClick={() => onGenerate(selectedStyle)}
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
