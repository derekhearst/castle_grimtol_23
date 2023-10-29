import { openAIClient } from '$lib/server/openAI';
import type { CharacterCompletion } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const floor = parseInt(params.id);
	const healthModifier = Math.min(floor * 10, 100);
	const damageModifier = Math.min(floor * 2, 10);
	const hitChanceModifier = Math.min(floor * 2, 15);
	const armorClass = Math.min(8 + floor, 15);
	const xpGain = Math.min(floor * 15, 100);
	let message;
	try {
		message = await openAIClient.completions.create({
			model: 'gpt-3.5-turbo-instruct',
			prompt: [
				`Generate a halloween themed character with the following data in JSON format. name, health (integer between 1 and ${healthModifier}), description (a short description on how the character looks), attacks (an array of 4 attacks with the following data. name, damage (integer between 1 and ${damageModifier}), hitChanceModifier (integer between 1 and ${hitChanceModifier}),  type (regen,magic,ranged,or physical)), armorClass(integer between 8 and ${armorClass} )`,
			],
			max_tokens: 300,
		});
	} catch {
		throw error(500, 'Failed to generate character');
	}
	let parsed: CharacterCompletion;
	try {
		parsed = JSON.parse(message.choices[0].text);
	} catch (e) {
		console.log(e, message.choices[0].text);
		throw error(500, 'Failed to parse generated character');
	}
	const imageGen = await openAIClient.images.generate({
		prompt: parsed.description,
		size: '256x256',
	});
	const name = parsed.name;
	const health = parsed.health;
	const attacks = parsed.attacks;
	const ac = parsed.armorClass;
	console.log(floor);
	return {
		parsed,
		name,
		health,
		attacks,
		imageGen,
		ac,
		floor,
		xpGain,
	};
}
