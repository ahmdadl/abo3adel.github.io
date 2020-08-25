<?php

namespace Tests\Feature;

use App\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Facades\Tests\Setup\PostBuilder;

class PostControllerTest extends TestCase
{
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
