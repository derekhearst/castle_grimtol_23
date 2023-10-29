<script lang="ts">
	import { afterNavigate, goto, onNavigate } from '$app/navigation';
	import { navigating } from '$app/stores';
	import type { Attack, hitLog } from '$lib/types';
	import { User } from '$lib/user';
	import { fade, fly } from 'svelte/transition';
	import Layout from '../../+layout.svelte';
	import { Items, type Item } from '$lib/items';
	export let data;

	afterNavigate(() => {
		if (data.floor == 1) {
			User.health = 100;
		}
		if (data.floor == 20) {
			goto('/win');
		}
		log = [];
	});

	let log: string[] = [];
	let gameOverDialog: HTMLDialogElement | undefined;
	let killedEnemyDialog: HTMLDialogElement | undefined;
	let levelUpDialog: HTMLDialogElement | undefined;
	let itemPickerDialog: HTMLDialogElement | undefined;

	let selectAbleItems: Item[] = [];

	$: reducedItemAttack = User.items.reduce((a, b) => a + b.damageModifier, 0);
	$: reducedItemAc = User.items.reduce((a, b) => a + b.acModifier, 0);
	$: reducedItemHealth = User.items.reduce((a, b) => a + b.healthModifier, 0);

	$: currentEnemyHealth = data.health;
	$: console.log(currentEnemyHealth);
	function attackGuy(a: Attack) {
		if (a.type == 'regen') {
			const damage = Math.floor(Math.random() * 20 + a.damage + reducedItemAttack);
			User.health += damage;
			log = [...log, `You healed for ${damage} health with ${a.name}!`];
			if (User.health > 100 + reducedItemHealth) {
				User.health = 100 + reducedItemHealth;
			}
			enemyAttack();
			return;
		}
		const hitChance = Math.floor(Math.random() * 20 + a.hitChanceModifier);
		if (hitChance > data.ac) {
			const damage = Math.floor(Math.random() * 20 + a.damage + reducedItemAttack);
			log = [...log, `You hit the enemy for ${damage} damage with ${a.name}!`];
			currentEnemyHealth = currentEnemyHealth - damage;
			if (currentEnemyHealth <= 0) {
				currentEnemyHealth = 0;
				log = [...log, `You killed ${data.name}!`];
				User.xp += data.xpGain;
				killedEnemyDialog?.showModal();
				if (User.xp >= User.xpToNextLevel) {
					User.xp = 0;
					User.xpToNextLevel = Math.floor(User.xpToNextLevel * 1.1);
					User.health = 100 + reducedItemHealth;
					log = [...log, `You leveled up!`];
					levelUpDialog?.showModal();
				}
				if (Math.random() > 0.5) {
					while (selectAbleItems.length < 3) {
						const randomIndex = Math.floor(Math.random() * Items.length);
						const randomItem = Items[randomIndex];
						if (!selectAbleItems.includes(randomItem)) {
							selectAbleItems.push(randomItem);
						}
					}
					selectAbleItems = [...selectAbleItems];
					itemPickerDialog?.showModal();
				}
			} else {
				enemyAttack();
			}
		} else {
			log = [...log, `You missed the enemy with ${a.name}! You rolled a ${hitChance} and needed a ${data.ac} to hit.`];
			enemyAttack();
		}
	}
	function enemyAttack() {
		const attack = data.attacks[Math.floor(Math.random() * data.attacks.length)];
		if (attack.type == 'regen') {
			const healing = Math.floor(Math.random() * 20 + attack.damage);
			currentEnemyHealth += healing;
			log = [...log, `The enemy healed for ${healing} health with ${attack.name}!`];
			return;
		}
		const hitChance = Math.floor(Math.random() * 20 + attack.hitChanceModifier);
		if (hitChance > User.armorClass + reducedItemAc) {
			const damage = Math.floor(Math.random() * 20 + attack.damage);
			User.health -= damage;
			log = [...log, `The enemy hit you for ${damage} damage with ${attack.name}!`];
			if (User.health <= 0) {
				log = [...log, `You died!`];
				User.health = 0;
				gameOverDialog?.showModal();
			}
		} else {
			log = [...log, `The enemy missed you with ${attack.name}! They rolled a ${hitChance} and needed a ${User.armorClass} to hit.`];
		}
	}

	function levelUpWeapon(e: Attack) {
		User.attacks = User.attacks.map((a) => {
			if (a.name == e.name) {
				a.damage += 4;
				a.hitChanceModifier++;
			}
			return a;
		});
		levelUpDialog?.close();
	}

	function addItem(e: Item) {
		User.items = [...User.items, e];
		selectAbleItems = [];
		itemPickerDialog?.close();
	}
