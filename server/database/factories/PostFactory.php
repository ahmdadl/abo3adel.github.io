<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Category;
use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(App\Post::class, function (Faker $faker) {
    $title = $faker->sentence;
    return [
        'user_id' => factory(User::class),
        'category_id' => factory(Category::class),
        'title' => $title,
        'slug' => Str::slug($title),
        'body' => $faker->randomHtml(),
        'img' => $faker->url,
    ];
});
