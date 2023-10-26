/**
 * Static data from BART GFTS. Source updated as needed
 * + Typing
 */
export const stations = {
	"12TH": "12th St. Oakland City Center",
	"16TH": "16th St. Mission",
	"19TH": "19th St. Oakland",
	"24TH": "24th St. Mission",
	ASHB: "Ashby",
	BALB: "Balboa Park",
	BAYF: "Bay Fair",
	BERY: "Berryessa/​San José",
	CAST: "Castro Valley",
	CIVC: "Civic Center/​UN Plaza",
	COLS: "Coliseum",
	COLM: "Colma",
	CONC: "Concord",
	DALY: "Daly City",
	DBRK: "Downtown Berkeley",
	DUBL: "Dublin/​Pleasanton",
	DELN: "El Cerrito del Norte",
	PLZA: "El Cerrito Plaza",
	EMBR: "Embarcadero",
	FRMT: "Fremont",
	FTVL: "Fruitvale",
	GLEN: "Glen Park",
	HAYW: "Hayward",
	LAFY: "Lafayette",
	LAKE: "Lake Merritt",
	MCAR: "MacArthur",
	MLBR: "Millbrae",
	MLPT: "Milpitas",
	MONT: "Montgomery St.",
	NBRK: "North Berkeley",
	NCON: "North Concord/​Martínez",
	OAKL: "Oakland International Airport",
	ORIN: "Orinda",
	PITT: "Pittsburg/​Bay Point",
	PHIL: "Pleasant Hill/​Contra Costa Centre",
	POWL: "Powell St.",
	RICH: "Richmond",
	ROCK: "Rockridge",
	SBRN: "San Bruno",
	SFIA: "San Francisco International Airport",
	SANL: "San Leandro",
	SHAY: "South Hayward",
	SSAN: "South San Francisco",
	UCTY: "Union City",
	WCRK: "Walnut Creek",
	WARM: "Warm Springs/​South Fremont",
	WDUB: "West Dublin/​Pleasanton",
	WOAK: "West Oakland"
} as const;

type ValueOf<T> = T[keyof T];
type Stations = ValueOf<typeof stations>;
type StationsShort = keyof typeof stations;
export type { Stations, StationsShort };