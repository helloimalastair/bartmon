import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { stations, } from "$lib";
import type { Directions, StationsShort } from "$lib";

export const load: PageLoad = ({ params }) => {
	const [station, direction] = params.slug.split("-") as [StationsShort, Directions];
	if (station in stations && ["N", "S"].includes(direction)) {
		return { station, direction };
	}
	throw error(404, "Not found");
};