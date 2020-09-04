<?php

use App\Project;
use App\Tag;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();
        $tags = Tag::all();
        $projects = factory(Project::class, 12)->create();
        $projects->each(fn (Project $p) => $p->tags()->sync(
            Arr::random((array) $tags->pluck('id')->toArray(), 3)
        ));
        DB::commit();

        // tags will be attached at TagSeeder class
    }
}
