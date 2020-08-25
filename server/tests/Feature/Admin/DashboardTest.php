<?php

namespace Tests\Feature\Admin;

use App\Post;
use Facades\Tests\Setup\PostBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    public function testUserCanGetDashboardResult()
    {
        $this->signIn();

        $posts = PostBuilder::wCom(4)->tag(3)->amount(6)->create();

        $this->getJson('api/root/dashboard')
            ->assertOk()
            ->assertJsonPath('comments', 4)
            ->assertJsonPath('posts', 6)
            ->assertJsonPath('tags', 3);
    }
}
