import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Camera, Image as ImageIcon, User, Star, Rocket, Gamepad, SquareUser, X, Plus } from "lucide-react";
import { ImageStyle } from "../types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageCaptureProps {
  onCapture: (imageData: string[]) => void;
  capturedImages: string[];
  onGenerate: (style: ImageStyle) => void;
  onBack: () => void;
}

const ImageCapture = ({ 
  onCapture, 
  capturedImages, 
  onGenerate, 
  onBack 
}: ImageCaptureProps) => {
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const webcamRef = useRef<Webcam | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ImageStyle>("professional");
  const MAX_IMAGES = 3;
  
  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        if (capturedImages.length >= MAX_IMAGES) {
          toast.error(`Maximum of ${MAX_IMAGES} images allowed. Please remove an image first.`);
          return;
        }
        
        const updatedImages = [...capturedImages, imageSrc];
        onCapture(updatedImages);
        toast.success("Image captured successfully!");
      } else {
        toast.error("Failed to capture image. Please try again.");
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (capturedImages.length >= MAX_IMAGES) {
      toast.error(`Maximum of ${MAX_IMAGES} images allowed. Please remove an image first.`);
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB.");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageData = event.target.result as string;
        
        // Validate image data
        if (!imageData.startsWith('data:image')) {
          toast.error("Invalid image format. Please upload a valid image file.");
          return;
        }
        
        const updatedImages = [...capturedImages, imageData];
        onCapture(updatedImages);
        toast.success("Image uploaded successfully!");
      }
    };
    reader.onerror = () => {
      toast.error("Error reading file. Please try another image.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = capturedImages.filter((_, i) => i !== index);
    onCapture(updatedImages);
  };

  const handleReset = () => {
    onCapture([]);
  };

  const toggleMethod = () => {
    setUseWebcam(!useWebcam);
  };

  const handleGenerateClick = () => {
    if (capturedImages.length === 0) {
      toast.error("Please upload or capture at least one image.");
      return;
    }
    
    // Validate all images
    const invalidImages = capturedImages.filter(img => !img || !img.startsWith('data:image'));
    if (invalidImages.length > 0) {
      toast.error("Some images are invalid. Please remove them and try again.");
      return;
    }
    
    onGenerate(selectedStyle);
  };

  const imageStyles = [
    { id: "professional", name: "Professional", icon: <ImageIcon size={20} />, description: "Standard professional portrait" },
    { id: "linkedin", name: "LinkedIn", icon: <User size={20} />, description: "Professional headshot for LinkedIn" },
    { id: "avatar", name: "AI Avatar", icon: <SquareUser size={20} />, description: "Realistic AI avatar based on your role" },
    { id: "marvel", name: "Marvel", icon: <Star size={20} />, description: "Marvel superhero character" },
    { id: "rockstar", name: "Rockstar", icon: <Rocket size={20} />, description: "Music rockstar style" },
    { id: "gta", name: "GTA", icon: <Gamepad size={20} />, description: "GTA 5 game character style" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Upload Your Photos (Up to 3)
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <Button 
              variant="outline" 
              onClick={toggleMethod}
              className="text-theme-600 border-theme-300"
            >
              {useWebcam ? <Camera className="mr-2" size={16} /> : <ImageIcon className="mr-2" size={16} />}
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
                disabled={capturedImages.length >= MAX_IMAGES}
                className="w-full bg-theme-600 hover:bg-theme-700 text-white"
              >
                <Camera className="mr-2" size={16} />
                Capture Photo {capturedImages.length > 0 ? `(${capturedImages.length}/${MAX_IMAGES})` : ''}
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
                    <Plus className="w-6 h-6 text-theme-600" />
                  </div>
                  <span className="text-sm font-medium">
                    Click to upload or drag and drop
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {capturedImages.length}/{MAX_IMAGES} images
                  </p>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={capturedImages.length >= MAX_IMAGES}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            {capturedImages.length === 0 ? 'No images yet' : 'Your Images'}
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {capturedImages.map((image, index) => (
              <div key={index} className="relative group">
                <AspectRatio ratio={1/1} className="bg-muted rounded-md overflow-hidden">
                  <img
                    src={image}
                    alt={`Captured ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
                {index === 0 && (
                  <span className="absolute bottom-1 left-1 bg-theme-600 text-white text-xs px-2 py-0.5 rounded-full">
                    Main
                  </span>
                )}
              </div>
            ))}
            
            {Array.from({ length: MAX_IMAGES - capturedImages.length }).map((_, index) => (
              <div key={`empty-${index}`} className="bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                <AspectRatio ratio={1/1}>
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Plus className="w-6 h-6" />
                  </div>
                </AspectRatio>
              </div>
            ))}
          </div>

          {capturedImages.length > 0 && (
            <div className="pt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                The first image will be used as the main reference. Add up to {MAX_IMAGES} photos from different angles for better AI portrait generation.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleReset}
                className="w-full"
              >
                Reset All Images
              </Button>
            </div>
          )}

          {capturedImages.length > 0 && (
            <div className="pt-4">
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

              <div className="flex space-x-3 mt-4">
                <Button 
                  onClick={handleGenerateClick}
                  className="w-full bg-theme-600 hover:bg-theme-700 text-white"
                  disabled={capturedImages.length === 0}
                >
                  Generate
                </Button>
              </div>
            </div>
          )}
        </div>
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
