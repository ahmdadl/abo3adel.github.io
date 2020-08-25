<?php

namespace Tests\Feature\Admin;

use Tests\TestCase as TestsTestCase;

abstract class TestCase extends TestsTestCase
{
    protected string $api = '/api/root/';
    protected string $url = '';

    public function setUp(): void
    {
        parent::setUp();

        $this->signIn();

        $this->url = $this->api . $this->url;
    }
}
