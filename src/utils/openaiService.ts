
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

// Improved function to simulate portrait generation with reference images
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
    
    // Validate main image data
    if (!mainImage || mainImage.length < 100 || !mainImage.startsWith('data:image')) {
      console.error('Main image data is invalid or empty');
      throw new Error('Invalid main image data');
    }
    console.log(`Main image length: ${mainImage.length > 100 ? mainImage.substring(0, 100) + '...' : 'Invalid or empty'}`);
    
    // Log information about additional images
    if (additionalImages.length > 0) {
      console.log(`Using ${additionalImages.length} additional reference images for better quality`);
      additionalImages.forEach((img, i) => {
        if (img && img.length > 100) {
          console.log(`Additional image ${i + 1} length: ${img.substring(0, 100) + '...'}`);
        } else {
          console.warn(`Additional image ${i + 1} is invalid or empty`);
        }
      });
    }
    
    // Simulate API call delay - longer for more images
    const baseDelay = 2000;
    const additionalDelay = additionalImages.length * 500; // 500ms extra per additional image
    console.log(`Simulating API delay: ${baseDelay + additionalDelay}ms`);
    await new Promise(resolve => setTimeout(resolve, baseDelay + additionalDelay));
    
    // In a real implementation, we would send the images to the OpenAI API
    // For this mock service, we'll return style-based portraits that are more consistent
    
    // More consistent portrait URLs based on style - these would be replaced with actual AI-generated images
    const portraits = {
      professional: [
        "https://cdn.pixabay.com/photo/2016/11/21/14/53/adult-1845814_1280.jpg",
      ],
      linkedin: [
        "https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869_1280.jpg",
      ],
      avatar: [
        "https://cdn.pixabay.com/photo/2022/10/03/16/04/anime-7496534_1280.jpg",
      ],
      marvel: [
        "https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg",
      ],
      rockstar: [
        "https://cdn.pixabay.com/photo/2018/04/27/03/50/musician-3353823_1280.jpg",
      ],
      gta: [
        "https://cdn.pixabay.com/photo/2021/09/15/11/34/gaming-6626903_1280.jpg",
      ]
    };
    
    // Check if the style exists in our portraits object
    if (!portraits[style]) {
      console.warn(`Style "${style}" not found, defaulting to professional`);
      style = "professional";
    }
    
    // Instead of random selection, we'll now use a consistent image for each style
    const selectedImage = portraits[style][0];
    console.log(`Generated portrait URL for style ${style}: ${selectedImage}`);
    return selectedImage;
  } catch (error) {
    console.error('Error in generatePortrait:', error);
    // Return a fallback image instead of throwing to avoid breaking the UI
    return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }
};
