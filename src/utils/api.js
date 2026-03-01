export const API_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

export async function fetchQuestions() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Fetch failed');
        return await response.json();
    } catch (error) {
        console.error('Error fetching questions:', error);
        // Return dummy data for development if URL is not set
        return [
            { id: 1, question: "這是測試題目 1", options: ["A", "B", "C", "D"], answer: "A" },
            { id: 2, question: "這是測試題目 2", options: ["1", "2", "3", "4"], answer: "1" }
        ];
    }
}

export async function submitScore(userId, responses) {
    try {
        // We avoid 'application/json' to prevent CORS preflight (OPTIONS)
        // GAS doesn't handle OPTIONS. We send it as text/plain.
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ userId, responses }),
        });
        const text = await response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error('Error submitting score:', error);
        return { status: 'error', score: 0 };
    }
}
