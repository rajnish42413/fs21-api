import { Request, Response, NextFunction } from "express";
import * as jwt from "../libs/jwt";
import User from "../models/User";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"];
        const payload = jwt.verify(token);
        const user = await User.query().findById(payload.sub);
        req.user = user;
        return next();
    } catch (err) {
        res.status(401).send({
            message: "Authentication Error"
        });
    }
};
