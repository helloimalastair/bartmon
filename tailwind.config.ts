import type { Config } from "tailwindcss";


const config: Config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				"yellow-line": "#FFDC00",
				"orange-line": "#FF9933",
				"green-line": "#339933",
				"red-line": "#FF0000",
				"blue-line": "#0099CC"
			},
			fontFamily: {
				sans: ["Office", "sans-serif"]
			}
		},
	},
	plugins: [],
};
config.safelist = [
	"opacity-0",
	"translate-y-full",
	{
		pattern: new RegExp(`bg-(${Object.keys(config.theme?.extend?.colors as Record<string, string>).join("|")})`),
		variants: ["before"]
	}
];

export default config;