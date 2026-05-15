<?php
declare(strict_types=1);

// ElifeSciences SDK utility: result_headers

class ElifeSciencesResultHeaders
{
    public static function call(ElifeSciencesContext $ctx): ?ElifeSciencesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
