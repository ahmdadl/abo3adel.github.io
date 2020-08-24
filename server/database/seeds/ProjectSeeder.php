<?php

use App\Project;
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
        factory(Project::class, 12)->create();
        DB::commit();

        // tags will be attached at TagSeeder class
    }
}
