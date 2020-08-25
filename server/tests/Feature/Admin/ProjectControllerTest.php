<?php

namespace Tests\Feature\Admin;

use App\Http\Controllers\Admin\ProjectController;
use App\Project;
use App\Tag;
use DB;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Str;

class ProjectControllerTest extends TestCase
{
    protected string $url = 'projects/';
    protected string $tbName = 'projects';

    public function testUserCanLoadAllProjects()
    {
        $projects = factory(Project::class, 5)->create();

        $this->getJson('api/projects')
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

        Storage::assertExists(ProjectController::UploadPath . '/' . $img1->hashName());
        Storage::assertExists(ProjectController::UploadPath . '/' . $img2->hashName());
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

        Storage::assertExists(
            ProjectController::UploadPath . '/' . $img1->hashName()
        );

        Storage::assertMissing(
            $oldImg
        );

        $this->assertSame(
            $tags->first()->title,
            Project::find($proj->id)->tags->first()->title
        );
    }

    public function testUserCanDeleteProject()
    {
        $this->withoutExceptionHandling();
        factory(Project::class, 5)->create();

        $oldImage = UploadedFile::fake()->image('ws.jpg');
        $oldImg = $oldImage->store(ProjectController::UploadPath);

        $project = factory(Project::class)->create([
            'img' => ([
                Str::replaceFirst(
                    'public',
                    '',
                    $oldImg
                )
            ]),
        ]);
        $tags = factory(Tag::class, 3)->create();
        $project->tags()->sync($tags);

        $this->assertSame(6, Project::count('id'));

        $this->deleteJson($this->url . $project->id)
            ->assertNoContent();

        $this->assertSame(5, Project::count('id'));

        $this->assertDatabaseMissing($this->tbName, [
            'id' => $project->id,
            'title' => $project->title
        ]);

        $this->assertDatabaseMissing('taggables', [
            'taggable_type' => Project::class,
            'taggable_id' => $project->id,
            'tag_id' => $tags->first()->id
        ]);

        $this->assertSame(0, DB::table('taggables')->count('id'));

        $img = $project->img[0];
        Storage::assertMissing(
            ProjectController::UploadPath . '/' . $oldImage->hashName()
        );
    }
}
