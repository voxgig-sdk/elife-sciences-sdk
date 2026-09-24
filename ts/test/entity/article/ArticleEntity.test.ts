

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


describe('ArticleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELIFE_SCIENCES_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELIFE_SCIENCES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ElifeSciencesSDK.test()
    const ent = testsdk.Article()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELIFE_SCIENCES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'article.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"article","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /articles","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"desc","k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":20,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/articles","q":{"exist":["order","page","per_page"]},"r":{},"s":[{"lit":"articles"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /articles/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/articles/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"articles"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"article","name__orig":"article","Name":"Article","name_":"article","name-":"article","NAME":"ARTICLE","index$":1}, {"active":true,"entity":"article","key$":"BasicArticleFlow","kind":"basic","name":"BasicArticleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"article_ref01","srcdatavar":"article_ref01_data","suffix":"_dt0"},"m":{"id":"article01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-article_ref01"}}],"index$":0}]}, 'Article', {"GET /articles":{"protocol":"http","operationId":"listArticles","responses":{"200":{"description":"Successful response with list of articles","content":{"application/vnd.elife.article-list+json":{"schema":{"type":"object","properties":{"total":{"type":"integer","description":"Total number of articles"},"items":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Unique article identifier"},"doi":{"type":"string","description":"Digital Object Identifier"},"title":{"type":"string","description":"Article title"},"published":{"type":"string","format":"date-time","description":"Publication date"},"type":{"type":"string","description":"Article type"},"status":{"type":"string","enum":["poa","vor"],"description":"Publication status (POA: publish on accept, VOR: version of record)"},"volume":{"type":"integer","description":"Volume number"},"elocationId":{"type":"string","description":"Electronic location identifier"}},"x-ref":"#/components/schemas/ArticleSummary"}}},"x-ref":"#/components/schemas/ArticleList"}}}},"400":{"description":"Bad request","content":{"application/problem+json":{"schema":{"type":"object","properties":{"title":{"type":"string","description":"Error title"},"detail":{"type":"string","description":"Detailed error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Not found","content":{"application/problem+json":{"schema":{"type":"object","properties":{"title":{"type":"string","description":"Error title"},"detail":{"type":"string","description":"Detailed error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":0},{"name":"per-page","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"index$":1},{"name":"order","in":"query","description":"Sort order of results","required":false,"schema":{"type":"string","enum":["asc","desc"],"default":"desc"},"index$":2}],"securitySource":"unspecified"},"GET /articles/{id}":{"protocol":"http","operationId":"getArticleById","responses":{"200":{"description":"Successful response with article details","content":{"application/vnd.elife.article-poa+json":{"schema":{"type":"object","properties":{"id":{"type":"string","description":"Unique article identifier"},"doi":{"type":"string","description":"Digital Object Identifier"},"title":{"type":"string","description":"Article title"},"abstract":{"type":"object","description":"Article abstract"},"published":{"type":"string","format":"date-time","description":"Publication date"},"versionDate":{"type":"string","format":"date-time","description":"Version date"},"statusDate":{"type":"string","format":"date-time","description":"Status change date"},"volume":{"type":"integer","description":"Volume number"},"elocationId":{"type":"string","description":"Electronic location identifier"},"pdf":{"type":"string","format":"uri","description":"URL to PDF version"},"subjects":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Unique subject identifier"},"name":{"type":"string","description":"Subject name"},"impact-statement":{"type":"string","description":"Subject description"}},"x-ref":"#/components/schemas/Subject"}},"authors":{"type":"array","items":{"type":"object","properties":{"type":{"type":"string","description":"Author type"},"name":{"type":"object","properties":{"preferred":{"type":"string"},"index":{"type":"string"}}},"orcid":{"type":"string","description":"ORCID identifier"},"affiliations":{"type":"array","items":{"type":"object"}}},"x-ref":"#/components/schemas/Author"}},"copyright":{"type":"object","description":"Copyright information"},"type":{"type":"string","description":"Article type"},"status":{"type":"string","enum":["poa","vor"],"description":"Publication status"}},"x-ref":"#/components/schemas/Article"}},"application/vnd.elife.article-vor+json":{"schema":{"type":"object","properties":{"id":{"type":"string","description":"Unique article identifier"},"doi":{"type":"string","description":"Digital Object Identifier"},"title":{"type":"string","description":"Article title"},"abstract":{"type":"object","description":"Article abstract"},"published":{"type":"string","format":"date-time","description":"Publication date"},"versionDate":{"type":"string","format":"date-time","description":"Version date"},"statusDate":{"type":"string","format":"date-time","description":"Status change date"},"volume":{"type":"integer","description":"Volume number"},"elocationId":{"type":"string","description":"Electronic location identifier"},"pdf":{"type":"string","format":"uri","description":"URL to PDF version"},"subjects":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Unique subject identifier"},"name":{"type":"string","description":"Subject name"},"impact-statement":{"type":"string","description":"Subject description"}},"x-ref":"#/components/schemas/Subject"}},"authors":{"type":"array","items":{"type":"object","properties":{"type":{"type":"string","description":"Author type"},"name":{"type":"object","properties":{"preferred":{"type":"string"},"index":{"type":"string"}}},"orcid":{"type":"string","description":"ORCID identifier"},"affiliations":{"type":"array","items":{"type":"object"}}},"x-ref":"#/components/schemas/Author"}},"copyright":{"type":"object","description":"Copyright information"},"type":{"type":"string","description":"Article type"},"status":{"type":"string","enum":["poa","vor"],"description":"Publication status"}},"x-ref":"#/components/schemas/Article"}}}},"404":{"description":"Article not found","content":{"application/problem+json":{"schema":{"type":"object","properties":{"title":{"type":"string","description":"Error title"},"detail":{"type":"string","description":"Detailed error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"id","in":"path","description":"Unique identifier of the article","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let article_ref01_data = Object.values(setup.data.existing.article)[0] as any

    // LOAD
    const article_ref01_ent = client.Article()
    const article_ref01_match_dt0: any = {}
    article_ref01_match_dt0.id = article_ref01_data.id
    const article_ref01_data_dt0 = (await article_ref01_ent.load(article_ref01_match_dt0)).data()
    assert(article_ref01_data_dt0.id === article_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/article/ArticleTestData.json')

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
    ['article01','article02','article03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELIFE_SCIENCES_TEST_ARTICLE_ENTID': idmap,
    'ELIFE_SCIENCES_TEST_LIVE': 'FALSE',
    'ELIFE_SCIENCES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELIFE_SCIENCES_TEST_ARTICLE_ENTID']

  const live = 'TRUE' === env.ELIFE_SCIENCES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELIFE_SCIENCES_TEST_ARTICLE_ENTID']
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
  