</script>

<img src="/assets/img/lowerRuins.png" alt="" class="static inset-0 w-full h-full overflow-clip" />

<div class="absolute right-2 flex flex-col gap-2 top-2">
	{#each log.reverse().slice(0, Math.min(3, log.length)) as item}
		<div class="bg-white rounded-md p-2 text-black w-max mx-auto" transition:fly>
			{item}
		</div>
	{/each}
</div>

<div class="absolute z-10 text-white inset-0 w-full h-full flex flex-col r items-center">
	<div class="bg-black flex mt-2 flex-col items-center rounded-md border-orange-400 border-2">
		<h1 class="text-3xl mx-auto">Floor {data.floor} / 20</h1>
	</div>
	<div class="pt-2 flex gap-4">
		<div class="bg-black flex flex-col items-center rounded-md border-orange-400 border-2">
			<h1 class="text-3xl mx-auto">{data.name} - ac {data.ac}</h1>
			<img src={data.imageGen.data[0].url} alt="test " />
			<div class="relative w-96 h-8 rounded-full overflow-hidden bg-gray-300">
				<div class="absolute top-0 left-0 h-full bg-red-500" style="width: {(currentEnemyHealth / data.health) * 100}%" />
				<h3 class="absolute top-0 left-0 w-full h-full flex items-center justify-center">{currentEnemyHealth} Health</h3>
			</div>
		</div>
		<div class="bg-black flex flex-col justify-evenly p-2 gap-2 items-center rounded-md border-orange-400 border-2">
			{#each data.attacks as attack}
				<div class="bg-orange-500 w-full rounded-md p-1 flex flex-col">
					<span>
						{attack.name}
					</span>
					<span class="text-sm">
						{0 + attack.damage} - {20 + attack.damage}
						{attack.type}
					</span>
					<span class="text-sm">
						+ {attack.hitChanceModifier} to hit
					</span>
				</div>
			{/each}
		</div>
	</div>
	<div class="grow" />
	<div class="pb-4 flex gap-4">
		<div class="bg-black flex w-96 p-2 border-orange-500 border-2 rounded-md">
			<div class="flex flex-col items-center w-full gap-2">
				<span class="self-center text-2xl">{User.name} - ac {User.armorClass + reducedItemAc}</span>
				<div class="relative w-full h-8 rounded-full overflow-hidden bg-gray-300">
					<div class="absolute top-0 left-0 h-full bg-red-500" style="width: {(User.health / (100 + reducedItemHealth)) * 100}%" />
					<h3 class="absolute top-0 left-0 w-full h-full flex items-center justify-center">{User.health} Health</h3>
				</div>
				<div class="relative w-full h-8 rounded-full overflow-hidden bg-gray-300">
					<div class="absolute top-0 left-0 h-full bg-blue-500" style="width: {(User.xp / User.xpToNextLevel) * 100}%" />
					<h3 class="absolute top-0 left-0 w-full h-full flex items-center justify-center">{User.xp} XP</h3>
				</div>
				<button class="grid grid-cols-2 w-full gap-2">
					{#each User.attacks as attack}
						<button on:click={() => attackGuy(attack)} class=" bg-orange-500 w-full rounded-md p-1 flex flex-col">
							<span>
								{attack.name}
							</span>
							<span class="text-sm">
								{0 + attack.damage + reducedItemAttack} - {20 + attack.damage + reducedItemAttack}
								{attack.type}
							</span>
							<span class="text-sm">
								+ {attack.hitChanceModifier} to hit
							</span>
						</button>
					{/each}
				</button>
			</div>
		</div>
		<div class="bg-black flex p-2 border-orange-500 border-2 rounded-md">
			<div class="flex flex-col items-center gap-2">
				<span class="self-center text-2xl">Items</span>
				<div class="flex flex-wrap gap-2">
					{#each User.items as item}
						<button class=" bg-orange-500 text-smrounded-md p-1 flex flex-col">
							<span class="text-sm mx-auto">
								{item.name}
							</span>

							ac {item.acModifier}
							dmg {item.damageModifier}
							hp {item.healthModifier}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

{#if $navigating}
	<div class="absolute z-50 inset-0 w-full h-full flex justify-center items-center bg-black/60">
		<div class="text-white text-4xl">Loading..</div>
	</div>
{/if}
<dialog bind:this={gameOverDialog} class="bg-black rounded-md border-2 border-orange-500 p-2 text-white gap-2">
	<div class="flex flex-col gap-2">
		<h1 class="text-4xl mx-auto">You Died</h1>
		<p class="text-lg">You have died, but you can try again.</p>
		<a href="/" on:click={() => gameOverDialog?.close()} class="bg-white rounded-md p-2 text-black w-max mx-auto">Try Again</a>
	</div>
</dialog>

<dialog bind:this={killedEnemyDialog} class="bg-black rounded-md border-2 border-orange-500 p-2 text-white gap-2">
	<div class="flex flex-col gap-2">
		<h1 class="text-4xl mx-auto">You Killed the Enemy!</h1>
		<p class="text-lg">You have killed the enemy, proceed to the next floor?</p>
		<a href="/floor/{data.floor + 1}" on:click={() => killedEnemyDialog?.close()} class="bg-white rounded-md p-2 text-black w-max mx-auto">
			Yes
		</a>
	</div>
</dialog>

<dialog bind:this={levelUpDialog} class="bg-black rounded-md border-2 border-orange-500 p-2 text-white gap-2">
	<div class="flex flex-col gap-2">
		<h1 class="text-4xl mx-auto">You Leveled Up</h1>
		<p class="text-lg">Pick an item to level up</p>

		<div class="flex flex-col gap-2">
			{#each User.attacks as attack}
				<button on:click={() => levelUpWeapon(attack)} class=" bg-orange-500 w-full rounded-md p-1 flex flex-col">
					<span>
						{attack.name}
					</span>
					<span class="text-sm">
						{0 + attack.damage} - {20 + attack.damage}
						{attack.type}
					</span>
					<span class="text-sm">
						+ {attack.hitChanceModifier} to hit
					</span>
				</button>
			{/each}
		</div>
	</div>
</dialog>

<dialog bind:this={itemPickerDialog} class="bg-black rounded-md border-2 border-orange-500 p-2 text-white gap-2">
	<div class="flex flex-col gap-2">
		<h1 class="text-4xl mx-auto">You Found an Item Up</h1>
		<p class="text-lg">Pick an item</p>

		<div class="flex flex-col gap-2">
			{#each selectAbleItems as item}
				<button on:click={() => addItem(item)} class=" bg-orange-500 w-full rounded-md p-1 flex flex-col">
					<span>
						{item.name}
					</span>
					<span class="text-sm">
						{item.description}
					</span>
					ac Modifier {item.acModifier}
					dmg Modifier {item.damageModifier}
					hp Modifier {item.healthModifier}
				</button>
			{/each}
		</div>
	</div>
</dialog>
