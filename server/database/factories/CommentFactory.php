<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use Faker\Generator as Faker;

$factory->define(App\Comment::class, function (Faker $faker) {
    return [
        'post_id' => factory(App\Post::class),
        'user_name' => $faker->userName,
        'user_mail' => $faker->safeEmail,
        'body' => $faker->text,
    ];
});
