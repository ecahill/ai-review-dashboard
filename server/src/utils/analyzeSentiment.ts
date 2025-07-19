// TODO: Replace with call to OpenAI
export async function analyzeSentiment (text: string) {
    const lower = text.toLowerCase();
    if (lower.includes('bad') || lower.includes('terrible')) {
        return { sentiment: 'negative', ai_confidence: 0.9 };
    } else if (lower.includes('good') || lower.includes('great')) {
        return { sentiment: 'positive', ai_confidence: 0.95 };
    } else {
        return { sentiment: 'neutral', ai_confidence: 0.6 };
    }
}