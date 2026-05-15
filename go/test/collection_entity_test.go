package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/elife-sciences-sdk"
	"github.com/voxgig-sdk/elife-sciences-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestCollectionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Collection(nil)
		if ent == nil {
			t.Fatal("expected non-nil CollectionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := collectionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "collection." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set ELIFESCIENCES_TEST_COLLECTION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		collectionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.collection", setup.data)))
		var collectionRef01Data map[string]any
		if len(collectionRef01DataRaw) > 0 {
			collectionRef01Data = core.ToMapAny(collectionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = collectionRef01Data

		// LOAD
		collectionRef01Ent := client.Collection(nil)
		collectionRef01MatchDt0 := map[string]any{}
		collectionRef01DataDt0Loaded, err := collectionRef01Ent.Load(collectionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if collectionRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func collectionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "collection", "CollectionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read collection test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse collection test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"collection01", "collection02", "collection03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("ELIFESCIENCES_TEST_COLLECTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ELIFESCIENCES_TEST_COLLECTION_ENTID": idmap,
		"ELIFESCIENCES_TEST_LIVE":      "FALSE",
		"ELIFESCIENCES_TEST_EXPLAIN":   "FALSE",
		"ELIFESCIENCES_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["ELIFESCIENCES_TEST_COLLECTION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ELIFESCIENCES_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["ELIFESCIENCES_APIKEY"],
			},
			extra,
		})
		client = sdk.NewElifeSciencesSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ELIFESCIENCES_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ELIFESCIENCES_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
