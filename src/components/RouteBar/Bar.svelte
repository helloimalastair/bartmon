<script lang="ts">
	import Stop from "./Stop.svelte";
	import { sleep } from "$lib";
	import type { Stations, Colors } from "$lib";
	let animationStyle: HTMLStyleElement | undefined = undefined;

	export let stopsRemaining: Stations[];
	export let color: Colors;
	export let viewPort: HTMLDivElement;
	export const showRouteBar = () => {
		clear = false;
		visible = true;
		return sleep(1000);
	};
	export const slideAnimation = async () => {
		const offset = finalDestinationText.getBoundingClientRect().right - viewPort.getBoundingClientRect().right;
		if(offset > 0) {
			animationStyle = document.createElement("style");
			animationStyle.innerHTML = `@keyframes slideAnimation { 0% { transform: translateX(0); } 100% { transform: translateX(-${offset}px); } }`;
			document.head.appendChild(animationStyle);
			routeBarContent.style.animation = `slideAnimation 4s linear 1 forwards`;
			await sleep(4000);
			return true;
		}
		return false;
	};
	export const reverseSlideAnimation = () => {
		const offset = finalDestinationText.getBoundingClientRect().right - viewPort.getBoundingClientRect().right;
		if(offset > 0) {
			routeBarContent.style.animation = `slideAnimation 4s linear 1 forwards`;
			return sleep(4000);
		}
		return Promise.resolve();
	};
	export const hideRouteBar = async () => {
		visible = false;
		await sleep(1000);
		routeBarContent.style.animation = "";
		if(animationStyle) {
			animationStyle.remove();
			animationStyle = undefined;
		}
		clear = true;
	};

	let visible = false;
	let clear = true;
	let routeBarContent: HTMLDivElement;
	let finalDestinationText: HTMLParagraphElement;
</script>
<style>
  #route-bar {
    transform: translateY(0);
    transition: transform 1s ease-out;
  }
  #route-bar.visible {
    transform: translateY(100%);
  }
</style>
<div id="route-bar" class={"absolute w-full h-40 border-t-4 border-dashed px-4 z-10 bg-white"} class:visible={visible} class:opacity-0={clear}>
	<div class="flex absolute bottom-0 text-xl" bind:this={routeBarContent}>
		{#each stopsRemaining as stop, index}
			{#if index === stopsRemaining.length - 1}
			<Stop name={stop} {color} bind:textElem={finalDestinationText}/>
			{:else}
			<Stop name={stop} {color} />
			{/if}
		{/each}
	</div>
</div>