<?php

namespace Tests\Feature\Admin;

use App\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProjectControllerTest extends TestCase
{
    public function testUserCanLoadAllProjects()
    {
        $this->signIn();

        $projects = factory(Project::class, 5)->create();

        $this->getJson('api/projects')
            ->assertOk()
            ->assertJsonCount(5)
            ->assertJson($projects->toArray());
    }
}
