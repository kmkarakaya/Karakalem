import { GoogleGenAI } from "@google/genai";
import { CharcoalStyle } from "../types";

const MODEL_NAME = 'gemini-2.5-flash-image';

export const generateCharcoalSketch = async (base64Image: string, mimeType: string, style: CharcoalStyle, apiKey: string): Promise<string> => {
  try {
    if (!apiKey) {
        throw new Error("API Anahtarı bulunamadı. Lütfen ayarlar menüsünden geçerli bir Gemini API anahtarı girin.");
    }

    // Initialize the client dynamically with the provided key
    const ai = new GoogleGenAI({ apiKey: apiKey });

    let styleDescription = "";
    
    switch (style) {
        case CharcoalStyle.LIGHT:
            styleDescription = "Use light pencil strokes, subtle shading, minimal contrast, soft and airy feel. Focus on delicate outlines.";
            break;
        case CharcoalStyle.HEAVY:
            styleDescription = "Use deep shadows, dark heavy charcoal application, dramatic lighting, high contrast, bold strokes. Smudged texture effect.";
            break;
        case CharcoalStyle.CROSS_HATCH:
            styleDescription = "Use artistic cross-hatching technique, linear shading patterns, detailed line work, ink-like precision.";
            break;
        case CharcoalStyle.STANDARD:
        default:
            styleDescription = "High contrast, artistic shading, balanced composition. Classic charcoal technique.";
            break;
    }

    const prompt = `Convert this image into a high-quality, detailed charcoal sketch (karakalem). Keep the composition exactly the same. Render it in black and white artistic charcoal style on paper texture. Style requirements: ${styleDescription}`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        // No system instruction for image editing/generation typically needed, prompt is sufficient
      }
    });

    let imageUrl: string | null = null;

    // Iterate through candidates and parts to find the image
    if (response.candidates && response.candidates.length > 0) {
        const content = response.candidates[0].content;
        if (content && content.parts) {
            for (const part of content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                    break;
                }
            }
        }
    }

    if (!imageUrl) {
      // Fallback: Check if the model refused or returned only text explaining why
      const textPart = response.text;
      throw new Error(textPart || "Görüntü oluşturulamadı. Lütfen farklı bir resim deneyin.");
    }

    return imageUrl;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Provide cleaner error messages for common issues
    if (error.message?.includes('API key')) {
        throw new Error("API Anahtarı geçersiz veya hatalı. Lütfen kontrol edip tekrar deneyin.");
    }
    throw new Error(error.message || "Karakalem dönüştürme işlemi sırasında bir hata oluştu.");
  }
};