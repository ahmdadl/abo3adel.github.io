<?php

namespace Tests\Feature;

use Facades\Tests\Setup\PostBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SetLocaleMiddlewareTest extends TestCase
{
    public function testItWillSetLocaleByHeader()
    {
        $this->assertSame('en', app()->getLocale());

        $this->getJson('/api/post', [
            'X-Laravel-Locale' => 'ar'
        ])->assertOk();

        $this->assertSame('ar', app()->getLocale());
    }
}
