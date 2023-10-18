// @ts-nocheck
// Runs in Bun. Install papaparse, then have GTFS data unzipped in `gtfs` folder.
import { parse } from "papaparse";

const parsedRoutes = parse<{
	route_id: string,
	route_short_name: string,
	route_long_name: string,
	route_color: string
}>(await Bun.file("gtfs/routes.txt").text(), { header: true }).data.reduce((acc, row) => {
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

Bun.write("routes.json", JSON.stringify(parsedRoutes, null, '\t'));

const routes = Object.keys(parsedRoutes);

const tripToRoute = parse<{ trip_id: string, route_id: string }>(await Bun.file("gtfs/trips.txt").text(), { header: true }).data.reduce((acc, row) => {
	if (routes.includes(row.route_id)) {
		acc[Number(row.trip_id)] = Number(row.route_id);
	}
	return acc;
}, {} as Record<number, number>);


Bun.write("trips.json", JSON.stringify(tripToRoute));