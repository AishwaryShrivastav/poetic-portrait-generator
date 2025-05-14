
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
  try {
    console.log(`Starting portrait generation process for ${name}, ${designation}`);
    console.log(`Selected style: ${style}`);
    console.log(`Number of reference images: ${additionalImages.length + 1}`);
    console.log(`Main image length: ${mainImage?.length > 100 ? mainImage.substring(0, 100) + '...' : 'Invalid or empty'}`);
    
    if (!mainImage || mainImage.length < 100) {
      console.error('Main image data is invalid or empty');
      throw new Error('Invalid main image data');
    }
    
    // Log information about additional images
    if (additionalImages.length > 0) {
      console.log(`Using ${additionalImages.length} additional reference images for better quality`);
      additionalImages.forEach((img, i) => {
        console.log(`Additional image ${i + 1} length: ${img?.length > 100 ? img.substring(0, 100) + '...' : 'Invalid or empty'}`);
      });
    }
    
    // Simulate API call delay - longer for more images
    const baseDelay = 2000;
    const additionalDelay = additionalImages.length * 500; // 500ms extra per additional image
    console.log(`Simulating API delay: ${baseDelay + additionalDelay}ms`);
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
    
    // Check if the style exists in our portraits object
    if (!portraits[style]) {
      console.warn(`Style "${style}" not found, defaulting to professional`);
      style = "professional";
    }
    
    // For demo, we'll return a random image from the style's collection
    const stylePortraits = portraits[style];
    const selectedImage = stylePortraits[Math.floor(Math.random() * stylePortraits.length)];
    console.log(`Generated portrait URL: ${selectedImage}`);
    return selectedImage;
  } catch (error) {
    console.error('Error in generatePortrait:', error);
    // Return a fallback image instead of throwing to avoid breaking the UI
    return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }
};
