# ElifeSciences SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ElifeSciencesUtility.registrar = ->(u) {
  u.clean = ElifeSciencesUtilities::Clean
  u.done = ElifeSciencesUtilities::Done
  u.make_error = ElifeSciencesUtilities::MakeError
  u.feature_add = ElifeSciencesUtilities::FeatureAdd
  u.feature_hook = ElifeSciencesUtilities::FeatureHook
  u.feature_init = ElifeSciencesUtilities::FeatureInit
  u.fetcher = ElifeSciencesUtilities::Fetcher
  u.make_fetch_def = ElifeSciencesUtilities::MakeFetchDef
  u.make_context = ElifeSciencesUtilities::MakeContext
  u.make_options = ElifeSciencesUtilities::MakeOptions
  u.make_request = ElifeSciencesUtilities::MakeRequest
  u.make_response = ElifeSciencesUtilities::MakeResponse
  u.make_result = ElifeSciencesUtilities::MakeResult
  u.make_point = ElifeSciencesUtilities::MakePoint
  u.make_spec = ElifeSciencesUtilities::MakeSpec
  u.make_url = ElifeSciencesUtilities::MakeUrl
  u.param = ElifeSciencesUtilities::Param
  u.prepare_auth = ElifeSciencesUtilities::PrepareAuth
  u.prepare_body = ElifeSciencesUtilities::PrepareBody
  u.prepare_headers = ElifeSciencesUtilities::PrepareHeaders
  u.prepare_method = ElifeSciencesUtilities::PrepareMethod
  u.prepare_params = ElifeSciencesUtilities::PrepareParams
  u.prepare_path = ElifeSciencesUtilities::PreparePath
  u.prepare_query = ElifeSciencesUtilities::PrepareQuery
  u.result_basic = ElifeSciencesUtilities::ResultBasic
  u.result_body = ElifeSciencesUtilities::ResultBody
  u.result_headers = ElifeSciencesUtilities::ResultHeaders
  u.transform_request = ElifeSciencesUtilities::TransformRequest
  u.transform_response = ElifeSciencesUtilities::TransformResponse
}
