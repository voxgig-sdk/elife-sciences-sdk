<?php
declare(strict_types=1);

// ElifeSciences SDK exists test

require_once __DIR__ . '/../elifesciences_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ElifeSciencesSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
