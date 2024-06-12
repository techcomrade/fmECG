import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
  apiKey: '',
});

const openai = new OpenAIApi(configuration);

export default openai;