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
                gray: colors.slate,
            },
            backgroundImage: {
                none: 'none',
                'gradient-to-t':
                    'linear-gradient(to top, var(--tw-gradient-stops))',
                'gradient-to-tr':
                    'linear-gradient(to top right, var(--tw-gradient-stops))',
                'gradient-to-r':
                    'linear-gradient(to right, var(--tw-gradient-stops))',
                'gradient-to-br':
                    'linear-gradient(to bottom right, var(--tw-gradient-stops))',
                'gradient-to-b':
                    'linear-gradient(to bottom, var(--tw-gradient-stops))',
                'gradient-to-bl':
                    'linear-gradient(to bottom left, var(--tw-gradient-stops))',
                'gradient-to-l':
                    'linear-gradient(to left, var(--tw-gradient-stops))',
                'gradient-to-tl':
                    'linear-gradient(to top left, var(--tw-gradient-stops))',
            },
        },
    },
};
