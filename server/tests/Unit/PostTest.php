<?php

namespace Tests\Unit;

use App\Category;
use App\Post;
use App\Tag;
use App\User;
use Facades\Tests\Setup\PostBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Str;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testItHasSlug()
    {
        $title = $this->faker->sentence;
        $post = Post::create([
            'user_id' => (factory(User::class)->create())->id,
            'category_id' => (factory(Category::class)->create())->id,
            'title' => $title,
            'body' => $this->faker->randomHtml(),
            'img' => ''
        ]);

        $this->assertNotNull($post->slug);
        $this->assertSame(
            Str::slug($title),
            $post->slug
        );
    }

    public function testItHasUpdatedAttribute()
    {
        $post = PostBuilder::create();

        $this->assertIsString($post->updated);

        // assert it will present in json post
        $this->assertStringContainsString(
            'updated',
            $post->toJson()
        );
    }

    public function testItHasManyComments()
    {
        $post = PostBuilder::wCom(5)->create();

        $this->assertCount(5, $post->comments);
    }

    public function testItBelongsToCategory()
    {
        $post = PostBuilder::create();

        $this->assertNotNull($post->category);
        $this->assertGreaterThan(0, $post->category->id);
    }

    public function testItBelongsToManyTags()
    {
        $p = PostBuilder::create();
        $tag = factory(Tag::class)->create();

        $p->tags()->attach($tag);

        $this->assertCount(1, $p->tags);
        $this->assertSame(
            $tag->id,
            $p->tags->first()->id
        );
    }
}