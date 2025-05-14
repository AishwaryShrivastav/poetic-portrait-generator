

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
  imageBase64: string
): Promise<string> {
  try {
    const apiKey = prompt("Enter your OpenAI API key for portrait generation:");
    
    if (!apiKey) {
      throw new Error("API Key is required");
    }

    // Create a more detailed prompt for the portrait generation that includes professional role
    const portraitPrompt = `Create a professional, animated-style portrait for ${name} who works as a ${designation}. 
    The portrait should be a high-quality, artistic representation that clearly shows their face and reflects their professional role. 
    Make the portrait vibrant and detailed with a neutral background suitable for professional use. 
    The face should be front-facing and clearly visible, matching the appearance in the reference image.`;

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
