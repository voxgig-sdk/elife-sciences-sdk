# frozen_string_literal: true

# Typed models for the ElifeSciences SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Annotation entity data model.
class Annotation
end

# Match filter for Annotation#load (any subset of Annotation fields).
class AnnotationLoadMatch
end

# Article entity data model.
class Article
end

# Request payload for Article#load.
#
# @!attribute [rw] id
#   @return [String]
ArticleLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Collection entity data model.
class Collection
end

# Request payload for Collection#load.
#
# @!attribute [rw] id
#   @return [String]
CollectionLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Person entity data model.
class Person
end

# Request payload for Person#load.
#
# @!attribute [rw] id
#   @return [String]
PersonLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Search entity data model.
class Search
end

# Match filter for Search#load (any subset of Search fields).
class SearchLoadMatch
end

# Subject entity data model.
class Subject
end

# Request payload for Subject#load.
#
# @!attribute [rw] id
#   @return [String]
SubjectLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

