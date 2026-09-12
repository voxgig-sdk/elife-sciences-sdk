<?php
declare(strict_types=1);

// Collection entity test

require_once __DIR__ . '/../elifesciences_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CollectionEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ElifeSciencesSDK::test(null, null);
        $ent = $testsdk->Collection(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = collection_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "collection." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ELIFE_SCIENCES_TEST_COLLECTION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $collection_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.collection")));
        $collection_ref01_data = null;
        if (count($collection_ref01_data_raw) > 0) {
            $collection_ref01_data = Helpers::to_map($collection_ref01_data_raw[0][1]);
        }

        // LOAD
        $collection_ref01_ent = $client->Collection(null);
        $collection_ref01_match_dt0 = [
            "id" => $collection_ref01_data["id"],
        ];
        $collection_ref01_data_dt0_loaded = $collection_ref01_ent->load($collection_ref01_match_dt0, null);
        $collection_ref01_data_dt0_load_result = Helpers::to_map(is_object($collection_ref01_data_dt0_loaded) && method_exists($collection_ref01_data_dt0_loaded, 'data_get') ? $collection_ref01_data_dt0_loaded->data_get() : $collection_ref01_data_dt0_loaded);
        $this->assertNotNull($collection_ref01_data_dt0_load_result);
        $this->assertEquals($collection_ref01_data_dt0_load_result["id"], $collection_ref01_data["id"]);

    }
}

function collection_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/collection/CollectionTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ElifeSciencesSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["collection01", "collection02", "collection03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ELIFE_SCIENCES_TEST_COLLECTION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ELIFE_SCIENCES_TEST_COLLECTION_ENTID" => $idmap,
        "ELIFE_SCIENCES_TEST_LIVE" => "FALSE",
        "ELIFE_SCIENCES_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ELIFE_SCIENCES_TEST_COLLECTION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ELIFE_SCIENCES_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        $client = new ElifeSciencesSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["ELIFE_SCIENCES_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ELIFE_SCIENCES_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
