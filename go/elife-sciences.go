package voxgigelifesciencessdk

import (
	"github.com/voxgig-sdk/elife-sciences-sdk/go/core"
	"github.com/voxgig-sdk/elife-sciences-sdk/go/entity"
	"github.com/voxgig-sdk/elife-sciences-sdk/go/feature"
	_ "github.com/voxgig-sdk/elife-sciences-sdk/go/utility"
)

// Type aliases preserve external API.
type ElifeSciencesSDK = core.ElifeSciencesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ElifeSciencesEntity = core.ElifeSciencesEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ElifeSciencesError = core.ElifeSciencesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAnnotationEntityFunc = func(client *core.ElifeSciencesSDK, entopts map[string]any) core.ElifeSciencesEntity {
		return entity.NewAnnotationEntity(client, entopts)
	}
	core.NewArticleEntityFunc = func(client *core.ElifeSciencesSDK, entopts map[string]any) core.ElifeSciencesEntity {
		return entity.NewArticleEntity(client, entopts)
	}
	core.NewCollectionEntityFunc = func(client *core.ElifeSciencesSDK, entopts map[string]any) core.ElifeSciencesEntity {
		return entity.NewCollectionEntity(client, entopts)
	}
	core.NewPersonEntityFunc = func(client *core.ElifeSciencesSDK, entopts map[string]any) core.ElifeSciencesEntity {
		return entity.NewPersonEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.ElifeSciencesSDK, entopts map[string]any) core.ElifeSciencesEntity {
		return entity.NewSearchEntity(client, entopts)
	}
	core.NewSubjectEntityFunc = func(client *core.ElifeSciencesSDK, entopts map[string]any) core.ElifeSciencesEntity {
		return entity.NewSubjectEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewElifeSciencesSDK = core.NewElifeSciencesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewElifeSciencesSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ElifeSciencesSDK  { return NewElifeSciencesSDK(nil) }
func Test() *ElifeSciencesSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
