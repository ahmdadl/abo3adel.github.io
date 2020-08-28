<?php

namespace Tests\Feature;

use App\Category;
use App\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryControllerTest extends TestCase
{
    public function testAnyoneCanLoadCategoriesList()
    {
        $cats = factory(Category::class, 4)->create();

        $res = $this->getJson('api/categories')
            ->assertOk()
            ->assertJsonCount(4)
            ->json();

        $this->assertSame(
            $cats->first()->title,
            $res[0]['title']
        );

        $this->assertSame(
            $cats->last()->posts->count(),
            (int) $res[0]['posts_count']
        );
    }

    public function testAnyoneCanSeePostsRelatedToCategory()
    {
        $this->withoutExceptionHandling();
        $c = factory(Category::class)->create();

        $c->posts()->createMany(
            factory(Post::class, 5)->raw()
        );

        $res = $this->getJson('api/categories/' . $c->slug . '/posts')
            ->assertOk()
            ->assertJsonCount(5, 'posts.data')
            ->json();

        $this->assertIsNumeric($res['posts']['data'][0]['comments_count']);
    }
}
