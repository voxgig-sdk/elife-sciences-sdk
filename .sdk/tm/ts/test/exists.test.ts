
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ElifeSciencesSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ElifeSciencesSDK.test()
    equal(null !== testsdk, true)
  })

})
