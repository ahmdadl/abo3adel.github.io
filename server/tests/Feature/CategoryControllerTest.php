<?php

namespace Tests\Feature;

use App\Category;
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
            ->assertJsonCount(4, 'cats')
            ->json();

        $this->assertSame(
            $cats->first()->title,
            $res['cats'][0]['title']
        );

        $this->assertSame(
            $cats->last()->posts->count(),
            (int) $res['cats'][0]['posts_count']
        );
    }
}
