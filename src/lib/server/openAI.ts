import OpenAI from 'openai';
import { env } from '$env/dynamic/private';

export const openAIClient = new OpenAI({
	apiKey: env.OPENAI_KEY,
	organization: 'org-4VDIvZ6CvoH7SE93snUYeJ7v'
});
