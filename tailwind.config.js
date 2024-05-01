/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
          backgroundImage: {
            'custom': "url('https://cdn.pixabay.com/photo/2017/10/27/10/26/social-media-2893834_1280.jpg')",
          }
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
