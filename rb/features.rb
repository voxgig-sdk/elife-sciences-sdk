# ElifeSciences SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ElifeSciencesFeatures
  def self.make_feature(name)
    case name
    when "base"
      ElifeSciencesBaseFeature.new
    when "ratelimit"
      ElifeSciencesRatelimitFeature.new
    when "retry"
      ElifeSciencesRetryFeature.new
    when "test"
      ElifeSciencesTestFeature.new
    when "timeout"
      ElifeSciencesTimeoutFeature.new
    else
      ElifeSciencesBaseFeature.new
    end
  end
end
