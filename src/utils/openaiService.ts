
// This is a mock service for generating content with OpenAI
// In a real application, you would use the OpenAI API
import { ImageStyle } from "../types/types";

// Mock function to simulate poem generation
export const generatePoem = async (name: string, designation: string, company: string): Promise<string> => {
  console.log(`Generating poem for ${name}, ${designation} at ${company}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock poems for different people
  const poems = [
    `In corridors of ${company} wide and tall,\n${name} stands with wisdom above all.\nAs ${designation}, with vision so clear,\nGuiding with passion, year after year.`,
    
    `Leadership shines in ${name}'s steady gaze,\nAt ${company}, setting the hallways ablaze.\nThe ${designation}'s path, both challenging and true,\nWith determination, they always break through.`,
    
    `Through challenges faced and victories won,\n${name}'s journey at ${company} has just begun.\nAs ${designation}, with spirit unbowed,\nAchievements that make colleagues proud.`,
    
    `In the realm of ${company}, a beacon so bright,\n${name} transforms darkness into light.\nThe ${designation} who never ceases to inspire,\nWhose ambition and dreams continue to aspire.`,
    
    `With strategic mind and heart so kind,\n${name} leaves mediocrity far behind.\nAt ${company}, as ${designation} they stand,\nCreating futures both brilliant and grand.`
  ];

  // Return a random poem
  return poems[Math.floor(Math.random() * poems.length)];
};

// Mock function to simulate portrait generation
export const generatePortrait = async (
  name: string, 
  designation: string, 
  mainImage: string, 
  style: ImageStyle = "professional",
  additionalImages: string[] = []
): Promise<string> => {
  console.log(`Generating ${style} portrait for ${name}, ${designation} with ${additionalImages.length + 1} reference images`);
  
  // Log information about additional images
  if (additionalImages.length > 0) {
    console.log(`Using ${additionalImages.length} additional reference images for better quality`);
  }
  
  // Simulate API call delay - longer for more images
  const baseDelay = 2000;
  const additionalDelay = additionalImages.length * 500; // 500ms extra per additional image
  await new Promise(resolve => setTimeout(resolve, baseDelay + additionalDelay));
  
  // Mock portrait URLs based on style
  const portraits = {
    professional: [
      "https://cdn.pixabay.com/photo/2016/11/21/14/53/adult-1845814_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/08/12/18/31/male-2634974_1280.jpg",
    ],
    linkedin: [
      "https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/11/02/14/26/model-2911330_1280.jpg",
    ],
    avatar: [
      "https://cdn.pixabay.com/photo/2022/10/03/16/04/anime-7496534_1280.jpg",
      "https://cdn.pixabay.com/photo/2022/12/01/04/40/fantasy-7628308_1280.jpg",
    ],
    marvel: [
      "https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg",
      "https://cdn.pixabay.com/photo/2020/07/02/19/36/marvel-5364165_1280.jpg",
    ],
    rockstar: [
      "https://cdn.pixabay.com/photo/2018/04/27/03/50/musician-3353823_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg",
    ],
    gta: [
      "https://cdn.pixabay.com/photo/2021/09/15/11/34/gaming-6626903_1280.jpg",
      "https://cdn.pixabay.com/photo/2023/06/02/14/10/gamer-8035908_1280.jpg",
    ]
  };

  // For demo, we'll return a random image from the style's collection
  // In a real app, this would be the URL from the AI-generated image
  const stylePortraits = portraits[style] || portraits.professional;
  return stylePortraits[Math.floor(Math.random() * stylePortraits.length)];
};
