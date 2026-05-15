# ElifeSciences SDK utility: make_context
require_relative '../core/context'
module ElifeSciencesUtilities
  MakeContext = ->(ctxmap, basectx) {
    ElifeSciencesContext.new(ctxmap, basectx)
  }
end
