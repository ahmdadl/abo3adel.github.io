<?php

use App\Category;
use App\Post;
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

        $cats->each(fn (Category $c) => $c->posts()->saveMany(
            factory(Post::class, random_int(5, 10))->make([
                'category_id' => $c->id
            ])
        ));

        DB::commit();

        // tags will be attached at TagSeeder class
    }
}
