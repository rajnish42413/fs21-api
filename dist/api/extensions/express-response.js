"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http"), Layer = require("express/lib/router/layer"), debug = require("debug")("app:middleware:response-handler");
const errors_1 = require("../errors");
Layer.prototype.handle_request = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fn = this.handle;
        if (fn.length > 3) {
            return next();
        }
        try {
            const newRes = yield fn(req, res, next);
            if (typeof newRes !== "undefined" &&
                !(newRes instanceof http.ServerResponse)) {
                res.send(newRes);
            }
        }
        catch (err) {
            // When throws Response error.
            if (err instanceof errors_1.ResponseError) {
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
    });
};
//# sourceMappingURL=express-response.js.map