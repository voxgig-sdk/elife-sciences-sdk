// Typed models for the ElifeSciences SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Annotation {
}

export interface AnnotationLoadMatch {
  by?: string
  order?: string
  page?: number
  per_page?: number
}

export interface Article {
  id?: string
}

export interface ArticleLoadMatch {
  id: string
}

export interface Collection {
  id?: string
}

export interface CollectionLoadMatch {
  id: string
}

export interface Person {
  id?: string
}

export interface PersonLoadMatch {
  id: string
}

export interface Search {
}

export interface SearchLoadMatch {
  for: string
  order?: string
  page?: number
  per_page?: number
  sort?: string
  subject?: any[]
  type?: any[]
}

export interface Subject {
  id?: string
}

export interface SubjectLoadMatch {
  id: string
}

