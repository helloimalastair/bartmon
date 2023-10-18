// Runs in Bun. Install papaparse, then have GTFS data unzipped in `gtfs` folder.
import { parse } from "papaparse";

const parsedRoutes = parse<{
	route_id: string,
	route_short_name: string,
	route_long_name: string,
	route_color: string
}>((await Bun.file("routes.txt").text()).trim(), { header: true }).data.reduce((acc, row) => {
	const [color, direction] = row.route_short_name.split("-");
	acc[row.route_id] = {
		terminus: row.route_long_name.split(" to ")[1],
		direction,
		color,
	};
	return acc;
}, {} as Record<string, {
	terminus: string,
	direction: string,
	color: string
}>);

// Bun.write("routes.json", JSON.stringify(parsedRoutes, null, '\t'));

const routes = Object.keys(parsedRoutes);

const tripToRoute = parse<{ trip_id: string, route_id: string }>((await Bun.file("trips.txt").text()).trim(), { header: true }).data.reduce((acc, row) => {
	if (routes.includes(row.route_id)) {
		acc[row.trip_id] = Number(row.route_id);
	}
	return acc;
}, {} as Record<string, number>);

const compareArrays = (a: string[], b: string[]) =>
	a.length === b.length &&
	a.every((element, index) => element === b[index]);

const uniqueRoutes: string[][] = [];

const stopsOnRoute = Object.entries(parse<{ trip_id: string, stop_id: string, stop_sequence: string }>((await Bun.file("stop_times.txt").text()).trim(), { header: true }).data.reduce((acc, row) => {
	if (["ANTC", "PCTR"].includes(row.stop_id) || !(row.trip_id in tripToRoute)) {
		return acc;
	}
	if (!(row.trip_id in acc)) {
		acc[row.trip_id] = {};
	}
	acc[row.trip_id][Number(row.stop_sequence)] = row.stop_id;
	return acc;
}, {} as Record<string, Record<number, string>>)).map(([trip, stops]) => [trip, Object.entries(stops).sort(([a], [b]) => Number(a) - Number(b)).map(([_, stop]) => stop)]).reduce((acc, [trip, stops]) => {
	for (let i = 0; i < uniqueRoutes.length; i++) {
		if (compareArrays(uniqueRoutes[i], stops as string[])) {
			acc[trip as string] = i;
			return acc;
		}
	}
	uniqueRoutes.push(stops as string[]);
	acc[trip as string] = uniqueRoutes.length - 1;
	return acc;
}, {} as Record<string, number>);

const trips = Object.fromEntries(Object.entries(tripToRoute).map(([trip, route]) => [trip, [route, stopsOnRoute[trip]]] as [string, [number, number]]));

Bun.write("trips.json", JSON.stringify({
	trips,
	stops: uniqueRoutes
}));