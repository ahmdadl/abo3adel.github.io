<?php

namespace Tests\Feature\Admin;

use App\Http\Controllers\Admin\ProjectController;
use App\Project;
use App\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Str;
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
            ->assertCreated()
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

    public function testUserCanUpdateProject()
    {
        $this->withoutExceptionHandling();
        
        $oldImage = UploadedFile::fake()->image('ws.jpg');
        $oldImg = $oldImage->store(ProjectController::UploadPath);
        
        $proj = factory(Project::class)->create([
            'img' => ([
                Str::replaceFirst(
                    'public',
                    '',
                    $oldImg
                )
            ]),
        ]);
        Storage::fake('local');
        $tags = factory(Tag::class, 2)->create();
        $proj->tags()->sync($tags);


        $img1 = UploadedFile::fake()->image('a.png');
        $img2 = UploadedFile::fake()->image('w.jpeg');

        $title = $this->faker->sentence;

        $proj->load('tags');
        $arr = $proj->toArray();
        $arr['img'] = [$img1, $img2];
        $arr['title'] = $title;
        $arr['tags'] = $proj->tags->pluck('slug');

        $res = $this->patchJson($this->url . $proj->id, $arr)
            ->assertOk()
            ->assertJsonPath('title', $title)
            ->assertJsonCount(2, 'tags')
            ->json();

        $this->assertDatabaseHas($this->tbName, [
            'title' => $title,
            'link' => $proj->link
        ]);

        Storage::disk('local')->assertExists(
            ProjectController::UploadPath . '/' . $img1->hashName()
        );

        Storage::disk('local')->assertMissing(
            $oldImg
        );

        $this->assertSame(
            $tags->first()->title,
            Project::find($proj->id)->tags->first()->title
        );
    }
}
