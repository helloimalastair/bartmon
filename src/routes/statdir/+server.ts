import { stations, routes } from "$lib";
import type { RequestHandler } from "./$types";
import type { StationsShort, StatDir } from "$lib";


/**
 * Return a list of stations and their directions.
 * Statically calculated at build time
 */
export const GET: RequestHandler = async () => {
	const statDir = Object.entries(stations).reduce((acc, [short, long]) => {
		let useDefault = true;
		const intermediate: StatDir = { long, dir: [] };
		for (const route of Object.values(routes)) {
			if (route.code === short) {
				useDefault = false;
				if (route.direction === "N") {
					intermediate.dir = ["S"];
					break;
				} else {
					intermediate.dir = ["N"];
					break;
				}
			}
		}
		if (useDefault) {
			intermediate.dir = ["N", "S"];
		}
		const casted = short as StationsShort;
		acc[casted] = intermediate;
		return acc;
	}, {} as Record<StationsShort, StatDir>);
	return Response.json(statDir);
};