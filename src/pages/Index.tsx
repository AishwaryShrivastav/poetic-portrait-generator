
import { useState } from "react";
import UserForm from "../components/UserForm";
import ImageCapture from "../components/ImageCapture";
import ResultsDisplay from "../components/ResultsDisplay";
import { Card, CardContent } from "@/components/ui/card";
import AppHeader from "../components/AppHeader";
import ProcessingLoader from "../components/ProcessingLoader";
import { toast } from "@/components/ui/sonner";
import { generatePoem, generatePortrait } from "../utils/openaiService";
import { v4 as uuidv4 } from "uuid";
import { UserData, GeneratedResult, ImageStyle } from "../types/types";

const Index = () => {
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null);

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    setStep(2);
  };

  const handleImageCapture = (imageData: string[]) => {
    setCapturedImages(imageData);
  };

  const handleGenerate = async (style: ImageStyle = "professional") => {
    if (!userData || capturedImages.length === 0) {
      toast.error("Missing data. Please complete all steps.");
      return;
    }

    setIsProcessing(true);

    try {
      // Generate the poem using OpenAI
      const poem = await generatePoem(
        userData.name,
        userData.designation,
        userData.company
      );
      
      // Generate the portrait using DALL-E with designation included
      const portraitUrl = await generatePortrait(
        userData.name,
        userData.designation,
        capturedImages[0], // Use the first image as main reference
        style,
        capturedImages.slice(1) // Pass additional images as references
      );
      
      // Create a result object
      const result = {
        id: uuidv4(),
        poem,
        portraitUrl,
        portraitStyle: style,
        createdAt: new Date().toISOString(),
      };
      
      // Store in local storage (simulating database)
      const results = JSON.parse(localStorage.getItem('generatedResults') || '[]');
      results.push(result);
      localStorage.setItem('generatedResults', JSON.stringify(results));
      
      setGeneratedResult(result);
      setStep(3);
      toast.success("Your personalized poem and portrait have been generated!");
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error("Failed to generate content. Please check your API key and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRegeneratePoem = async () => {
    if (!userData || !generatedResult) {
      toast.error("Missing data. Cannot regenerate poem.");
      return;
    }

    setIsProcessing(true);
    
    try {
      const newPoem = await generatePoem(
        userData.name,
        userData.designation,
        userData.company
      );
      
      // Update the existing result with the new poem
      const updatedResult = {
        ...generatedResult,
        poem: newPoem,
      };
      
      setGeneratedResult(updatedResult);
      toast.success("Generated a new personalized poem!");
      
      // Update in localStorage
      const results = JSON.parse(localStorage.getItem('generatedResults') || '[]');
      const updatedResults = results.map((r: GeneratedResult) => 
        r.id === generatedResult.id ? updatedResult : r
      );
      localStorage.setItem('generatedResults', JSON.stringify(updatedResults));
      
    } catch (error) {
      console.error('Error regenerating poem:', error);
      toast.error("Failed to generate new poem. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRegenerateImage = async (style?: ImageStyle) => {
    if (!userData || capturedImages.length === 0 || !generatedResult) {
      toast.error("Missing data. Cannot regenerate image.");
      return;
    }

    // Use the provided style or fallback to the current style or "professional"
    const imageStyle = style || generatedResult.portraitStyle || "professional";
    
    setIsProcessing(true);
    
    try {
      const newPortraitUrl = await generatePortrait(
        userData.name,
        userData.designation,
        capturedImages[0], // Use the first image as main reference
        imageStyle,
        capturedImages.slice(1) // Pass additional images as references
      );
      
      // Update the existing result with the new image
      const updatedResult = {
        ...generatedResult,
        portraitUrl: newPortraitUrl,
        portraitStyle: imageStyle,
      };
      
      setGeneratedResult(updatedResult);
      toast.success(`Generated a new ${imageStyle} portrait!`);
      
      // Update in localStorage
      const results = JSON.parse(localStorage.getItem('generatedResults') || '[]');
      const updatedResults = results.map((r: GeneratedResult) => 
        r.id === generatedResult.id ? updatedResult : r
      );
      localStorage.setItem('generatedResults', JSON.stringify(updatedResults));
      
    } catch (error) {
      console.error('Error regenerating image:', error);
      toast.error("Failed to generate new image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendEmail = async () => {
    if (!userData || !generatedResult) {
      toast.error("Missing data. Cannot send email.");
      return;
    }

    try {
      // In a frontend-only app, we'll just simulate sending an email
      // In real-world, you'd call an email service API
      toast.success(`Email would be sent to ${userData.email} with your creation!`);
      toast.info("This is a simulation - no actual email is sent in this demo.");
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Failed to send email. Please try again.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setStep(1);
    setUserData(null);
    setCapturedImages([]);
    setGeneratedResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <AppHeader />
      
      <main className="flex-grow container mx-auto px-4 py-4 w-full max-w-[1600px]">
        <Card className="mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-purple-100 dark:border-gray-700 w-full">
          <CardContent className="p-4 md:p-6">
            {isProcessing ? (
              <ProcessingLoader />
            ) : (
              <>
                {step === 1 && <UserForm onSubmit={handleFormSubmit} initialData={userData} />}
                
                {step === 2 && (
                  <ImageCapture 
                    onCapture={handleImageCapture}
                    capturedImages={capturedImages}
                    onGenerate={handleGenerate}
                    onBack={() => setStep(1)}
                  />
                )}
                
                {step === 3 && generatedResult && (
                  <ResultsDisplay
                    result={generatedResult}
                    userData={userData!}
                    onSendEmail={handleSendEmail}
                    onPrint={handlePrint}
                    onReset={handleReset}
                    onRegeneratePoem={handleRegeneratePoem}
                    onRegenerateImage={handleRegenerateImage}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </main>
      
      <footer className="py-2 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Index;
