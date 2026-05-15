<?php
declare(strict_types=1);

// ElifeSciences SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ElifeSciencesUtility::setRegistrar(function (ElifeSciencesUtility $u): void {
    $u->clean = [ElifeSciencesClean::class, 'call'];
    $u->done = [ElifeSciencesDone::class, 'call'];
    $u->make_error = [ElifeSciencesMakeError::class, 'call'];
    $u->feature_add = [ElifeSciencesFeatureAdd::class, 'call'];
    $u->feature_hook = [ElifeSciencesFeatureHook::class, 'call'];
    $u->feature_init = [ElifeSciencesFeatureInit::class, 'call'];
    $u->fetcher = [ElifeSciencesFetcher::class, 'call'];
    $u->make_fetch_def = [ElifeSciencesMakeFetchDef::class, 'call'];
    $u->make_context = [ElifeSciencesMakeContext::class, 'call'];
    $u->make_options = [ElifeSciencesMakeOptions::class, 'call'];
    $u->make_request = [ElifeSciencesMakeRequest::class, 'call'];
    $u->make_response = [ElifeSciencesMakeResponse::class, 'call'];
    $u->make_result = [ElifeSciencesMakeResult::class, 'call'];
    $u->make_point = [ElifeSciencesMakePoint::class, 'call'];
    $u->make_spec = [ElifeSciencesMakeSpec::class, 'call'];
    $u->make_url = [ElifeSciencesMakeUrl::class, 'call'];
    $u->param = [ElifeSciencesParam::class, 'call'];
    $u->prepare_auth = [ElifeSciencesPrepareAuth::class, 'call'];
    $u->prepare_body = [ElifeSciencesPrepareBody::class, 'call'];
    $u->prepare_headers = [ElifeSciencesPrepareHeaders::class, 'call'];
    $u->prepare_method = [ElifeSciencesPrepareMethod::class, 'call'];
    $u->prepare_params = [ElifeSciencesPrepareParams::class, 'call'];
    $u->prepare_path = [ElifeSciencesPreparePath::class, 'call'];
    $u->prepare_query = [ElifeSciencesPrepareQuery::class, 'call'];
    $u->result_basic = [ElifeSciencesResultBasic::class, 'call'];
    $u->result_body = [ElifeSciencesResultBody::class, 'call'];
    $u->result_headers = [ElifeSciencesResultHeaders::class, 'call'];
    $u->transform_request = [ElifeSciencesTransformRequest::class, 'call'];
    $u->transform_response = [ElifeSciencesTransformResponse::class, 'call'];
});
