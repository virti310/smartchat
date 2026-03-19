const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyAhtaJKOtHWgjBOmkE27ItF_kRiMmL6r6w";
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent("Hello!");
        console.log("Success:", result.response.text());
    } catch (error) {
        console.error("Error:", error);
    }
}

run();
