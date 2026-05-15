# ElifeSciences SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ElifeSciencesFeatures
  def self.make_feature(name)
    case name
    when "base"
      ElifeSciencesBaseFeature.new
    when "test"
      ElifeSciencesTestFeature.new
    else
      ElifeSciencesBaseFeature.new
    end
  end
end
