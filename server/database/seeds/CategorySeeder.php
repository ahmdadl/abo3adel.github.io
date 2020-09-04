<?php

use App\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $titles = ['Tutorial', 'News'];

        foreach ($titles as $title) {
            factory(Category::class)->create(compact('title'));
        }
    }
}
