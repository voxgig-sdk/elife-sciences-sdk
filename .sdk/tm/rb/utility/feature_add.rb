# ElifeSciences SDK utility: feature_add
module ElifeSciencesUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
