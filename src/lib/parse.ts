import { trips, routes, stations } from "$lib";
import type { transit_realtime, StationsShort, Stations, Directions, RouteValues } from "$lib";

type SubstituteType<T, A, B> = T extends A ? B : T extends {} ? { [K in keyof T]: SubstituteType<T[K], A, B> } : T;

export async function fetchAndParseData(station: StationsShort, direction: Directions) {
	const { entity } = await (await fetch("/data")).json() as SubstituteType<transit_realtime.FeedMessage, bigint, number>;
	let saved: { ttl: number, route: RouteValues, train: SubstituteType<transit_realtime.FeedEntity, bigint, number> }[] = [];
	for (const train of entity) {
		if (train.isDeleted || !(train.tripUpdate && train.tripUpdate.trip)) {
			continue;
		}
		const route = routes[trips[train.tripUpdate.trip.tripId]];
		for (const stop of train.tripUpdate.stopTimeUpdate) {
			if (stop.stopId === station && route.direction === direction && stop.departure) {
				const ttl = Math.round((stop.departure.time - Date.now() / 1000) / 60);
				if (ttl > -1) {
					saved.push({ ttl: Math.round((stop.departure.time - Date.now() / 1000) / 60), route, train });
				}
			}
		}
	}
	return saved.sort((a, b) => a.ttl - b.ttl).slice(0, 2).map(e => {
		if (!e.train.tripUpdate || !e.train.tripUpdate.trip) {
			throw new Error("Invalid trip update");
		}
		const stationsLeft: Stations[] = [];
		let foundStation = false;
		for (const stop of e.train.tripUpdate.stopTimeUpdate) {
			if (!foundStation) {
				if (stop.stopId === station) {
					foundStation = true;
				}
				continue;
			}
			stationsLeft.push(stations[stop.stopId as StationsShort]);
		}
		return {
			id: e.train.tripUpdate.trip.tripId,
			ttl: e.ttl,
			...e.route,
			stops: stationsLeft
		};
	});
}