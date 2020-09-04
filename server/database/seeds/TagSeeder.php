<?php

use App\Post;
use App\Project;
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
        $titles = ['php', 'laravel', 'typeScript', 'vue.Js', 'Angular', 'ionic', 'react native', 'lumen', 'api', 'bootstrap', 'multi language', 'multi user access', 'bootstrap'];

        foreach ($titles as $title) {
            factory(Tag::class)->create(compact('title'));
        }

        DB::commit();
    }
}
