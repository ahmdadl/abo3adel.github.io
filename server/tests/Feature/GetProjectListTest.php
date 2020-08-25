<?php

namespace Tests\Feature;

use App\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetProjectListTest extends TestCase
{
    public function testAnyoneCanGetProjectList()
    {
        $projects = factory(Project::class, 5)->create();

        $this->getJson('api/projects')
            ->assertOk()
            ->assertJsonCount(5)
            ->assertJson($projects->toArray());
    }
}
