package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAnnotationEntityFunc func(client *ElifeSciencesSDK, entopts map[string]any) ElifeSciencesEntity

var NewArticleEntityFunc func(client *ElifeSciencesSDK, entopts map[string]any) ElifeSciencesEntity

var NewCollectionEntityFunc func(client *ElifeSciencesSDK, entopts map[string]any) ElifeSciencesEntity

var NewPersonEntityFunc func(client *ElifeSciencesSDK, entopts map[string]any) ElifeSciencesEntity

var NewSearchEntityFunc func(client *ElifeSciencesSDK, entopts map[string]any) ElifeSciencesEntity

var NewSubjectEntityFunc func(client *ElifeSciencesSDK, entopts map[string]any) ElifeSciencesEntity

