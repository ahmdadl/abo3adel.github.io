<?php

namespace Tests\Unit;

use App\Category;
use App\Post;
use Str;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    public function testItHasManyPosts()
    {
        $c = factory(Category::class)->create();

        $c->posts()->saveMany(
            factory(Post::class, 4)->make()
        );

        $this->assertCount(4, $c->posts);
    }

    public function testItHasSlug()
    {
        $title = $this->faker->sentence;
        $c = factory(Category::class)->create(compact('title'));

        $this->assertSame(
            Str::slug($title),
            $c->slug
        );
    }
}
