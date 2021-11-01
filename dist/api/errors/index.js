"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(args, code) {
        super(args);
        this.code = code;
    }
}
exports.AppError = AppError;
class ResponseError extends AppError {
    constructor(message, statusCode = 500) {
        super(message, "RESPONSE_ERROR");
        this.statusCode = statusCode;
    }
    handle(req, res) {
        res.status(this.statusCode).send({ message: this.message });
    }
}
exports.ResponseError = ResponseError;
class ValidationError extends ResponseError {
    constructor(message, errors = []) {
        super(message, 422);
        this.errors = [];
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
class ResponseWarning extends AppError {
}
exports.ResponseWarning = ResponseWarning;
class MailError extends AppError {
    constructor(err) {
        if (!err.errors || !err.errors.length) {
            super(err.message);
            return;
        }
        const error = err.errors[0];
        super(error.message, 201);
        this.errors = err.errors;
    }
}
exports.MailError = MailError;
//# sourceMappingURL=index.js.map