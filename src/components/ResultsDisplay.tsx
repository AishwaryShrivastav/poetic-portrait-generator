
import { UserData } from "../types/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface ResultsDisplayProps {
  result: {
    poem: string;
    portraitUrl: string;
  };
  userData: UserData;
  onSendEmail: () => void;
  onPrint: () => void;
  onReset: () => void;
}

const ResultsDisplay = ({
  result,
  userData,
  onSendEmail,
  onPrint,
  onReset
}: ResultsDisplayProps) => {
  const formattedPoem = result.poem.split('\n').map((line, i) => (
    <p key={i} className="my-1">{line}</p>
  ));

  return (
    <div className="space-y-6 print:p-0">
      <div className="text-center space-y-2 print:mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 print:text-black">
          Your Creation is Ready!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 print:text-gray-700">
          Here's your personalized poem and portrait
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 print:gap-8">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-gray-700 print:shadow-none print:border-none">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-theme-700 dark:text-theme-300 print:text-theme-800">
              Personalized Poem
            </h3>
            
            <Separator className="bg-theme-200 dark:bg-theme-700" />
            
            <div className="italic text-gray-700 dark:text-gray-200 leading-relaxed print:text-gray-800">
              {formattedPoem}
            </div>
            
            <div className="text-sm text-gray-500 pt-2">
              For: {userData.name}, {userData.designation} at {userData.company}
            </div>
          </div>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-gray-700 overflow-hidden print:shadow-none print:border-none">
          <div className="p-4 pb-0 print:p-0">
            <h3 className="text-lg font-medium text-theme-700 dark:text-theme-300 mb-2 print:text-theme-800 print:mb-4">
              AI Portrait
            </h3>
          </div>
          
          <div className="p-4 print:p-0">
            <img 
              src={result.portraitUrl} 
              alt="AI Generated Portrait" 
              className="w-full h-auto rounded-md print:rounded-none"
            />
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 justify-center pt-4 print:hidden">
        <Button 
          onClick={onSendEmail}
          className="bg-theme-600 hover:bg-theme-700 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send to Email
        </Button>
        
        <Button 
          onClick={onPrint}
          variant="outline" 
          className="border-theme-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print
        </Button>
        
        <Button 
          onClick={onReset}
          variant="outline"
          className="border-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Create Another
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
