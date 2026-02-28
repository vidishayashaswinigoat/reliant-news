import { GoogleGenAI, Chat, Type } from "@google/genai";
import { Article, VerificationResult, PrimaryMetric } from '../types';

let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} else {
    console.warn("API_KEY environment variable not set. Gemini API will not be available.");
}

const getMetricExplanation = (article: Article): string => {
    const { primaryMetric, metrics } = article.analysis;
    switch (primaryMetric) {
        case 'ideologicalLeaning':
            const leaning = metrics.ideologicalLeaning ?? 0;
            const direction = leaning > 0.1 ? 'Right' : leaning < -0.1 ? 'Left' : 'Neutral';
            return `This is a political article, so Reliant measures Ideological Leaning. It has a score of ${leaning.toFixed(2)}, indicating a ${direction} leaning.`;
        case 'factualIntegrity':
            return `This is a scientific or health-related article. Reliant measures its Factual Integrity, which is ${(metrics.factualIntegrity ?? 0) * 100}%. This score reflects the proportion of verifiable, evidence-based statements.`;
        case 'hypeBias':
            const hype = metrics.hypeBias ?? 0;
            const hypeDirection = hype > 0.1 ? 'Hype' : hype < -0.1 ? 'Fear' : 'Balanced';
            return `For technology, Reliant measures Hype Bias. This article scores ${hype.toFixed(2)}, suggesting a tone of ${hypeDirection}.`;
        case 'sentimentIntensity':
             return `For genres like Sports or Culture, Reliant measures Sentiment Intensity. This article has an intensity of ${metrics.sentimentIntensity?.toFixed(2)}, indicating its emotional charge.`;
        default:
            return "Reliant analyzes this article for potential bias and framing."
    }
}

export const createChat = (article: Article): Chat | null => {
    if (!ai) return null;

    const metricExplanation = getMetricExplanation(article);

    const systemInstruction = `You are "Reliant Assistant," a neutral, factual, and helpful AI media literacy guide. Your goal is to help users understand the news article they are reading.
    
    Your knowledge is based on the following article:
    - Title: "${article.title}"
    - Source: ${article.source}
    - Summary: ${article.summary}
    - Reliant's Analysis:
        - ${metricExplanation}
        - Sentiment: ${article.analysis.sentiment.score}
        - Key Topics: ${article.analysis.topics.join(', ')}
        - Key Claims: ${article.analysis.claims.map(c => `"${c.statement}"`).join('; ')}

    When asked a question, provide concise, clear, and objective answers based ONLY on the provided article context. Do not invent information. If a question goes beyond the article's scope, state that you cannot answer it.
    
    Example interactions:
    - User: "Summarize this article." -> Provide a brief summary based on the text.
    - User: "Why does Reliant rate it this way?" -> Explain the primary metric using the 'explainability' phrases: "${article.analysis.explainability.join(', ')}".
    - User: "What are the main points?" -> List the key claims.
    `;

    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.2,
        },
    });
};

export const createCoAnalystChat = (industry: string, focus: string): Chat | null => {
    if (!ai) return null;

    const systemInstruction = `You are an AI Co-Analyst, a strategic co-pilot for a business professional. Your user is in the **${industry}** sector, with a specific focus on **${focus}**. 
    
    Your primary functions are:
    1.  **Analyze Market Trends:** Identify and explain emerging trends relevant to their focus.
    2.  **Assess Competitor Strategy:** Summarize competitor actions, messaging, and potential threats.
    3.  **Deconstruct Policy Impacts:** Explain how new regulations or government policies could affect their business.
    4.  **Identify Opportunities:** Highlight potential market gaps, product adjacencies, or strategic partnerships.
    
    Guidelines:
    -   **Be Concise & Actionable:** Provide executive-level summaries. Avoid jargon. Focus on "so what?" for the business.
    -   **Data-Driven:** Base your answers on credible news patterns and market signals.
    -   **Maintain a Neutral, Professional Tone:** You are a strategic advisor, not a cheerleader or a doomsayer.
    -   **Ask Clarifying Questions:** If a user's query is too broad, ask for more specific context to provide a better answer (e.g., "Which competitor are you most interested in?").
    -   **Do not invent information:** If you do not have enough information, state that clearly.
    `;

    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.3,
        },
    });
};

