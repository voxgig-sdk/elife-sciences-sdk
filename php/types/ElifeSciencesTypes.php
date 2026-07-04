<?php
declare(strict_types=1);

// Typed models for the ElifeSciences SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
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

/** Match filter for Annotation#load (any subset of Annotation fields). */
class AnnotationLoadMatch
{
}

/** Article entity data model. */
class Article
{
}

/** Request payload for Article#load. */
class ArticleLoadMatch
{
    public string $id;
}

/** Collection entity data model. */
class Collection
{
}

/** Request payload for Collection#load. */
class CollectionLoadMatch
{
    public string $id;
}

/** Person entity data model. */
class Person
{
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

/** Match filter for Search#load (any subset of Search fields). */
class SearchLoadMatch
{
}

/** Subject entity data model. */
class Subject
{
}

/** Request payload for Subject#load. */
class SubjectLoadMatch
{
    public string $id;
}

