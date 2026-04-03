import { GoogleGenerativeAI } from "@google/generative-ai";

export async function handleChatMessage(message: string) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCEapjZaXDhmqeP34aNZiZnxdocmDdc4Gc",
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
