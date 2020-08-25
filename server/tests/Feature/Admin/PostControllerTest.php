<?php

namespace Tests\Feature\Admin;

use App\Http\Controllers\Admin\PostController;
use App\Post;
use App\Tag;
use Facades\Tests\Setup\PostBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PostControllerTest extends TestCase
{
    protected string $url = 'posts/';

    public function testUserCanCreatePost()
    {
        $this->withoutExceptionHandling();
        Storage::fake('local');

        $img = UploadedFile::fake()->image('a.jpeg');
        $post = PostBuilder::raw([
            'img' => $img
        ]);
        $tags = factory(Tag::class, 3)->create()->pluck('slug');

        $this->postJson($this->url, $post + compact('tags'))
            ->assertJsonMissingValidationErrors()
            ->assertCreated()
            ->assertJsonPath('title', $post['title'])
            ->assertJsonPath('tags.0.slug', $tags[0]);

        $this->assertDatabaseHas('posts', [
            'title' => $post['title'],
            'img' => '/posts/' . $img->hashName(),
        ]);

        Storage::assertExists(PostController::UploadDIr . '/' . $img->hashName());
    }

    public function testUserCannotUpdateWithInvalidData()
    {

        $post = factory(Post::class)->create();

        $this->patchJson($this->url . $post->slug)
            ->assertStatus(422);
    }

    public function testUserCanUpdatePost()
    {
        $this->withoutExceptionHandling();

        $post = factory(Post::class)->create();
        $title = $this->faker->text(50);
        $img = $this->faker->text;

        $this->patchJson($this->url . $post->slug, [
            'title' => $title,
            'img' => $img,
            'body' => $post->body
        ])->assertNoContent();

        $this->assertDatabaseHas('posts', [
            'id' => 1,
            'title' => $title,
            'img' => $img
        ]);

        $this->assertDatabaseMissing('posts', [
            'title' => $post->title
        ]);
    }

    public function testUserCanDeletePost()
    {
        $this->withoutExceptionHandling();

        $post = PostBuilder::amount(3)->create();

        $this->deleteJson($this->url . $post->slug)
            ->assertNoContent();

        $this->assertDatabaseMissing('posts', $post->only('id'));
    }
}
