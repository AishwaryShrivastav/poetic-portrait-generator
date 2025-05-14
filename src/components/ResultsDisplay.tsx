import { UserData, ImageStyle } from "../types/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { RefreshCw, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import logoLeft from '../assets/logo-left.svg';
import logoRight from '../assets/logo-right.svg';

interface ResultsDisplayProps {
  result: {
    poem: string;
    portraitUrl: string;
    portraitStyle?: ImageStyle;
  };
  userData: UserData;
  onSendEmail: () => void;
  onPrint: () => void;
  onReset: () => void;
  onRegeneratePoem: () => void;
  onRegenerateImage: (style?: ImageStyle) => void;
}

const ResultsDisplay = ({
  result,
  userData,
  onSendEmail,
  onPrint,
  onReset,
  onRegeneratePoem,
  onRegenerateImage
}: ResultsDisplayProps) => {
  const formattedPoem = result.poem.split('\n').map((line, i) => (
    <p key={i} className="my-1">{line}</p>
  ));

  // Style names for display
  const getStyleDisplayName = (style?: ImageStyle): string => {
    switch(style) {
      case "professional": return "Professional Portrait";
      case "linkedin": return "LinkedIn Headshot";
      case "avatar": return "AI Avatar";
      case "marvel": return "Marvel Character";
      case "rockstar": return "Rockstar";
      case "gta": return "GTA 5 Character";
      default: return "Professional Portrait";
    }
  };

  return (
    <div className="space-y-6 print:p-0">
      {/* Header section - only visible on screen */}
      <div className="text-center space-y-2 print:hidden">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Your Creation is Ready!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Here's your personalized poem and portrait
        </p>
      </div>

      {/* Content visible both on screen and in print */}
      <div className="grid md:grid-cols-2 gap-6 print:hidden">
        <div>
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-gray-700">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-theme-700 dark:text-theme-300">
                  Personalized Poem
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onRegeneratePoem} 
                  className="text-gray-500 hover:text-theme-600"
                >
                  <RefreshCw size={16} className="mr-1" /> New Poem
                </Button>
              </div>
              
              <Separator className="bg-theme-200 dark:bg-theme-700" />
              
              <div className="italic text-gray-700 dark:text-gray-200 leading-relaxed">
                {formattedPoem}
              </div>
              
              <div className="text-sm text-gray-500 pt-2">
                For: {userData.name}, {userData.designation} at {userData.company}
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="bg-white dark:bg-gray-800 shadow-md border border-purple-100 dark:border-gray-700 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-theme-700 dark:text-theme-300">
                  AI Portrait
                </h3>
                {result.portraitStyle && (
                  <Badge variant="outline" className="ml-2">
                    {getStyleDisplayName(result.portraitStyle)}
                  </Badge>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onRegenerateImage(result.portraitStyle)} 
                className="text-gray-500 hover:text-theme-600"
              >
                <ImageIcon size={16} className="mr-1" /> New Image
              </Button>
            </div>
            
            <div className="p-4 pt-0">
              <img 
                src={result.portraitUrl} 
                alt="AI Generated Portrait" 
                className="w-full h-auto rounded-md"
              />
            </div>

            <div className="p-4 pt-0">
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onRegenerateImage("linkedin")}
                  className="text-xs h-8"
                >
                  LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onRegenerateImage("avatar")}
                  className="text-xs h-8"
                >
                  AI Avatar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onRegenerateImage("marvel")}
                  className="text-xs h-8"
                >
                  Marvel
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onRegenerateImage("rockstar")}
                  className="text-xs h-8"
                >
                  Rockstar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onRegenerateImage("gta")}
                  className="text-xs h-8"
                >
                  GTA 5
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onRegenerateImage("professional")}
                  className="text-xs h-8"
                >
                  Professional
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Print-only layout for A6 size - Updated with explicit visibility and improved display */}
      <div id="printContent" className="hidden print:block print:w-full print:h-full print:overflow-visible print:relative">
        {/* Logos for print - positioned absolutely */}
        <div className="print:absolute print:top-2 print:left-2 print:w-10 print:h-10">
          <img 
            src={logoLeft} 
            alt="Left Logo" 
            className="print:w-full print:h-full print:object-contain"
          />
        </div>
        <div className="print:absolute print:top-2 print:right-2 print:w-10 print:h-10">
          <img 
            src={logoRight} 
            alt="Right Logo" 
            className="print:w-full print:h-full print:object-contain"
          />
        </div>
        
        {/* Portrait image for print - centered properly for A6 */}
        <div className="print:w-full print:flex print:justify-center print:mt-14 print:mb-4">
          {/* Force image to be displayed with proper dimensions */}
          <img 
            src={result.portraitUrl} 
            alt="AI Generated Portrait" 
            className="print:max-h-[60mm] print:max-w-[90mm] print:object-contain print:block"
            style={{ display: 'block', pageBreakInside: 'avoid' }}
          />
        </div>
        
        {/* Poem text for print - styled with handwriting font and proper spacing */}
        <div className="print:w-[90mm] print:mx-auto print:mt-4 print:font-['Dancing_Script','cursive'] print:text-base print:text-center print:text-black">
          <div className="print:leading-tight print:text-black">
            {formattedPoem}
          </div>
          
          <div className="print:mt-4 print:text-right print:text-sm">
            <p className="print:text-black">For: {userData.name}</p>
            <p className="print:text-xs print:mt-0.5 print:text-gray-800">{userData.designation} at {userData.company}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center pt-4 print:hidden">
        <Button 
          onClick={onSendEmail}
          className="bg-theme-600 hover:bg-theme-700 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Send to Email
        </Button>
        
        <Button 
          onClick={onPrint}
          variant="outline" 
          className="border-theme-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print (A6)
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
