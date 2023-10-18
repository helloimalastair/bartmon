export const routes = {
	1: {
		code: "MLBR",
		terminus: "Millbrae",
		direction: "S",
		color: "yellow"
	},
	2: {
		code: "PITT",
		terminus: "Pittsburg/Bay Point",
		direction: "N",
		color: "yellow"
	},
	3: {
		code: "RICH",
		terminus: "Richmond",
		direction: "N",
		color: "orange"
	},
	4: {
		code: "BERRY",
		terminus: "Berryessa/N. San José",
		direction: "S",
		color: "orange"
	},
	5: {
		code: "DALY",
		terminus: "Daly City",
		direction: "S",
		color: "green"
	},
	6: {
		code: "BERRY",
		terminus: "Berryessa/N. San José",
		direction: "N",
		color: "green"
	},
	7: {
		code: "MLBR",
		terminus: "Millbrae",
		direction: "S",
		color: "red"
	},
	8: {
		code: "RICH",
		terminus: "Richmond",
		direction: "N",
		color: "red"
	},
	11: {
		code: "DALY",
		terminus: "Daly City",
		direction: "S",
		color: "blue"
	},
	12: {
		code: "DUBL",
		terminus: "Dublin/Pleasanton",
		direction: "N",
		color: "blue"
	}
} as const;

type ValueOf<T> = T[keyof T];

type RouteValues = ValueOf<typeof routes>;

type Termini = RouteValues["terminus"];
type Directions = RouteValues["direction"];
type Colors = RouteValues["color"];

interface Arrival {
	id: string;
	ttl: number;
	color: Colors;
	terminus: Termini;
	direction: Directions;
}

export type { Arrival, Termini, Directions, Colors, RouteValues };