const {GoogleGenerativeAI} = require ("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI (apiKey);

const model = genAI.getGenerativeModel ({model : "gemini-1.5-flash"});

const generationConfig = {
    temperature : 0.7, // Reduced for more focused responses
    topP : 0.95,
    topK : 40,
    maxOutputTokens : 8192,
    responseMimeType : "text/plain",
};

// System prompt to guide the model's behavior
const systemPrompt = `You are a helpful AI assistant that answers questions based on PDF content.
When given a question and relevant content from a PDF:
1. Provide clear, concise answers based ONLY on the provided content
2. If the content doesn't contain the answer, say so honestly
3. Format your responses in clean HTML without code blocks
4. Highlight important information using <strong> or <em> tags
5. Organize information with paragraphs and lists when appropriate`;

export const chatSession = model.startChat ({
    generationConfig,
    history : [],
    systemInstruction: systemPrompt,
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());