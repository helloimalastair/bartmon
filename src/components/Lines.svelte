<script lang="ts">
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
	import type { Arrival } from "$lib";
	export let arrivals: Arrival[];
</script>

{#each arrivals as arrival (arrival.id)}
<div class="flex-none flex justify-between items-center h-40 border-t-4 z-0 first:border-t-0 first:border-b-4 first:z-20 border-dashed px-4 bg-white font-bold" in:fly={{ y: "10rem", duration: 1000 }} out:fly={{ y: "-10rem", duration: 1000 }} animate:flip>
	<div>
		<span class="text-8xl">{arrival.ttl}</span>
		<span class="ml-2 text-4xl">min</span>
	</div>
	<div class="flex w-3/4">
		<div class={`w-20 h-20 aspect-square bg-${arrival.color}-line`}></div>
		<div class="flex items-center bg-gray-200 px-4 w-full">
			<p class="text-6xl">{arrival.terminus}</p>
		</div>
	</div>
</div>
{/each}