export const routes = {
	1: {
		terminus: "SFIA/Millbrae",
		direction: "S",
		color: "yellow"
	},
	2: {
		terminus: "Antioch",
		direction: "N",
		color: "yellow"
	},
	3: {
		terminus: "Richmond",
		direction: "N",
		color: "orange"
	},
	4: {
		terminus: "Berryessa/N. San José",
		direction: "S",
		color: "orange"
	},
	5: {
		terminus: "Daly City",
		direction: "S",
		color: "green"
	},
	6: {
		terminus: "Berryessa/N. San José",
		direction: "N",
		color: "green"
	},
	7: {
		terminus: "Daly City/Millbrae",
		direction: "S",
		color: "red"
	},
	8: {
		terminus: "Richmond",
		direction: "N",
		color: "red"
	},
	11: {
		terminus: "Daly City",
		direction: "S",
		color: "blue"
	},
	12: {
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