import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
 
export async function analyzeSentiment (text: string): Promise<{ sentiment: 'positive'|'neutral'|'negative', ai_confidence: number }> {
    const prompt = `Classify the sentiment of this review as "positive", "neutral", or "negative":\n\n"${text}"`;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
    });

    const sentimentResponse = response.choices[0].message.content?.toLowerCase().trim();
    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    if (sentimentResponse?.includes('positive')) sentiment = 'positive';
    if (sentimentResponse?.includes('neutral')) sentiment = 'neutral';
    if (sentimentResponse?.includes('negative')) sentiment = 'negative';

    const ai_confidence = response.choices[0].finish_reason === 'stop' ? 0.95: 0.8;

    return { sentiment, ai_confidence };
}