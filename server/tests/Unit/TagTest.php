<?php

namespace Tests\Unit;

use App\Tag;
use Facades\Tests\Setup\PostBuilder;
use Tests\TestCase;

class TagTest extends TestCase
{
    public function testItBelongsToManyPosts()
    {
        $tag = factory(Tag::class)->create();
        $p = PostBuilder::create();

        $tag->posts()->attach($p);

        $this->assertCount(1, $tag->posts);
        $this->assertSame(
            $p->id,
            $tag->posts->first()->id
        );
    }
}
