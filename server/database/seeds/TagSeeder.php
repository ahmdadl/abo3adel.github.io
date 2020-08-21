<?php

use App\Post;
use App\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();
        $tags = (factory(Tag::class, 7)->create())
            ->pluck('id')
            ->all();

        Post::all()->each(function (Post $post) use ($tags) {
            foreach (range(0, random_int(1, 2)) as $i) {
                $post->tags()->attach(
                    Arr::random($tags)
                );
            }
        });

        DB::commit();
    }
}
