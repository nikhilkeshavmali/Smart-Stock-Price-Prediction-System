import { GoogleGenerativeAI } from "@google/generative-ai";

export async function handleChatMessage(message: string) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyB1I81RURALs2zq25rYkCjMavKDCRnGyTA",
  );
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini:", error);
    throw error;
  }
}
