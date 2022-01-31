const colors = require('tailwindcss/colors');

module.exports = {
    content: ['index.html', './resources/js/**/*.svelte'],
    darkMode: 'class',
    theme: {
        // colors: {
        //     teal: colors.teal,
        //     green: colors.emerald,
        //     gray: colors.slate,
        //     blue: colors.blue,
        //     red: colors.rose,
        //     indigo: colors.indigo,
        //     black: colors.black,
        //     white: colors.white,
        //     yellow: colors.amber,
        //     orange: colors.orange,
        // },
        fontFamily: 'Cairo, Roboto',
        extend: {
            colors: {
                green: colors.emerald,
                yellow: colors.amber,
                purple: colors.violet,
            },
        },
    },
};
