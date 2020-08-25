<?php

namespace Tests\Feature\Admin;

use App\Comment;
use Illuminate\Console\Command;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class DestroyCommentTest extends TestCase
{
    protected string $url = 'comments/';

    public function testAdminCanDeleteComment()
    {
        $this->withoutExceptionHandling();
        $c = factory(Comment::class)->create();

        $this->deleteJson($this->url . $c->id)
            ->assertNoContent();

        $this->assertDatabaseMissing('comments', [
            'id' => $c->id
        ]);
    }
}
