const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
				palanquin: ["Palanquin", "sans-serif"],
				montserrat: ["Montserrat", "sans-serif"],
			},
			colors: {
				"coral-red": "#FF6452",
				"slate-gray": "#6D6D6D",
			},

			screens: {
				xs: "450px",
				wide: "1440px",
			},
		},
	},
	plugins: [flowbite.plugin()],
};
