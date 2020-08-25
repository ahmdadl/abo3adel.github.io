<?php

namespace Tests\Feature\Admin;

use App\Post;
use App\Project;
use App\Tag;
use Facades\Tests\Setup\PostBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TagControllerTest extends TestCase
{
    private string $url = 'api/root/tags';

    public function setUp(): void
    {
        parent::setUp();
        $this->signIn();
    }

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
}
