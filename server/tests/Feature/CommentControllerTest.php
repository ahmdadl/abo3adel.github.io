<?php

namespace Tests\Feature;

use App\Comment;
use App\Post;
use Facades\Tests\Setup\PostBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentControllerTest extends TestCase
{
    public function testAnyoneCanAddComment()
    {
        $post = PostBuilder::wCom(1)->create();
        $comment = factory(Comment::class)->raw();

        unset($comment['post_id']);

        $this->postJson('/api/post/' . $post->slug . '/comments', $comment)
            ->assertStatus(201)
            ->assertJson($comment);

        $this->assertDatabaseHas('comments', [
            'user_name' => $comment['user_name'],
            'user_mail' => $comment['user_mail'],
            'post_id' => (string) $post->id
        ]);

        $this->assertCount(2, Post::find($post->id)->comments);
    }

    public function testCannotCommentWithInvalidData()
    {
        $post = PostBuilder::wCom(1)->create();

        $this->postJson(
            '/api/post/' . $post->slug . '/comments',
            []
        )->assertStatus(422);
    }

    public function testAnyoneCanLoadAllComments()
    {
        $post = PostBuilder::wCom(5)->create();

        $this->getJson('/api/post/' . $post->slug . '/comments')
            ->assertOk()
            ->assertJsonCount(5)
            ->assertJson($post->comments->toArray());
    }
}
