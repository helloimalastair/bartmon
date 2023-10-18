<script lang="ts">
	import { stations } from "$lib";
	import type { Stations } from "$lib";
	import { MetaTags } from "$components";

	let selectedStation: Stations;
	let selectedDirection: "N" | "S";
	let route = "";
	$: route = `/display/${selectedStation}-${selectedDirection}`;
</script>

<MetaTags title="BartMon" path="/" />

<div class="flex items-center justify-center w-screen h-screen bg-gray-900">
	<div class="w-2/5 h-3/5 bg-white rounded-3xl px-10 py-5">
		<h1 class="text-6xl text-center">BartMon</h1>
		<p class="text-center italic">Monitor departures in real time on BART platforms. Works best in Landscape mode. Inspired by <span class="not-italic">some other train system.</span> Take a wild guess which one... This project is not affiliated with BART, or any other transit provider.</p>
		<div class="flex flex-col items-center mt-7 gap-5">
			<label for="Direction" class="text-4xl">Direction</label>
			<select name="Direction" class="text-2xl px-3 py-1 rounded-md" bind:value={selectedDirection}>
				<option value="N">Northbound</option>
				<option value="S">Southbound</option>
			</select>
			<label for="Station" class="text-4xl">Station</label>
			<select name="Station" class="text-2xl px-3 py-1 rounded-md" bind:value={selectedStation}>
				{#each Object.entries(stations) as station}
					<option value="{station[0]}">{station[1]}</option>
				{/each}
			</select>
			<a href={route} class="bg-blue-line text-white text-5xl px-5 py-2 rounded-2xl mt-4">GO!</a>
		</div>
	</div>
</div>