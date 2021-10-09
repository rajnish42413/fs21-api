import { Request, Response, NextFunction } from "express";
const http = require("http"),
    Layer = require("express/lib/router/layer"),
    debug = require("debug")("app:middleware:response-handler");

import { ResponseError, MailError } from "../errors";

Layer.prototype.handle_request = async function(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const fn = this.handle;
    if (fn.length > 3) {
        return next();
    }
    try {
        const newRes = await fn(req, res, next);
        if (
            typeof newRes !== "undefined" &&
            !(newRes instanceof http.ServerResponse)
        ) {
            res.send(newRes);
        }
    } catch (err) {
        // When throws Response error.
        if (err instanceof ResponseError) {
            return err.handle(req, res);
        }

        if (req.headers.accept === "application/json") {
            debug(err);
            return res
                .status(500)
                .send({ message: err.message, stack: err.stack.split("\n") });
        }

        next(err);
    }
};
