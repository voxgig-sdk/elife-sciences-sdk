<?php
declare(strict_types=1);

// ElifeSciences SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ElifeSciencesFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ElifeSciencesBaseFeature();
            case "test":
                return new ElifeSciencesTestFeature();
            default:
                return new ElifeSciencesBaseFeature();
        }
    }
}
