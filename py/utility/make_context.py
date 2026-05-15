# ElifeSciences SDK utility: make_context

from core.context import ElifeSciencesContext


def make_context_util(ctxmap, basectx):
    return ElifeSciencesContext(ctxmap, basectx)
