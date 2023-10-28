import { openAIClient } from '$lib/server/openAI';
import type { CharacterCompletion } from '$lib/types';

export async function load({ params }) {
	const floor = parseInt(params.id);
	const healthModifier = Math.min(floor * 5, 100);
	const damageModifier = Math.min(floor * 2, 10);
	const hitChanceModifier = Math.min(floor * 2, 15);

	const message = await openAIClient.completions.create({
		model: 'gpt-3.5-turbo-instruct',
		prompt: [
			`Generate a halloween themed character with a 4 unique attack types in json, with the following stats per attack: name, damage. (between 1 and ${damageModifier}) , hit chance modifier (between 0 and ${hitChanceModifier}). The attacks should be in an array called "attacks". The name of the character should be in a field called name, also generate a field called "health" with a number between 1 and ${healthModifier}. All numbers generated should be integers`
		],
		max_tokens: 300
	});
	const parsed: CharacterCompletion = JSON.parse(message.choices[0].text);
	const name = parsed.name;
	const health = parsed.health;
	const attacks = parsed.attacks;
	return {
		parsed,
		name,
		health,
		attacks
	};
}
