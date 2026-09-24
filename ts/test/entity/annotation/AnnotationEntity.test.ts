

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


describe('AnnotationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELIFE_SCIENCES_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELIFE_SCIENCES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ElifeSciencesSDK.test()
    const ent = testsdk.Annotation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELIFE_SCIENCES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'annotation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"annotation","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /annotations","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"by","or":"by","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"desc","k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":20,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/annotations","q":{"exist":["by","order","page","per_page"]},"r":{},"s":[{"lit":"annotations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"annotation","name__orig":"annotation","Name":"Annotation","name_":"annotation","name-":"annotation","NAME":"ANNOTATION","index$":0}, {"active":true,"entity":"annotation","key$":"BasicAnnotationFlow","kind":"basic","name":"BasicAnnotationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"annotation_ref01","srcdatavar":"annotation_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-annotation_ref01"}}],"index$":0}]}, 'Annotation', {"GET /annotations":{"protocol":"http","operationId":"listAnnotations","responses":{"200":{"description":"Successful response with list of annotations","content":{"application/vnd.elife.annotation-list+json":{"schema":{"type":"object","properties":{"total":{"type":"integer"},"items":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"title":{"type":"string"},"content":{"type":"array","items":{"type":"object"}},"created":{"type":"string","format":"date-time"},"updated":{"type":"string","format":"date-time"}},"x-ref":"#/components/schemas/Annotation"}}},"x-ref":"#/components/schemas/AnnotationList"}}}}},"parameters":[{"name":"by","in":"query","description":"Filter by annotation author","required":false,"schema":{"type":"string"},"index$":0},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":1},{"name":"per-page","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"index$":2},{"name":"order","in":"query","description":"Sort order of results","required":false,"schema":{"type":"string","enum":["asc","desc"],"default":"desc"},"index$":3}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let annotation_ref01_data = Object.values(setup.data.existing.annotation)[0] as any

    // LOAD
    const annotation_ref01_ent = client.Annotation()
    const annotation_ref01_match_dt0: any = {}
    const annotation_ref01_data_dt0 = (await annotation_ref01_ent.load(annotation_ref01_match_dt0)).data()
    assert(null != annotation_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/annotation/AnnotationTestData.json')

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
    ['annotation01','annotation02','annotation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELIFE_SCIENCES_TEST_ANNOTATION_ENTID': idmap,
    'ELIFE_SCIENCES_TEST_LIVE': 'FALSE',
    'ELIFE_SCIENCES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELIFE_SCIENCES_TEST_ANNOTATION_ENTID']

  const live = 'TRUE' === env.ELIFE_SCIENCES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELIFE_SCIENCES_TEST_ANNOTATION_ENTID']
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
  
