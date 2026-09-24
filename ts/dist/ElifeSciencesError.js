"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElifeSciencesError = void 0;
class ElifeSciencesError extends Error {
    isElifeSciencesError = true;
    sdk = 'ElifeSciences';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ElifeSciencesError = ElifeSciencesError;
//# sourceMappingURL=ElifeSciencesError.js.map