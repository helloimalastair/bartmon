<script lang="ts">
	import type { Colors, Stations } from "$lib";
	export let name: Stations;
	export let color: Colors;
	export let textElem: HTMLParagraphElement | undefined = undefined;
</script>
<div class={`w-8 h-8 min-w-8 max-h-8 mx-8 inline-block relative before:content-[''] before:absolute before:top-2 before:-left-20 before:w-28 before:h-1 before:bg-${color}-line first:before:hidden`}>
	<div class="flex gap-2 items-center origin-[10px_10px] -rotate-45 w-48">
		<div class={`rounded-full aspect-square bg-${color}-line w-8 h-8 min-h-8 min-w-8`}>
		</div>
		<div class="flex items-center max-h-8">
			<p class="translate-x-1/2 translate-y-[-5] leading-none" bind:this={textElem}>
				{name}
			</p>
		</div>
	</div>
</div>