
import { GoogleGenAI } from "@google/genai";
export const Chat = async (req, res) => {

    
    try {
        const { AiQuestion } = req.body;
        const ai = new GoogleGenAI({ apiKey: process.env.CHAT_SECRET_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: AiQuestion,
        });

        res.status(200).json({
            AiAnswer: response.text
        })



    } catch (error) {

        res.status(500).json({ message: error.message })
    }


}

// Chat()