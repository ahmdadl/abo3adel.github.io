const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    purge: ['index.html', './resources/js/**/*.svelte'],
    darkMode: 'class',
    theme: {
        fontFamily: 'Cairo, Roboto',
        extend: {
            colors: {
                green: colors.emerald,
                yellow: colors.amber,
                purple: colors.violet,
                teal: colors.teal,
                orange: colors.orange,
            },
        },
    },
};
