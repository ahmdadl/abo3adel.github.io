<?php

namespace Tests\Feature;

use App\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Facades\Tests\Setup\PostBuilder;

class PostControllerTest extends TestCase
{
    public function testGuestCanNotCreatePost()
    {
        $this->post('api/post', [])
            ->assertRedirect();
    }

    // public function testUserCanCreatePost()
    // {
    //     $this->signIn();

    //     $post = factory(Post::class)->raw();
    //     $this->postJson('api/post', $post)
    //         ->assertCreated();

    //     $this->assertDatabaseHas('posts', [
    //         'title' => $post['title'],
    //         'img' => $post['img'],
    //         'id' => 1
    //     ]);
    // }

    public function testGuestCanNotUpdatePost()
    {
        $post = factory(Post::class)->create();

        $this->patchJson('api/post/' . $post->slug)
            ->assertUnauthorized();
    }

    public function testUserCannotUpdateWithInvalidData()
    {
        $this->signIn();

        $post = factory(Post::class)->create();

        $this->patchJson('api/post/' . $post->slug)
            ->assertStatus(422);
    }

    public function testUserCanUpdatePost()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();

        $post = factory(Post::class)->create();
        $title = $this->faker->text(50);
        $img = $this->faker->text;

        $this->patchJson('api/post/' . $post->slug, [
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

    public function testGuestCannotDeletePost()
    {

        // $this->withoutExceptionHandling();
        $post = PostBuilder::amount(4)->create();

        $this->deleteJson('api/post/' . $post->slug)
            ->assertUnauthorized();
    }

    public function testUserCanDeletePost()
    {
        $this->withoutExceptionHandling();
        $this->signIn();

        $post = PostBuilder::amount(3)->create();

        $this->deleteJson('api/post/' . $post->slug)
            ->assertNoContent();

        $this->assertDatabaseMissing('posts', $post->only('id'));
    }

    public function testAnyOneGetAllPosts()
    {
        $this->withoutExceptionHandling();

        $post = PostBuilder::wCom(4)->tag(6)->amount(5)->create();

        $res = $this->getJson('api/post')
            ->assertOk()
            ->assertJsonPath('posts.total', 5);

        $firstPost = (object) $res['posts']['data'][4];

        $this->assertSame(
            4,
            (int) $firstPost->comments_count
        );

        $this->assertIsArray($firstPost->tags);
        $this->assertCount(6, $firstPost->tags);
    }

    public function testUserCanGetPostList()
    {
        $this->signIn();

        $this->testAnyOneGetAllPosts();
    }

    public function testAnyOneCanGetOnePost()
    {
        $post = PostBuilder::amount(4)->create();

        $this->getJson('api/post/' . $post->slug)
            ->assertOk()
            ->assertJson($post->toArray());
    }

    public function testAnyOneCanLoadPopularPosts()
    {
        $this->withoutExceptionHandling();
        $post = PostBuilder::wCom(4)->amount(10)->create();

        $res = $this->getJson('api/post/popular')
            ->assertOk()
            ->assertJsonCount(4, 'posts')
            ->json();

        $this->assertSame(
            4,
            (int) $res['posts'][0]['comments_count']
        );
    }

    public function testAnyoneCanSearchForPosts()
    {
        $this->withoutExceptionHandling();
        $post = PostBuilder::amount(5)->create([
            'title' => 'asd' . $this->faker->sentence,
        ]);

        $this->getJson('/api/post/find?q=' . 'asd')
            ->assertOk()
            ->assertJsonCount(5, 'posts.data');
    }
}
