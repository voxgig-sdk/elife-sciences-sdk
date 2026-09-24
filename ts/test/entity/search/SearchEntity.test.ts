

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ElifeSciencesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELIFE_SCIENCES_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELIFE_SCIENCES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ElifeSciencesSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELIFE_SCIENCES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"search","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"for","or":"for","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"desc","k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":10,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":"relevance","k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"subject","or":"subject","r":false,"t":"`$ARRAY`","index$":5},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ARRAY`","index$":6}]},"k":"http","m":"GET","o":"/search","q":{"exist":["for","order","page","per_page","sort","subject","type"]},"r":{},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":4}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"search_ref01","srcdatavar":"search_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-search_ref01"}}],"index$":0}]}, 'Search', {"GET /search":{"protocol":"http","operationId":"searchContent","responses":{"200":{"description":"Successful search results","content":{"application/vnd.elife.search+json":{"schema":{"type":"object","properties":{"total":{"type":"integer","description":"Total number of search results"},"items":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"doi":{"type":"string"},"title":{"type":"string"},"type":{"type":"string"},"published":{"type":"string","format":"date-time"}},"x-ref":"#/components/schemas/SearchResult"}},"subjects":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"name":{"type":"string"},"results":{"type":"integer"}},"x-ref":"#/components/schemas/SubjectFacet"}},"types":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"name":{"type":"string"},"results":{"type":"integer"}},"x-ref":"#/components/schemas/TypeFacet"}}},"x-ref":"#/components/schemas/SearchResults"}}}},"400":{"description":"Bad request","content":{"application/problem+json":{"schema":{"type":"object","properties":{"title":{"type":"string","description":"Error title"},"detail":{"type":"string","description":"Detailed error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"for","in":"query","description":"Search query string","required":true,"schema":{"type":"string"},"index$":0},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":1},{"name":"per-page","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":10},"index$":2},{"name":"sort","in":"query","description":"Sort order of search results","required":false,"schema":{"type":"string","enum":["relevance","date"],"default":"relevance"},"index$":3},{"name":"order","in":"query","description":"Sort direction","required":false,"schema":{"type":"string","enum":["asc","desc"],"default":"desc"},"index$":4},{"name":"type","in":"query","description":"Filter by content type","required":false,"schema":{"type":"array","items":{"type":"string","enum":["research-article","review-article","editorial","insight","research-advance","short-report","tools-resources","correction","retraction"]}},"index$":5},{"name":"subject","in":"query","description":"Filter by subject area","required":false,"schema":{"type":"array","items":{"type":"string"}},"index$":6}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let search_ref01_data = Object.values(setup.data.existing.search)[0] as any

    // LOAD
    const search_ref01_ent = client.Search()
    const search_ref01_match_dt0: any = {}
    const search_ref01_data_dt0 = (await search_ref01_ent.load(search_ref01_match_dt0)).data()
    assert(null != search_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/search/SearchTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ElifeSciencesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELIFE_SCIENCES_TEST_SEARCH_ENTID': idmap,
    'ELIFE_SCIENCES_TEST_LIVE': 'FALSE',
    'ELIFE_SCIENCES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELIFE_SCIENCES_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.ELIFE_SCIENCES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELIFE_SCIENCES_TEST_SEARCH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ElifeSciencesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
