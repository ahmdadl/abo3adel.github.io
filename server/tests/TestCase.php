<?php

namespace Tests;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Foundation\Testing\WithFaker;

abstract class TestCase extends BaseTestCase
{
    use RefreshDatabase;
    use WithFaker;
    use CreatesApplication;

    public function signIn(?User $user = null, array $attr = []): User {
        $user = $user ?? factory(User::class)->create($attr);

        $this->actingAs($user);

        return $user;
    }
}
