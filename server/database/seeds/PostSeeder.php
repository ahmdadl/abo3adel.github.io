<?php

use App\Category;
use App\Post;
use App\Tag;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();
        $cats = Category::all();
        $tags = Tag::all();
 
        $cats->each(function (Category $c) use ($tags) {
            $posts = factory(Post::class, random_int(10, 20))->create([
                'category_id' => $c->id
            ]);

            $posts->each(fn (Post $post) => $post->tags()->sync(
                Arr::random((array) $tags->pluck('id')->toArray(), 3)
            ));
        });

        DB::commit();
    }
}
