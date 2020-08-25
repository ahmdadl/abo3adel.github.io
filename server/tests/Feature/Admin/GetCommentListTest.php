<?php

namespace Tests\Feature\Admin;

use App\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class GetCommentListTest extends TestCase
{
    protected string $url = 'comments/';

    public function testUserCanLoadAllComments()
    {
        $c = factory(Comment::class, 7)->create();

        $res = $this->getJson($this->url)
            ->assertOk()
            ->assertJsonCount(7, 'data')
            ->json();

        $this->assertNotNull($res['data'][0]['post']['id']);
    } 
}
