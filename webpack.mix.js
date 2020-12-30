let mix = require('laravel-mix');

mix.setPublicPath('dist')
    .js('cdn/wire_replace.js', 'dist');
