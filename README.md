# Whatsapp AI Chatbot

A simple interactive whatsapp chatbot powered by AI, ready for deploy in Heroku.

### Technologies:
- Express.js
- whatsapp-web.js
- Open Router
- z.ai

### Configuration:
- Create the `.env` file and set the `PORT` and `OPEN_ROUTER_API_KEY` variables.
- Edit the `MODEL` and `AGENT_CONTEXT` to set up AI answers.

### Usage:
- Run `npm install` and then `npm start` or `npm run dev` (for use nodemon).
- Authenticate with QR Code in the terminal (same in Heroku).
- Every incoming message will be answered using the configured AI model.