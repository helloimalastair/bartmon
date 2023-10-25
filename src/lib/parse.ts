import { trips, routes, stations, stops } from "$lib";
import type { transit_realtime, StationsShort, Directions, RouteValues } from "$lib";

type SubstituteType<T, A, B> = T extends A ? B : T extends {} ? { [K in keyof T]: SubstituteType<T[K], A, B> } : T;

export async function fetchAndParseData(station: StationsShort, direction: Directions) {
	const { entity } = await (await fetch("/data")).json() as SubstituteType<transit_realtime.FeedMessage, bigint, number>;
	let saved: { ttl: number, route: RouteValues, train: SubstituteType<transit_realtime.FeedEntity, bigint, number> }[] = [];
	for (const train of entity) {
		if (train.isDeleted || !(train.tripUpdate && train.tripUpdate.trip)) {
			continue;
		}
		const trip = (Number(train.tripUpdate.trip.tripId)) in trips;
		// Trip not found
		if (!trip) {
			continue;
		}
		const route = routes[trips[Number(train.tripUpdate.trip.tripId)][0]];
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
		const allStops = stops[trips[Number(e.train.tripUpdate.trip.tripId)][1]];
		const stationsLeft = allStops.slice(allStops.indexOf(station), allStops.length).map(s => stations[s]);
		return {
			id: e.train.tripUpdate.trip.tripId,
			ttl: e.ttl,
			...e.route,
			stops: stationsLeft
		};
	});
}