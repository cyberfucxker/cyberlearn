
import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedContent } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]);
        } else {
            resolve(''); // Should not happen with readAsDataURL
        }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const contentSchema = {
  type: Type.OBJECT,
  properties: {
    quizzes: {
      type: Type.ARRAY,
      description: "A list of multiple-choice quiz questions based on the document.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "The quiz question."
          },
          options: {
            type: Type.ARRAY,
            description: "An array of 4 possible answers (strings).",
            items: { type: Type.STRING }
          },
          correctAnswer: {
            type: Type.STRING,
            description: "The correct answer from the options array."
          }
        },
        required: ["question", "options", "correctAnswer"]
      }
    },
    flashcards: {
      type: Type.ARRAY,
      description: "A list of flashcards with key terms and definitions.",
      items: {
        type: Type.OBJECT,
        properties: {
          term: {
            type: Type.STRING,
            description: "The key term or concept."
          },
          definition: {
            type: Type.STRING,
            description: "A concise definition of the term."
          }
        },
        required: ["term", "definition"]
      }
    }
  },
  required: ["quizzes", "flashcards"]
};

export const generateContentFromPdf = async (pdfFile: File): Promise<GeneratedContent> => {
  try {
    const pdfPart = await fileToGenerativePart(pdfFile);
    const prompt = "Analyze this cyberpsychology document. Based on its content, generate 5 multiple-choice quiz questions and 10 flashcards. The questions should test key concepts, and the flashcards should define important terminology. Ensure the output is structured according to the provided JSON schema.";
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
          parts: [pdfPart, { text: prompt }]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: contentSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as GeneratedContent;

  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    if (error instanceof Error && error.message.includes('SAFETY')) {
      throw new Error("Content generation was blocked due to safety policies. Please try a different document.");
    }
    throw new Error("Failed to communicate with the AI model.");
  }
};
