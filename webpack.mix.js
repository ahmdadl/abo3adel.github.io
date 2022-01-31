const mix = require('laravel-mix');

// require('mix-html-builder');
require('laravel-mix-svelte');
const sveltePreprocess = require("svelte-preprocess");

const postcssPlugins = [
    require('postcss-import'),
    require('precss'),
    require('autoprefixer'),
];

mix.setPublicPath('dist')
    .ts('resources/js/app.ts', 'dist/js')
    .postCss(
        'resources/css/app.css',
        'dist/css',
        postcssPlugins.concat([require('tailwindcss')('./tailwind.config.js')])
    )

    .svelte({
        dev: true,
        css: false,
        preprocess: sveltePreprocess({}),
    })
    .version()
    // .browserSync({
    //     proxy: 'svelte-server.test',
    //     port: 3030,
    //     ui: false,
    //     files: ['dist/css/*.css', 'dist/js/*.js', 'index.html'],
    // })
