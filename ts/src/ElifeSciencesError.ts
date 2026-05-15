
import { Context } from './Context'


class ElifeSciencesError extends Error {

  isElifeSciencesError = true

  sdk = 'ElifeSciences'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ElifeSciencesError
}

