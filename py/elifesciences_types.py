# Typed models for the ElifeSciences SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Annotation:
    pass


@dataclass
class AnnotationLoadMatch:
    pass


@dataclass
class Article:
    pass


@dataclass
class ArticleLoadMatch:
    id: str


@dataclass
class Collection:
    pass


@dataclass
class CollectionLoadMatch:
    id: str


@dataclass
class Person:
    pass


@dataclass
class PersonLoadMatch:
    id: str


@dataclass
class Search:
    pass


@dataclass
class SearchLoadMatch:
    pass


@dataclass
class Subject:
    pass


@dataclass
class SubjectLoadMatch:
    id: str

