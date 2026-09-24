<?php
declare(strict_types=1);

// Typed models for the ElifeSciences SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Annotation entity data model. */
class Annotation
{
}

/** Request payload for Annotation#load. */
class AnnotationLoadMatch
{
    public ?string $by = null;
    public ?string $order = null;
    public ?int $page = null;
    public ?int $per_page = null;
}

/** Article entity data model. */
class Article
{
    public ?string $id = null;
}

/** Request payload for Article#load. */
class ArticleLoadMatch
{
    public string $id;
}

/** Collection entity data model. */
class Collection
{
    public ?string $id = null;
}

/** Request payload for Collection#load. */
class CollectionLoadMatch
{
    public string $id;
}

/** Person entity data model. */
class Person
{
    public ?string $id = null;
}

/** Request payload for Person#load. */
class PersonLoadMatch
{
    public string $id;
}

/** Search entity data model. */
class Search
{
}

/** Request payload for Search#load. */
class SearchLoadMatch
{
    public string $for;
    public ?string $order = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $sort = null;
    public ?array $subject = null;
    public ?array $type = null;
}

/** Subject entity data model. */
class Subject
{
    public ?string $id = null;
}

/** Request payload for Subject#load. */
class SubjectLoadMatch
{
    public string $id;
}

