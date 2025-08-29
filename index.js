require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('whatsapp-web.js');
const initSession = require('./src/session');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const client = new Client({
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--headless',
            '--disable-gpu',
            '--remote-debugging-port=9222'
        ],
    }
});

initSession(client);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});