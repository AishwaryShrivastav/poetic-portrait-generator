
import { ImageStyle } from "../types/types";

// This is a utility service for making OpenAI API calls directly from the frontend
// NOTE: This is not recommended for production use as it exposes your API key

export interface OpenAIImageResponse {
  created: number;
  data: {
    url: string;
  }[];
}

export async function generatePoem(
  name: string,
  designation: string,
  company: string
): Promise<string> {
  try {
    const apiKey = prompt("Enter your OpenAI API key for poem generation:");
    
    if (!apiKey) {
      throw new Error("API Key is required");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional poet who writes personalized, inspirational poems."
          },
          {
            role: "user",
            content: `Write a beautiful, inspiring 4-line poem for ${name}, who works as a ${designation} at ${company}. The poem should be uplifting and professional. Limit to exactly 4 lines, each line being concise.`
          }
        ],
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating poem:", error);
    throw error;
  }
}

export async function generatePortrait(
  name: string,
  designation: string,
  imageBase64: string,
  style: ImageStyle = "professional"
): Promise<string> {
  try {
    const apiKey = prompt("Enter your OpenAI API key for portrait generation:");
    
    if (!apiKey) {
      throw new Error("API Key is required");
    }

    // Create style-specific prompts
    let portraitPrompt = "";
    
    switch(style) {
      case "professional":
        portraitPrompt = `Create a professional, animated-style portrait for ${name} who works as a ${designation}. 
        The portrait should be a high-quality, artistic representation that clearly shows their face and reflects their professional role. 
        Make the portrait vibrant and detailed with a neutral background suitable for professional use. 
        The face should be front-facing and clearly visible, matching the appearance in the reference image.`;
        break;
      case "linkedin":
        portraitPrompt = `Create a professional LinkedIn headshot for ${name} who works as a ${designation}. 
        The headshot should be business appropriate, with the person wearing professional attire, on a neutral or office background.
        Make it look like a professionally photographed LinkedIn profile picture with proper lighting and framing.
        The face should be front-facing and clearly visible, matching the appearance in the reference image.`;
        break;
      case "avatar":
        portraitPrompt = `Create a stylized AI avatar for ${name} who works as a ${designation} at their company.
        The avatar should be a polished, digital representation that clearly shows their face but with a modern, tech-inspired aesthetic.
        Add subtle elements that relate to their job as a ${designation}. Use a gradient or tech-inspired background.
        The face should clearly match the appearance in the reference image while looking digital and enhanced.`;
        break;
      case "marvel":
        portraitPrompt = `Create an image of ${name} as a Marvel superhero character. 
        Maintain their facial features but transform them into a superhero with a costume, powers, and heroic pose.
        The superhero design should subtly connect to their profession as a ${designation}.
        Use the dramatic lighting and vibrant colors typical of Marvel movie posters. Make it epic and powerful.
        The face should still be recognizable compared to the reference image.`;
        break;
      case "rockstar":
        portraitPrompt = `Create an image of ${name} as a famous rock music star on stage.
        Show them performing with a microphone or instrument, with stage lighting, possibly a crowd in the background.
        Give them a rockstar look with appropriate styling, clothing, and attitude while maintaining their facial features.
        The scene should be energetic and dynamic with concert lighting effects.
        The face should still be recognizable compared to the reference image.`;
        break;
      case "gta":
        portraitPrompt = `Create a GTA-style character portrait of ${name} who works as a ${designation}.
        Use the iconic Grand Theft Auto video game art style with bold colors, slightly exaggerated features, and the characteristic 3/4 view.
        Include a city backdrop and styling that matches the GTA aesthetic while keeping their facial features recognizable.
        The portrait should look like an official character artwork from the game while maintaining the person's likeness from the reference image.`;
        break;
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: portraitPrompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      throw new Error(`DALL-E API error: ${response.statusText}`);
    }

    const data: OpenAIImageResponse = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error("Error generating portrait:", error);
    throw error;
  }
}
