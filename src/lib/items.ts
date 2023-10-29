export type Item = {
	name: string;
	description: string;
	healthModifier: number;
	acModifier: number;
	damageModifier: number;
};
export const Items: Item[] = [
	{
		name: 'Empowerment Ring',
		description: 'A ring that enhances your abilities, providing a boost to health and damage but reducing your armor.',
		healthModifier: +4,
		acModifier: -2,
		damageModifier: +3,
	},
	{
		name: 'Fortified Elixir',
		description: 'An elixir that fortifies your defenses and grants minor damage enhancement, but slightly reduces health.',
		healthModifier: -1,
		acModifier: +5,
		damageModifier: +1,
	},
	{
		name: 'Swift Cloak',
		description: 'A cloak that makes you swifter in combat, increasing your armor and damage but lowering your health.',
		healthModifier: -2,
		acModifier: +4,
		damageModifier: +3,
	},
	{
		name: "Eagle's Amulet",
		description: 'An amulet that grants heightened perception, slightly enhancing health and armor while providing a small damage boost.',
		healthModifier: +2,
		acModifier: +2,
		damageModifier: +1,
	},
	{
		name: 'Vitality Gauntlets',
		description: 'Gauntlets that enhance your vitality, increasing your health and damage but reducing your armor.',
		healthModifier: +4,
		acModifier: -3,
		damageModifier: +4,
	},
	{
		name: "Sorcerer's Robe",
		description: 'A robe that augments your magical abilities, offering health enhancement and damage boost, but decreasing your armor.',
		healthModifier: +3,
		acModifier: -2,
		damageModifier: +4,
	},
	{
		name: 'Mystical Pendant',
		description:
			'A pendant that enhances your mystical powers, providing a health increase and minor armor boost, but lowering your health.',
		healthModifier: -1,
		acModifier: +2,
		damageModifier: +4,
	},
	{
		name: 'Aegis Shield',
		description: 'A shield imbued with protective magic, granting health and armor bonuses while offering a slight damage increase.',
		healthModifier: +3,
		acModifier: +3,
		damageModifier: +1,
	},
	{
		name: 'Guardian Scroll',
		description: 'A scroll that summons a protective guardian, increasing your health and armor but offering a small damage enhancement.',
		healthModifier: +2,
		acModifier: +3,
		damageModifier: +0,
	},
	{
		name: "Champion's Sword",
		description: 'A sword fit for champions, enhancing your health and damage while reducing your armor slightly.',
		healthModifier: +4,
		acModifier: -1,
		damageModifier: +2,
	},
	{
		name: 'Cursed Boots',
		description: 'Boots that enhance your agility, increasing your armor and damage while reducing your health slightly.',
		healthModifier: -2,
		acModifier: +4,
		damageModifier: +3,
	},
	{
		name: "Serpent's Pendant",
		description: 'A pendant that grants the cunning of a serpent, providing a boost to damage and armor, but slightly lowering health.',
		healthModifier: -1,
		acModifier: +3,
		damageModifier: +3,
	},
	{
		name: 'Crimson Cloak',
		description: 'A cloak that grants power in exchange for vulnerability, increasing your damage and health while reducing your armor.',
		healthModifier: +4,
		acModifier: -2,
		damageModifier: +3,
	},
	{
		name: "Warden's Amulet",
		description: 'An amulet that bestows the role of a warden, enhancing health and armor while providing a small damage boost.',
		healthModifier: +4,
		acModifier: +3,
		damageModifier: -2,
	},
	{
		name: 'Blazing Gauntlets',
		description: 'Gauntlets imbued with the power of fire, increasing damage and armor but reducing health slightly.',
		healthModifier: -2,
		acModifier: +3,
		damageModifier: +4,
	},
	{
		name: 'Mystic Robe',
		description: 'A robe that augments your mystical abilities, offering health enhancement and damage boost, but decreasing your armor.',
		healthModifier: +3,
		acModifier: -2,
		damageModifier: +4,
	},
	{
		name: 'Gilded Pendant',
		description: 'A pendant that bestows a regal aura, providing health and armor bonuses while slightly lowering your damage output.',
		healthModifier: +3,
		acModifier: +3,
		damageModifier: -1,
	},
	{
		name: "Sentinel's Shield",
		description: 'A shield with guardian magic, granting health and armor bonuses while offering a slight damage reduction.',
		healthModifier: +3,
		acModifier: +4,
		damageModifier: -2,
	},
	{
		name: 'Eldritch Scroll',
		description: 'A scroll that taps into eldritch forces, increasing health and armor but slightly reducing your damage output.',
		healthModifier: +2,
		acModifier: +4,
		damageModifier: -1,
	},
	{
		name: 'Savage Axe',
		description: 'A mighty axe fit for savages, enhancing damage and health while reducing your armor slightly.',
		healthModifier: +4,
		acModifier: -2,
		damageModifier: +3,
	},
];
