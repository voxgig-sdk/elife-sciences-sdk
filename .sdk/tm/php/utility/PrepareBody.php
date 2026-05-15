<?php
declare(strict_types=1);

// ElifeSciences SDK utility: prepare_body

class ElifeSciencesPrepareBody
{
    public static function call(ElifeSciencesContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
