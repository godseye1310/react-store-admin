/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
				palanquin: ["Palanquin", "sans-serif"],
				montserrat: ["Montserrat", "sans-serif"],
			},
			colors: {
				primary: "#ECEEFF",
				"coral-red": "#FF6452",
				"slate-gray": "#6D6D6D",
				"pale-blue": "#F5F6FF",
				"white-400": "rgba(255, 255, 255, 0.80)",
			},
			boxShadow: {
				cbs: "0 10px 40px rgba(0, 0, 0, 0.1)",
				cbs2: "6px 8px 20px 0px rgba(128,128,128,1)",
			},
			screens: {
				xs: "450px",
				sm: "620px",
				wide: "1440px",
			},
		},
	},
	plugins: [],
};
