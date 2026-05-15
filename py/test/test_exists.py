# ProjectName SDK exists test

import pytest
from elifesciences_sdk import ElifeSciencesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ElifeSciencesSDK.test(None, None)
        assert testsdk is not None
