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
import { UserData, GeneratedResult } from "../types/types";

const Index = () => {
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null);

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    setStep(2);
  };

  const handleImageCapture = (imageData: string) => {
    setCapturedImage(imageData);
  };

  const handleGenerate = async () => {
    if (!userData || !capturedImage) {
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
        capturedImage
      );
      
      // Create a result object
      const result = {
        id: uuidv4(),
        poem,
        portraitUrl,
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
    setCapturedImage(null);
    setGeneratedResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <AppHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl border border-purple-100 dark:border-gray-700">
          <CardContent className="p-6 md:p-8">
            {isProcessing ? (
              <ProcessingLoader />
            ) : (
              <>
                {step === 1 && <UserForm onSubmit={handleFormSubmit} />}
                
                {step === 2 && (
                  <ImageCapture 
                    onCapture={handleImageCapture}
                    capturedImage={capturedImage}
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
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Personalized Poem & Portrait Generator © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Index;
