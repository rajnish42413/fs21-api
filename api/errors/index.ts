import { Request, Response } from "express";

export class AppError extends Error {
    public code: string | number;
    constructor(args: any, code?: string | number) {
        super(args);
        this.code = code;
    }
}

export class ResponseError extends AppError {
    constructor(message: string, public statusCode: number = 500) {
        super(message, "RESPONSE_ERROR");
    }

    public handle(req: Request, res: Response) {
        res.status(this.statusCode).send({ message: this.message });
    }
}

export class ValidationError extends ResponseError {
    public errors: any = [];
    constructor(message: string, errors: any[] = []) {
        super(message, 422);
        this.errors = errors;
    }
}

export class ResponseWarning extends AppError {}

export class MailError extends AppError {
    public errors: any;
    constructor(err: any) {
        if (!err.errors || !err.errors.length) {
            super(err.message);
            return;
        }

        const error = err.errors[0];
        super(error.message, 201);
        this.errors = err.errors;
    }
}
