<?php
declare(strict_types=1);

// ElifeSciences SDK utility: result_body

class ElifeSciencesResultBody
{
    public static function call(ElifeSciencesContext $ctx): ?ElifeSciencesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
