<script lang="ts">
  import { RouteBar, Lines, ServiceMessage, MetaTags } from "$components";
	import { stations as allStations, fetchAndParseData, sleep } from "$lib";
	import type { Stations } from "$lib";
	import { onMount } from "svelte";
	import type { PageData } from './$types';
	
	export let data: PageData;

	const stationName = allStations[data.station];
	let viewPort: HTMLDivElement; // Needed to calculate scroll
	let arrivals: Awaited<ReturnType<typeof fetchAndParseData>> | undefined = undefined;
	let stations: Stations[] | undefined = undefined;
	let serviceMessage = "Please stand by...";
	let routeBarExtended = false;
	/* Route Bar Functions */
	let showRouteBar: (() => Promise<void>) | undefined = undefined;
	let slideAnimation: (() => Promise<boolean>) | undefined = undefined;
	let reverseSlideAnimation: (() => Promise<void>) | undefined = undefined;
	let hideRouteBar: (() => Promise<void>) | undefined = undefined;
	onMount(async () => {
		while(true) {
			try {
				arrivals = await fetchAndParseData(data.station, data.direction);
			} catch(e) {
				console.error(e);
				serviceMessage = "Service outage, y'all! Please come back later!";
				await sleep(30000);
				continue;
			}
			if(arrivals.length === 0) {
				serviceMessage = "No Arrivals scheduled for this Station";
				await sleep(30000);
				continue;
			}
			serviceMessage = "";
			stations = arrivals[0].stops;
			console.log(stations);
			await sleep(10000);
			if(arrivals[0].stops.length > 0 && arrivals.length === 2 || (!routeBarExtended && arrivals.length === 1)) {
				await showRouteBar?.();
				routeBarExtended = true;
			}
			await sleep(10000);
			const slid = await slideAnimation?.();
			if(slid) {
				await sleep(10000);
			}
			if(arrivals.length === 1) {
				await reverseSlideAnimation?.();
			} else  if(arrivals[0].stops.length === 0 || arrivals.length === 2) {
				await hideRouteBar?.();
				routeBarExtended = false;
			}
		}
	});
</script>

<MetaTags title={`${stationName} ${data.direction === "N" ? "Northbound" : "Southbound"} | TransAria`} path={"/display/" + data.station + '-' + data.direction} />
<div class="w-screen flex items-center justify-center h-screen bg-gray-900 p-0">
	<div class="flex flex-col bg-gray-600 w-[70rem] h-80 overflow-hidden rounded-2xl relative items-stretch" bind:this={viewPort}>
		{#if arrivals && arrivals.length > 0}
		<Lines {arrivals} />
		{#if stations}
		<RouteBar stopsRemaining={stations} color={arrivals[0].color} {viewPort} bind:showRouteBar={showRouteBar} bind:slideAnimation={slideAnimation} bind:reverseSlideAnimation={reverseSlideAnimation} bind:hideRouteBar={hideRouteBar}/>
		{/if}
		{/if}
		{#if serviceMessage.length > 0}
		<ServiceMessage message={serviceMessage} />
		{/if}
	</div>
</div>