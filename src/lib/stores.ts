import { writable } from "svelte/store";

enum RouteBarStates {
	HIDDEN = 0,
	SHOWN = 1
};
const RouteBarState = writable(RouteBarStates.HIDDEN);
export { RouteBarState, RouteBarStates };