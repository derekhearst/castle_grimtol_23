<script lang="ts">
	import { User } from '$lib/user';
</script>

<img src="/assets/img/lowerRuins.png" alt="" class="static inset-0 w-full h-full overflow-clip" />

<div class="absolute w-full h-full flex justify-center items-center inset-0">
	<div class="bg-black border-orange-500 border-2 gap-3 flex flex-col text-white p-2">
		<h3 class="text-3xl mx-auto">Congrats {User.name}! You won!</h3>
		<p class="text-lg">
			You have reached the top of the tower and claimed the riches that lie within. <br /> You are now the richest person in the world and will
			live a long and happy life.
		</p>
		<a href="/" class="bg-white rounded-md p-2 text-black w-max mx-auto"> Play Again? </a>
	</div>
</div>
