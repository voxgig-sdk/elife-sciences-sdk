

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0}],"id":{"field":"id","name":"id"},"name":"article","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"desc","kind":"query","name":"order","orig":"order","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":20,"kind":"query","name":"per_page","orig":"per_page","reqd":false,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"GET /articles","json":"{\"operationId\":\"listArticles\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"per-page\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Sort order of results\",\"in\":\"query\",\"name\":\"order\",\"required\":false,\"schema\":{\"default\":\"desc\",\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/vnd.elife.article-list+json\":{\"schema\":{\"properties\":{\"items\":{\"items\":{\"properties\":{\"doi\":{\"description\":\"Digital Object Identifier\",\"type\":\"string\"},\"elocationId\":{\"description\":\"Electronic location identifier\",\"type\":\"string\"},\"id\":{\"description\":\"Unique article identifier\",\"type\":\"string\"},\"published\":{\"description\":\"Publication date\",\"format\":\"date-time\",\"type\":\"string\"},\"status\":{\"description\":\"Publication status (POA: publish on accept, VOR: version of record)\",\"enum\":[\"poa\",\"vor\"],\"type\":\"string\"},\"title\":{\"description\":\"Article title\",\"type\":\"string\"},\"type\":{\"description\":\"Article type\",\"type\":\"string\"},\"volume\":{\"description\":\"Volume number\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Total number of articles\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of articles\"},\"400\":{\"content\":{\"application/problem+json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Detailed error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"title\":{\"description\":\"Error title\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"404\":{\"content\":{\"application/problem+json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Detailed error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"title\":{\"description\":\"Error title\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/articles","segments":[{"lit":"articles"}],"select":{"exist":["order","page","per_page"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /articles/{id}","json":"{\"operationId\":\"getArticleById\",\"parameters\":[{\"description\":\"Unique identifier of the article\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/vnd.elife.article-poa+json\":{\"schema\":{\"properties\":{\"abstract\":{\"description\":\"Article abstract\",\"type\":\"object\"},\"authors\":{\"items\":{\"properties\":{\"affiliations\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"properties\":{\"index\":{\"type\":\"string\"},\"preferred\":{\"type\":\"string\"}},\"type\":\"object\"},\"orcid\":{\"description\":\"ORCID identifier\",\"type\":\"string\"},\"type\":{\"description\":\"Author type\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"copyright\":{\"description\":\"Copyright information\",\"type\":\"object\"},\"doi\":{\"description\":\"Digital Object Identifier\",\"type\":\"string\"},\"elocationId\":{\"description\":\"Electronic location identifier\",\"type\":\"string\"},\"id\":{\"description\":\"Unique article identifier\",\"type\":\"string\"},\"pdf\":{\"description\":\"URL to PDF version\",\"format\":\"uri\",\"type\":\"string\"},\"published\":{\"description\":\"Publication date\",\"format\":\"date-time\",\"type\":\"string\"},\"status\":{\"description\":\"Publication status\",\"enum\":[\"poa\",\"vor\"],\"type\":\"string\"},\"statusDate\":{\"description\":\"Status change date\",\"format\":\"date-time\",\"type\":\"string\"},\"subjects\":{\"items\":{\"properties\":{\"id\":{\"description\":\"Unique subject identifier\",\"type\":\"string\"},\"impact-statement\":{\"description\":\"Subject description\",\"type\":\"string\"},\"name\":{\"description\":\"Subject name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"title\":{\"description\":\"Article title\",\"type\":\"string\"},\"type\":{\"description\":\"Article type\",\"type\":\"string\"},\"versionDate\":{\"description\":\"Version date\",\"format\":\"date-time\",\"type\":\"string\"},\"volume\":{\"description\":\"Volume number\",\"type\":\"integer\"}},\"type\":\"object\"}},\"application/vnd.elife.article-vor+json\":{\"schema\":{\"properties\":{\"abstract\":{\"description\":\"Article abstract\",\"type\":\"object\"},\"authors\":{\"items\":{\"properties\":{\"affiliations\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"properties\":{\"index\":{\"type\":\"string\"},\"preferred\":{\"type\":\"string\"}},\"type\":\"object\"},\"orcid\":{\"description\":\"ORCID identifier\",\"type\":\"string\"},\"type\":{\"description\":\"Author type\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"copyright\":{\"description\":\"Copyright information\",\"type\":\"object\"},\"doi\":{\"description\":\"Digital Object Identifier\",\"type\":\"string\"},\"elocationId\":{\"description\":\"Electronic location identifier\",\"type\":\"string\"},\"id\":{\"description\":\"Unique article identifier\",\"type\":\"string\"},\"pdf\":{\"description\":\"URL to PDF version\",\"format\":\"uri\",\"type\":\"string\"},\"published\":{\"description\":\"Publication date\",\"format\":\"date-time\",\"type\":\"string\"},\"status\":{\"description\":\"Publication status\",\"enum\":[\"poa\",\"vor\"],\"type\":\"string\"},\"statusDate\":{\"description\":\"Status change date\",\"format\":\"date-time\",\"type\":\"string\"},\"subjects\":{\"items\":{\"properties\":{\"id\":{\"description\":\"Unique subject identifier\",\"type\":\"string\"},\"impact-statement\":{\"description\":\"Subject description\",\"type\":\"string\"},\"name\":{\"description\":\"Subject name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"title\":{\"description\":\"Article title\",\"type\":\"string\"},\"type\":{\"description\":\"Article type\",\"type\":\"string\"},\"versionDate\":{\"description\":\"Version date\",\"format\":\"date-time\",\"type\":\"string\"},\"volume\":{\"description\":\"Volume number\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with article details\"},\"404\":{\"content\":{\"application/problem+json\":{\"schema\":{\"properties\":{\"detail\":{\"description\":\"Detailed error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"title\":{\"description\":\"Error title\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Article not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/articles/{id}","segments":[{"lit":"articles"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"article","name__orig":"article","Name":"Article","name_":"article","name-":"article","NAME":"ARTICLE","index$":1}, {"active":true,"entity":"article","key$":"BasicArticleFlow","kind":"basic","name":"BasicArticleFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"article_ref01","srcdatavar":"article_ref01_data","suffix":"_dt0"},"match":{"id":"article01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-article_ref01"}}],"index$":0}]}, 'Article')
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
  
