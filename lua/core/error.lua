-- ElifeSciences SDK error

local ElifeSciencesError = {}
ElifeSciencesError.__index = ElifeSciencesError


function ElifeSciencesError.new(code, msg, ctx)
  local self = setmetatable({}, ElifeSciencesError)
  self.is_sdk_error = true
  self.sdk = "ElifeSciences"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ElifeSciencesError:error()
  return self.msg
end


function ElifeSciencesError:__tostring()
  return self.msg
end


return ElifeSciencesError
