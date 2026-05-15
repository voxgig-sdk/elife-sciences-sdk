<?php
declare(strict_types=1);

// ElifeSciences SDK utility: feature_add

class ElifeSciencesFeatureAdd
{
    public static function call(ElifeSciencesContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
