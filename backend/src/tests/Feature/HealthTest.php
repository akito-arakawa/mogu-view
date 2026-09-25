<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_health_api(): void
    {
        $response = $this->getJson('/api/health');
        $response->assertOk();
        $response->assertJson([
            "status" => "ok"
        ]);
    }
}
