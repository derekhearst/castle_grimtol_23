<script lang="ts">
	import { navigating } from '$app/stores';
	import { User } from '$lib/user';
</script>

<img src="/assets/img/grimtolTownWideLowContrast.png" alt="" class="h-full w-full static inset-0" />

<main class="h-full w-full inset-0 max-h-screen overflow-clip absolute flex flex-col justify-center z-10 items-center">
	<img src="/assets/img/castleGrimtolLogo.png" alt="" class="w-96 mb-2" />
	<div class="z-10 bg-black border-r-orange-500 flex flex-col gap-2 text-white p-4 rounded-md">
		<h1 class="text-4xl mx-auto">Welcome to Grimtol</h1>
		<p class="text-lg">
			Welcome traveler, you've come from a long way away to reach this cursed place. <br />Will you reach the top of the tower and claim its
			riches? Or will you fall to the curse like so many others before you.
			<br />
			Reach floor 20 to win the game.
		</p>
		<label for="name">What is your name?</label>
		<input id="name" class="text-black" placeholder="Name" bind:value={User.name} />
		<a
			href={User.name.length > 1 ? '/floor/1' : '#'}
			class=" {User.name.length > 1 ? 'bg-white ' : 'bg-gray-500 cursor-not-allowed'} rounded-md p-2 text-black w-max mx-auto">
			Enter the Tower
		</a>
	</div>
</main>

{#if $navigating}
	<div class="absolute z-50 inset-0 w-full h-full flex justify-center items-center bg-black/60">
		<div class="text-white text-4xl">Loading..</div>
	</div>
{/if}
