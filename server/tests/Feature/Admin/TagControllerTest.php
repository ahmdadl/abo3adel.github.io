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
    protected string $url = 'tags/';

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

    public function testUserCanUpdateTag()
    {
        $tag = factory(Tag::class)->create();

        $title = $this->faker->sentence;

        $this->patchJson($this->url . $tag->id, compact('title'))
            ->assertOk()
            ->assertJsonPath('title', $title);

        $this->assertDatabaseHas('tags', [
            'id' => $tag->id,
            'title' => $title
        ]);
    }

    public function testUserCannotUpdateTagWithInvalidData()
    {
        $tag = factory(Tag::class)->create();

        $this->patchJson($this->url . $tag->id, [])
            ->assertStatus(422);
    }

    public function testUserCanDeleteTag()
    {
        $tag = factory(Tag::class)->create();

        $this->deleteJson($this->url . $tag->id)
            ->assertNoContent();

        $this->assertDatabaseMissing('tags', $tag->only('id'));

        $this->assertDatabaseMissing('taggables', [
            'tag_id' => $tag->id
        ]);
    }
}
