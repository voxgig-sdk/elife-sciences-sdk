<?php
declare(strict_types=1);

// ElifeSciences SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ElifeSciencesMakeContext
{
    public static function call(array $ctxmap, ?ElifeSciencesContext $basectx): ElifeSciencesContext
    {
        return new ElifeSciencesContext($ctxmap, $basectx);
    }
}
