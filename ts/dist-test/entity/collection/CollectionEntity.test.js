"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CollectionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ELIFE_SCIENCES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ELIFE_SCIENCES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ElifeSciencesSDK.test();
        const ent = testsdk.Collection();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ELIFE_SCIENCES_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'collection.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "collection", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /collections", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "desc", "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 20, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/collections", "q": { "exist": ["order", "page", "per_page"] }, "r": {}, "s": [{ "lit": "collections" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /collections/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/collections/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "collections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "collection", "name__orig": "collection", "Name": "Collection", "name_": "collection", "name-": "collection", "NAME": "COLLECTION", "index$": 2 }, { "active": true, "entity": "collection", "key$": "BasicCollectionFlow", "kind": "basic", "name": "BasicCollectionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "collection_ref01", "srcdatavar": "collection_ref01_data", "suffix": "_dt0" }, "m": { "id": "collection01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-collection_ref01" } }], "index$": 0 }] }, 'Collection', { "GET /collections": { "protocol": "http", "operationId": "listCollections", "responses": { "200": { "description": "Successful response with list of collections", "content": { "application/vnd.elife.collection-list+json": { "schema": { "type": "object", "properties": { "total": { "type": "integer" }, "items": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "string" }, "title": { "type": "string" }, "published": { "type": "string", "format": "date-time" }, "updated": { "type": "string", "format": "date-time" } }, "x-ref": "#/components/schemas/CollectionSummary" } } }, "x-ref": "#/components/schemas/CollectionList" } } } } }, "parameters": [{ "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 0 }, { "name": "per-page", "in": "query", "description": "Number of results per page", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "index$": 1 }, { "name": "order", "in": "query", "description": "Sort order of results", "required": false, "schema": { "type": "string", "enum": ["asc", "desc"], "default": "desc" }, "index$": 2 }], "securitySource": "unspecified" }, "GET /collections/{id}": { "protocol": "http", "operationId": "getCollectionById", "responses": { "200": { "description": "Successful response with collection details", "content": { "application/vnd.elife.collection+json": { "schema": { "type": "object", "properties": { "id": { "type": "string" }, "title": { "type": "string" }, "impactStatement": { "type": "string" }, "published": { "type": "string", "format": "date-time" }, "updated": { "type": "string", "format": "date-time" }, "content": { "type": "array", "items": { "type": "object" } }, "curators": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "string" }, "type": { "type": "object", "properties": { "id": { "type": "string" }, "label": { "type": "string" } } }, "name": { "type": "object", "properties": { "preferred": { "type": "string" }, "index": { "type": "string" } } }, "orcid": { "type": "string" }, "profile": { "type": "array", "items": { "type": "object" } }, "research": { "type": "object" } }, "x-ref": "#/components/schemas/Person" } } }, "x-ref": "#/components/schemas/Collection" } } } }, "404": { "description": "Collection not found", "content": { "application/problem+json": { "schema": { "type": "object", "properties": { "title": { "type": "string", "description": "Error title" }, "detail": { "type": "string", "description": "Detailed error message" }, "status": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "id", "in": "path", "description": "Unique identifier of the collection", "required": true, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let collection_ref01_data = Object.values(setup.data.existing.collection)[0];
        // LOAD
        const collection_ref01_ent = client.Collection();
        const collection_ref01_match_dt0 = {};
        collection_ref01_match_dt0.id = collection_ref01_data.id;
        const collection_ref01_data_dt0 = (await collection_ref01_ent.load(collection_ref01_match_dt0)).data();
        (0, node_assert_1.default)(collection_ref01_data_dt0.id === collection_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/collection/CollectionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ElifeSciencesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['collection01', 'collection02', 'collection03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ELIFE_SCIENCES_TEST_COLLECTION_ENTID': idmap,
        'ELIFE_SCIENCES_TEST_LIVE': 'FALSE',
        'ELIFE_SCIENCES_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ELIFE_SCIENCES_TEST_COLLECTION_ENTID'];
    const live = 'TRUE' === env.ELIFE_SCIENCES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ELIFE_SCIENCES_TEST_COLLECTION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ElifeSciencesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ELIFE_SCIENCES_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CollectionEntity.test.js.map