

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


describe('PersonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ELIFE_SCIENCES_TEST_LIVE=TRUE.
  afterEach(liveDelay('ELIFE_SCIENCES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ElifeSciencesSDK.test()
    const ent = testsdk.Person()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ELIFE_SCIENCES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'person.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"person","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /people","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":20,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/people","q":{"exist":["page","per_page","type"]},"r":{},"s":[{"lit":"people"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /people/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/people/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"people"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"person","name__orig":"person","Name":"Person","name_":"person","name-":"person","NAME":"PERSON","index$":3}, {"active":true,"entity":"person","key$":"BasicPersonFlow","kind":"basic","name":"BasicPersonFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"person_ref01","srcdatavar":"person_ref01_data","suffix":"_dt0"},"m":{"id":"person01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-person_ref01"}}],"index$":0}]}, 'Person', {"GET /people":{"protocol":"http","operationId":"listPeople","responses":{"200":{"description":"Successful response with list of people","content":{"application/vnd.elife.person-list+json":{"schema":{"type":"object","properties":{"total":{"type":"integer"},"items":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"type":{"type":"object","properties":{"id":{"type":"string"},"label":{"type":"string"}}},"name":{"type":"object","properties":{"preferred":{"type":"string"},"index":{"type":"string"}}},"orcid":{"type":"string"},"profile":{"type":"array","items":{"type":"object"}},"research":{"type":"object"}},"x-ref":"#/components/schemas/Person"}}},"x-ref":"#/components/schemas/PersonList"}}}}},"parameters":[{"name":"type","in":"query","description":"Filter by person type","required":false,"schema":{"type":"string","enum":["senior-editor","reviewing-editor","director","leadership"]},"index$":0},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":1},{"name":"per-page","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"index$":2}],"securitySource":"unspecified"},"GET /people/{id}":{"protocol":"http","operationId":"getPersonById","responses":{"200":{"description":"Successful response with person details","content":{"application/vnd.elife.person+json":{"schema":{"type":"object","properties":{"id":{"type":"string"},"type":{"type":"object","properties":{"id":{"type":"string"},"label":{"type":"string"}}},"name":{"type":"object","properties":{"preferred":{"type":"string"},"index":{"type":"string"}}},"orcid":{"type":"string"},"profile":{"type":"array","items":{"type":"object"}},"research":{"type":"object"}},"x-ref":"#/components/schemas/Person"}}}},"404":{"description":"Person not found","content":{"application/problem+json":{"schema":{"type":"object","properties":{"title":{"type":"string","description":"Error title"},"detail":{"type":"string","description":"Detailed error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"id","in":"path","description":"Unique identifier of the person","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let person_ref01_data = Object.values(setup.data.existing.person)[0] as any

    // LOAD
    const person_ref01_ent = client.Person()
    const person_ref01_match_dt0: any = {}
    person_ref01_match_dt0.id = person_ref01_data.id
    const person_ref01_data_dt0 = (await person_ref01_ent.load(person_ref01_match_dt0)).data()
    assert(person_ref01_data_dt0.id === person_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/person/PersonTestData.json')

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
    ['person01','person02','person03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ELIFE_SCIENCES_TEST_PERSON_ENTID': idmap,
    'ELIFE_SCIENCES_TEST_LIVE': 'FALSE',
    'ELIFE_SCIENCES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ELIFE_SCIENCES_TEST_PERSON_ENTID']

  const live = 'TRUE' === env.ELIFE_SCIENCES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ELIFE_SCIENCES_TEST_PERSON_ENTID']
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
  
