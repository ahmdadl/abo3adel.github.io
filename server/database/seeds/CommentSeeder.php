<?php

use App\Comment;
use App\Post;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();
        $posts = Post::all();

        $posts->each(fn (Post $p) => $p->comments()
            ->saveMany(
                factory(Comment::class, random_int(1, 5))->make([
                    'post_id' => $p->id
                ])
            ));

        DB::commit();
    }
}
