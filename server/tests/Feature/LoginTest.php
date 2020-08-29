<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /** @var \App\User */
    protected $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    /** @test */
    public function authenticate()
    {
        $this->postJson('/api/auth/login', [
            'email' => $this->user->email,
            'password' => 'password',
        ])
            ->assertSuccessful()
            ->assertJsonStructure(['token', 'expires_in'])
            ->assertJson(['token_type' => 'bearer']);
    }

    /** @test */
    public function fetch_the_current_user()
    {
        $res = $this->postJson('/api/auth/login', [
            'email' => $this->user->email,
            'password' => 'password',
        ])
            ->assertSuccessful()
            ->assertJsonStructure(['token', 'expires_in'])
            ->assertJson(['token_type' => 'bearer'])
            ->json();
        
        $token = $res['token'];

        $res = $this->getJson('/api/auth/user', [
            'Authorization' => 'Bearer ' . $token
        ])
            ->assertSuccessful()
            ->assertJsonStructure(['id', 'name', 'email']);

        // dd($res);
    }

    /** @test */
    public function log_out()
    {
        $this->withoutExceptionHandling();
        $token = $this->postJson('/api/auth/login', [
            'email' => $this->user->email,
            'password' => 'password',
        ])->json()['token'];

        $this->postJson("/api/auth/logout?token=$token")
            ->assertSuccessful();

        // $this->getJson("/api/auth/user?token=$token")
            // ->assertStatus(401);
    }
}
