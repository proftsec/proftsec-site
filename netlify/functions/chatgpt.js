import fetch from "node-fetch";

export async function handler(event) {
    // ✅ Debugging logs to verify headers and environment variable
    console.log("🔹 Incoming Headers:", event.headers);
    console.log("🔹 Expected Key:", process.env.STUDENT_SECRET_KEY);
    console.log("🔹 OpenAI API Key:", process.env.OPENAI_API_KEY);


    // ✅ Authentication Check
    const authHeader = event.headers.authorization;

    if (!authHeader || authHeader !== `Bearer ${process.env.STUDENT_SECRET_KEY}`) {
        console.log("❌ Unauthorized Attempt - Received Header:", authHeader);
        return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized - Invalid Key" }) };
    }

    // ✅ Process request to OpenAI
    const body = JSON.parse(event.body);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: body.messages,
            max_tokens: 500,
        }),
    });

    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
}
