import type { Item } from './items';

type User = {
	name: string;
	health: number;
	armorClass: number;
	items: Item[];
	attacks: Attack[];
	xp: number;
	xpToNextLevel: number;
};

type Attack = {
	name: string;
	damage: number;
	type: 'physical' | 'magic' | 'ranged' | 'regen';
	hitChanceModifier: number;
};

const physicalAttack: Attack = {
	name: 'Physical',
	damage: 10,
	hitChanceModifier: 10,
	type: 'physical',
};

const magicAttack: Attack = {
	name: 'Magic',
	damage: 20,
	hitChanceModifier: 5,
	type: 'magic',
};

const rangedAttack: Attack = {
	name: 'Ranged',
	damage: 15,
	hitChanceModifier: 7,
	type: 'ranged',
};

const regenAttack: Attack = {
	name: 'Regen',
	damage: 10,
	hitChanceModifier: 0,
	type: 'regen',
};

export const User: User = {
	name: 'User',
	health: 100,
	armorClass: 10,
	items: [],
	xp: 0,
	xpToNextLevel: 100,

	attacks: [physicalAttack, magicAttack, rangedAttack, regenAttack],
};
