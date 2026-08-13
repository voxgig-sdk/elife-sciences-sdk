# ElifeSciences SDK feature factory

from elifesciences_sdk.feature.base_feature import ElifeSciencesBaseFeature
from elifesciences_sdk.feature.test_feature import ElifeSciencesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ElifeSciencesBaseFeature(),
        "test": lambda: ElifeSciencesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
