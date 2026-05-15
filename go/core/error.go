package core

type ElifeSciencesError struct {
	IsElifeSciencesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewElifeSciencesError(code string, msg string, ctx *Context) *ElifeSciencesError {
	return &ElifeSciencesError{
		IsElifeSciencesError: true,
		Sdk:              "ElifeSciences",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ElifeSciencesError) Error() string {
	return e.Msg
}
