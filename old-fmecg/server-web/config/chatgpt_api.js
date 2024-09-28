const {OpenAI} = require('openai');
const openAICert = require('../certs/openai_credentials.json')
const openai = new OpenAI({
    apiKey: openAICert["chat-gpt-token"]
});

module.exports = openai;