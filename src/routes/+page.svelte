<script lang="ts">
	import { MetaTags } from "$components";
	import { stations, routes } from "$lib";
	import type { Directions, StationsShort } from "$lib";

	let selectedStation: StationsShort;
	let selectedDirection: Directions;
	let validDirections: Directions[];
	let route = "";
	$: route = `/display/${selectedStation}-${selectedDirection}`;
	$: {
		let useDefault = true;
		for(const route of Object.values(routes)) {
			if(route.code === selectedStation) {
				useDefault = false;
				if(route.direction === "N") {
					validDirections = ["S"];
					selectedDirection = "S";
					break;
				} else {
					validDirections = ["N"];
					selectedDirection = "N";
					break;
				}
			}
		}
		if(useDefault) {
			validDirections = ["N", "S"];
		}
	}
</script>

<MetaTags title="BartMon" path="/" />

<div class="flex items-center justify-center w-screen h-screen bg-gray-900">
	<div class="w-2/5 h-3/5 bg-white rounded-3xl px-10 py-5">
		<h1 class="text-6xl text-center">BartMon</h1>
		<p class="text-center italic">Monitor departures in real time on BART platforms. Works best in Landscape mode. This project is not affiliated with BART, or any other transit provider.</p>
		<p class="text-center">Source Available <a href="https://github.com/helloimalastair/bartmon" target="_blank" class="underline text-blue-line">on Github</a> under the GNU GPL v3 License.</p>
		<div class="flex flex-col items-center mt-7 gap-5">
			<label for="Station" class="text-4xl">Station</label>
			<select name="Station" class="text-2xl px-3 py-1 rounded-md" bind:value={selectedStation}>
				{#each Object.entries(stations) as station}
					<option value="{station[0]}">{station[1]}</option>
				{/each}
			</select>
			<label for="Direction" class="text-4xl">Direction</label>
			<select name="Direction" class="text-2xl px-3 py-1 rounded-md" bind:value={selectedDirection}>
				{#each validDirections as direction}
					<option value="{direction}">{direction === "N" ? "Northbound" : "Southbound"}</option>
				{/each}
			</select>
			<a href={route} class="bg-blue-line text-white text-5xl px-5 py-2 rounded-2xl mt-4">GO!</a>
		</div>
	</div>
</div>