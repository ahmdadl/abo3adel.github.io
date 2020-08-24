<?php

namespace Tests\Unit;

use App\Project;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    public function testItHasCasts()
    {
        $p = factory(Project::class)->create();

        $this->assertIsArray($p->img);
        $this->assertIsArray($p->tags);
    }
}
