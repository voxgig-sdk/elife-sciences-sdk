# ElifeSciences SDK feature factory

from elifesciences_sdk.feature.base_feature import ElifeSciencesBaseFeature
from elifesciences_sdk.feature.ratelimit_feature import ElifeSciencesRatelimitFeature
from elifesciences_sdk.feature.retry_feature import ElifeSciencesRetryFeature
from elifesciences_sdk.feature.test_feature import ElifeSciencesTestFeature
from elifesciences_sdk.feature.timeout_feature import ElifeSciencesTimeoutFeature


_FEATURES = {
    "base": lambda: ElifeSciencesBaseFeature(),
    "ratelimit": lambda: ElifeSciencesRatelimitFeature(),
    "retry": lambda: ElifeSciencesRetryFeature(),
    "test": lambda: ElifeSciencesTestFeature(),
    "timeout": lambda: ElifeSciencesTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
