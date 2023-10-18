import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { routes, stations, } from "$lib";
import type { Directions, StationsShort } from "$lib";

export const load: PageLoad = ({ params }) => {
	const [station, direction] = params.slug.split("-") as [StationsShort, Directions];
	if (station in stations && ["N", "S"].includes(direction)) {
		for (const route of Object.values(routes)) {
			if (route.code === station) {
				if (route.direction === direction) {
					throw error(404, "Not found");
				} else {
					break;
				}
			}
		}
		return { station, direction };
	}
	throw error(404, "Not found");
};