<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Project;
use App\Tag;
use Faker\Generator as Faker;

$factory->define(Project::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence,
        'link' => $faker->url,
        'client' => $faker->userName,
        'info' => $faker->text,
        'img' => (Arr::random(['1.png', '2.jpg', '3.jpg', '4.jpg', '5.png', '6.jpg'], 3)),
        'type' => Arr::random(['laravel', 'spa', 'mobile']),
    ];
});
