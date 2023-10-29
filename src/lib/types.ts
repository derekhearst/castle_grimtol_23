export type CharacterCompletion = {
	name: string;
	health: number;
	attacks: Attack[];
	description: string;
	armorClass: number;
};

export type Attack = {
	name: string;
	damage: number;
	hitChanceModifier: number;
	type: 'physical' | 'magic' | 'ranged' | 'regen';
};

export type hitLog = {
	isUser: boolean;
	hit: boolean;
	damage: number;
	attack: Attack;
	rollNeeded: number;
	roll: number;
};
