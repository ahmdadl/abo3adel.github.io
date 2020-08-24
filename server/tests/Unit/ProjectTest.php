<?php

namespace Tests\Unit;

use App\Project;
use App\Tag;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    public function testItHasCasts()
    {
        $p = factory(Project::class)->create();

        $this->assertIsArray($p->img);
    }

    public function testItHasTags()
    {
        $p = factory(Project::class)->create();
        $tag = factory(Tag::class)->create();

        $p->tags()->attach($tag);

        $this->assertCount(1, $p->tags);
        $this->assertSame(
            $tag->id,
            $p->tags->first()->id
        );
    }
}
