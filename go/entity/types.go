// Typed models for the ElifeSciences SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Annotation is the typed data model for the annotation entity.
type Annotation struct {
}

// AnnotationLoadMatch is the typed request payload for Annotation.LoadTyped.
type AnnotationLoadMatch struct {
}

// Article is the typed data model for the article entity.
type Article struct {
}

// ArticleLoadMatch is the typed request payload for Article.LoadTyped.
type ArticleLoadMatch struct {
	Id string `json:"id"`
}

// Collection is the typed data model for the collection entity.
type Collection struct {
}

// CollectionLoadMatch is the typed request payload for Collection.LoadTyped.
type CollectionLoadMatch struct {
	Id string `json:"id"`
}

// Person is the typed data model for the person entity.
type Person struct {
}

// PersonLoadMatch is the typed request payload for Person.LoadTyped.
type PersonLoadMatch struct {
	Id string `json:"id"`
}

// Search is the typed data model for the search entity.
type Search struct {
}

// SearchLoadMatch is the typed request payload for Search.LoadTyped.
type SearchLoadMatch struct {
}

// Subject is the typed data model for the subject entity.
type Subject struct {
}

// SubjectLoadMatch is the typed request payload for Subject.LoadTyped.
type SubjectLoadMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
