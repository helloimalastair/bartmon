import type { Writable } from "svelte/store";
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
function promisifyStore<T>(store: Writable<T>, expectedState: T) {
	return new Promise<void>((resolve) => store.subscribe((state) => {
		if (state === expectedState) {
			resolve();
		}
	}));
}
export { sleep, promisifyStore };