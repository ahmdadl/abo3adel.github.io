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
            ->assertStatus(422)
            ->assertJsonValidationErrors('title');
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

    public function testUserCannotUpdateCategoryWithInvalidData()
    {
        $c = factory(Category::class)->create();

        $this->patchJson($this->url . $c->slug)
            ->assertStatus(422)
            ->assertJsonValidationErrors('title');
    }

    public function testUserCanAddCategory()
    {
        $c = factory(Category::class)->create();
        $title = $this->faker->sentence;

        $this->patchJson($this->url . $c->slug, compact('title'))
            ->assertOk()
            ->assertJsonPath('title', $title);

        $this->assertDatabaseHas($this->tbName, [
            'title' => $title,
            'id' => $c->id
        ]);
    }
}
