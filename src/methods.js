require('dotenv').config();
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;
const OPEN_ROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "z-ai/glm-4.5-air:free";
const AGENT_CONTEXT = "You are a virtual assistant for the Development Company. Help customers clearly and politely."

async function generateAnswer(userMessage, model) {
    try {
        const response = await axios.post(
            OPEN_ROUTER_URL,
            {
                model: model,
                messages: [
                    { role: "system", content: AGENT_CONTEXT },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPEN_ROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error generating answer to question: ", error.response?.data || error.message);
        return "Sorry, we couldn't process your request right now. Please try again later.";
    }
}

const methods = {
    onQRCode: qr => {
        console.log("QR authentication started!")
        qrcode.generate(qr, { small: true });
    },
    onReady: () => {
        console.log('Client is ready!');
    },
    onDisconnected: (reason, client) => {
        console.log('Client is disconnected! reason: ' + reason);
        client.initialize();
    },
    onMessage: async (message, client) => {
        console.log("Message Received: ", message.body);
        const reply = await generateAnswer(message.body, MODEL);
        await client.sendMessage(message.from, reply);
    }
}

module.exports = methods;