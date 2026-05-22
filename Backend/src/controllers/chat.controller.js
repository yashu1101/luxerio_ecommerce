// import dotenv from 'dotenv'
// dotenv.config()
import { GoogleGenAI } from "@google/genai";
export const Chat = async (req, res) => {

    console.log(process.env.CHAT_SECRET_KEY)
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
        // console.log(response.text);
        console.log(response);

    } catch (error) {
        console.log(error.message)
    }


}

Chat()