/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            gridTemplateRows: {
                container: "85vh 15vh",
            },
            gridTemplateColumns: {
                spotify_body: "15vw 85vw",
            },
            backgroundImage: {
                gradient: "linear-gradient(transparent, rgba(0, 0, 0, 1))",
            },
            colors: {
                spotify_bg: "rgba(32, 87, 100)",
            },
            boxShadow: {
                imageShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
            },
        },
    },
    plugins: [],
};
