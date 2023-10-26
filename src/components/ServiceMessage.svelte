<script lang="ts">
	/**
	 * When things go wrong, this is who you call
	*/
	import getQuip from "./quips";
	export let message: string;
	let Quip = getQuip();
</script>
<div class="flex justify-center items-center absolute w-full h-full">
	<div class="text-white w-4/5">
		<h1 class="text-5xl">{ message }</h1>
		<Quip />
	</div>
</div>