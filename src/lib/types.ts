export type CharacterCompletion = {
	name: string;
	health: number;
	attacks: Attack[];
};

export type Attack = {
	name: string;
	damage: number;
	hitChanceModifier: number;
};
