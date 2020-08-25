<?php

namespace Tests\Feature\Admin;

use App\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class CategoryControllerTest extends TestCase
{
    protected string $url = 'categories/';
    protected string $tbName = 'categories';

    public function testUserCanotAddCategoryWithInvalidData()
    {
        $this->postJson($this->url)
            ->assertStatus(422);
    }

    public function testUserCanCreateCategory()
    {
        $c = factory(Category::class)->raw();

        $this->postJson($this->url, $c)
            ->assertCreated()
            ->assertJson($c);

        $this->assertDatabaseHas($this->tbName, [
            'title' => $c['title'],
            'id' => 1
        ]);
    }
}
