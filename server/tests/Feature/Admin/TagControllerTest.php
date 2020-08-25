<?php

namespace Tests\Feature\Admin;

use App\Post;
use App\Project;
use App\Tag;
use Facades\Tests\Setup\PostBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class TagControllerTest extends TestCase
{
    protected string $url = 'tags';

    public function testUserCanGetTagsList()
    {
        $this->withoutExceptionHandling();
        $projects = factory(Project::class, 3)->create();
        $tags = factory(Tag::class, 5)->create();
        $projects->each(fn ($p) => $p->tags()->sync($tags));

        $res = $this->getJson($this->url)
            ->assertOk()
            ->assertJsonCount(5)
            ->assertJsonPath('0.projects_count', '3')
            ->assertJsonPath('0.posts_count', '0')
            ->json();
    }

    public function testUserCannotAddNewTagWithInvalidData()
    {
        $this->postJson($this->url)
            ->assertStatus(422);
    }

    public function testUserCanAddNewTag()
    {
        $tag = factory(Tag::class)->raw();

        $this->postJson($this->url, ['title' => $tag['title']])
            ->assertCreated()
            ->assertJson($tag);

        $this->assertDatabaseHas('tags', [
            'id' => 1,
            'title' => $tag['title'],
        ]);
    }
}
