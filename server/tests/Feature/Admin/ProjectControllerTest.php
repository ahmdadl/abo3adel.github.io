<?php

namespace Tests\Feature\Admin;

use App\Http\Controllers\Admin\ProjectController;
use App\Project;
use App\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProjectControllerTest extends TestCase
{
    private string $url = '/api/root/projects/';
    private string $tbName = 'projects';

    public function setUp(): void
    {
        parent::setUp();

        $this->signIn();
    }

    public function testUserCanLoadAllProjects()
    {
        $projects = factory(Project::class, 5)->create();

        $this->getJson($this->url)
            ->assertOk()
            ->assertJsonCount(5)
            ->assertJson($projects->toArray());
    }

    public function testUserCanAddNewProject()
    {
        $this->withoutExceptionHandling();
        Storage::fake('local');

        $proj = factory(Project::class)->raw();
        $tags = factory(Tag::class, 3)->create();

        $img1 = UploadedFile::fake()->image('some.png');
        $img2 = UploadedFile::fake()->image('som256e.png');

        $proj['img'] = [$img1, $img2];

        $res = $this->postJson($this->url, $proj + ['tags' => $tags->pluck('slug')])
            ->assertOk()
            ->assertJsonPath('title', $proj['title'])
            ->assertJsonPath('client', $proj['client'])
            ->json();
        // dd($res);

        $this->assertDatabaseHas($this->tbName, [
            'title' => $proj['title'],
            'link' => $proj['link']
        ]);

        $this->assertDatabaseHas('taggables', [
            'taggable_type' => Project::class,
            'taggable_id' => 1,
            'tag_id' => $tags->first()->id
        ]);

        $this->assertArrayHasKey('tags', (array) $res);
        $this->assertCount(3, $res['tags']);

        Storage::disk('local')->assertExists(ProjectController::UploadPath . '/' . $img1->hashName());
        Storage::disk('local')->assertExists(ProjectController::UploadPath . '/' . $img2->hashName());
    }
}
