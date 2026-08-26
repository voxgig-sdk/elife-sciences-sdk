# Typed models for the ElifeSciences SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Annotation(TypedDict):
    pass


class AnnotationLoadMatch(TypedDict):
    pass


class Article(TypedDict, total=False):
    id: str


class ArticleLoadMatch(TypedDict):
    id: str


class Collection(TypedDict, total=False):
    id: str


class CollectionLoadMatch(TypedDict):
    id: str


class Person(TypedDict, total=False):
    id: str


class PersonLoadMatch(TypedDict):
    id: str


class Search(TypedDict):
    pass


class SearchLoadMatch(TypedDict):
    pass


class Subject(TypedDict, total=False):
    id: str


class SubjectLoadMatch(TypedDict):
    id: str
