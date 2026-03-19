const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = "AIzaSyAhtaJKOtHWgjBOmkE27ItF_kRiMmL6r6w";
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
}
run();
