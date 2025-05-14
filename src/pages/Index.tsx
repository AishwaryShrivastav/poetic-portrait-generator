
import { useState } from "react";
import UserForm from "../components/UserForm";
import ImageCapture from "../components/ImageCapture";
import ResultsDisplay from "../components/ResultsDisplay";
import { UserData } from "../types/types";
import { Card, CardContent } from "@/components/ui/card";
import AppHeader from "../components/AppHeader";
import ProcessingLoader from "../components/ProcessingLoader";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);

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
      // Convert base64 image to blob
      const fetchResponse = await fetch(capturedImage);
      const blob = await fetchResponse.blob();

      // Create form data for the API
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('designation', userData.designation);
      formData.append('company', userData.company);
      formData.append('email', userData.email);
      formData.append('image', blob, 'user-image.jpg');

      // Call the API to process the data
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process your request');
      }

      const result = await response.json();
      setGeneratedResult(result);
      setStep(3);
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error("Failed to generate content. Please try again.");
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
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          name: userData.name,
          resultId: generatedResult.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast.success("Email sent successfully!");
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