export const getReadingHabitsInsight = async (readArticles: Article[]): Promise<string> => {
    if (!ai) {
        return "Reliant Assistant is unavailable. API Key may be missing.";
    }

    const totalReads = readArticles.length;
    if (totalReads === 0) {
        return "No reading data available to analyze.";
    }
    
    const politicalArticles = readArticles.filter(a => a.analysis.primaryMetric === 'ideologicalLeaning');
    const avgBias = politicalArticles.length > 0
        ? politicalArticles.reduce((acc, article) => acc + (article.analysis.metrics.ideologicalLeaning ?? 0), 0) / politicalArticles.length
        : 0;
    const biasLabel = avgBias > 0.1 ? 'Right-Leaning' : avgBias < -0.1 ? 'Left-Leaning' : 'Neutral';

    const distinctGenres = new Set(readArticles.map(a => a.genre));
    const diversityIndex = (distinctGenres.size / totalReads) * 100;

    const sentimentCounts = readArticles.reduce((acc, article) => {
        acc[article.analysis.sentiment.score] = (acc[article.analysis.sentiment.score] || 0) + 1;
        return acc;
    }, {} as Record<'Positive' | 'Negative' | 'Neutral', number>);
    
    const sentimentDistribution = `Positive: ${((sentimentCounts.Positive || 0) / totalReads * 100).toFixed(0)}%, Neutral: ${((sentimentCounts.Neutral || 0) / totalReads * 100).toFixed(0)}%, Negative: ${((sentimentCounts.Negative || 0) / totalReads * 100).toFixed(0)}%`;

    const genreBias: { [key: string]: { totalBias: number; count: number } } = {};
    for (const article of politicalArticles) {
        if (!genreBias[article.genre]) {
            genreBias[article.genre] = { totalBias: 0, count: 0 };
        }
        genreBias[article.genre].totalBias += article.analysis.metrics.ideologicalLeaning ?? 0;
        genreBias[article.genre].count += 1;
    }
    const biasByGenreSummary = Object.entries(genreBias)
        .map(([genre, data]) => `${genre}: ${(data.totalBias / data.count).toFixed(2)}`)
        .slice(0, 5) // Limit to top 5 for conciseness
        .join(', ');

    const systemInstruction = `You are "Reliant Assistant." Your task is to analyze a user's news reading habits based on provided statistics and generate a brief, insightful, and encouraging summary. Your tone should be that of a helpful media mentor—factual, balanced, and constructive. Do not be judgmental. The goal is to promote self-awareness and conscious media consumption. Your response should have two parts: 1) A short paragraph summarizing the key patterns. 2) A single, actionable suggestion for how the user could broaden their perspective.`;

    const userPrompt = `Here are my reading statistics:
- Total Articles Read: ${totalReads}
- Reading Diversity Index (RDI): ${diversityIndex.toFixed(0)}%
- Overall Average Ideological Bias (from political news): ${avgBias.toFixed(2)} (${biasLabel})
- Sentiment Distribution: ${sentimentDistribution}
- Average Ideological Bias by Genre: ${biasByGenreSummary || 'N/A'}

Based on these stats, please provide a short summary of my reading patterns and one concrete suggestion on how I could diversify my reading. Focus on the ideological bias if available, otherwise comment on genre diversity.`;

    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
          }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating reading habits insight:", error);
        return "Sorry, I encountered an error while analyzing your habits. Please try again later.";
    }
};

export const verifyTextContent = async (text: string): Promise<VerificationResult> => {
    if (!ai) {
        throw new Error("Gemini API not initialized. API Key may be missing.");
    }
    
    const schema = {
        type: Type.OBJECT,
        properties: {
            overallVerdict: { type: Type.STRING, enum: ['True', 'False', 'Partially True', 'Unverified'], description: 'The final verdict on the overall text.' },
            confidenceScore: { type: Type.NUMBER, description: 'A score from 0 to 100 representing the confidence in the verdict.' },
            claims: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        claim: { type: Type.STRING, description: 'The specific claim extracted from the text.' },
                        status: { type: Type.STRING, enum: ['True', 'False', 'Partially True', 'Unverified'], description: 'The verdict for this specific claim.' },
                    },
                    required: ['claim', 'status']
                }
            },
            framingAnalysis: { type: Type.STRING, description: 'A brief analysis of the text\'s tone, framing, and potential bias (e.g., sensationalized, neutral, fear-mongering).' },
            verifiedSources: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'A list of credible source names that corroborate or debunk the claims.' },
        },
        required: ['overallVerdict', 'confidenceScore', 'claims', 'framingAnalysis', 'verifiedSources'],
    };

    const systemInstruction = `You are "Reliant Verify," an expert AI fact-checker. Your task is to analyze the provided text snippet and determine its factual accuracy. Cross-reference the claims against your internal knowledge base of trusted news sources, official statements, and fact-checking organizations.
1. Extract the main factual claims from the text.
2. For each claim, determine if it is True, False, Partially True, or if you cannot verify it.
3. Provide an overall verdict for the entire text snippet.
4. Provide a confidence score (0-100) for your overall verdict.
5. Analyze the text for its framing and tone (e.g., "sensationalized," "neutral," "emotionally charged").
6. List the names of credible sources that confirm or deny the claims.
7. Respond ONLY with the JSON object that adheres to the provided schema. Do not add any conversational text or markdown.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text }] }],
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: schema,
                temperature: 0.1,
            },
        });
        
        const resultJson = response.text.trim();
        const parsedResult = JSON.parse(resultJson);
        return parsedResult as VerificationResult;
    } catch (error) {
        console.error("Error verifying text content:", error);
        throw new Error("Failed to get a valid verification result from the AI.");
    }
};

export const generateImpactAnalysis = async (article: Article, industry: string, focus: string): Promise<string> => {
    if (!ai) {
        return "Business Intelligence Assistant is unavailable. API Key may be missing.";
    }

    const systemInstruction = `You are a world-class business intelligence analyst. Your client operates in the **${industry}** sector, with a specific business focus on **"${focus}"**.
    Your task is to analyze the following news article and provide a concise, actionable insight on its potential impact on their business.
    
    Structure your response into 2-3 short, clear bullet points using markdown.
    - Start with a direct statement of the impact (e.g., "**Increased R&D costs:**").
    - Then, briefly explain *why* based on the article's content.
    - Conclude with a strategic consideration or a question for the business leader.
    
    Maintain a professional, executive tone. Do not add conversational fluff. Focus ONLY on what is relevant to the client's stated industry and focus.`;
    
    const userPrompt = `Analyze the following article for its business impact:
    - **Article Title:** "${article.title}"
    - **Source:** ${article.source}
    - **Summary:** ${article.summary}`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.4,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating impact analysis:", error);
        throw new Error("Failed to generate impact analysis from the AI.");
    }
};
