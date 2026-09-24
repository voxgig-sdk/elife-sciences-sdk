
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ElifeSciencesSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ElifeSciencesSDK.test()
    equal(testsdk instanceof ElifeSciencesSDK, true,
      'ElifeSciencesSDK.test() must return a client synchronously')
  })

})
