import { Request } from "express";
import User from "../../models/User";
import * as bcrypt from "bcrypt";
export default async (req: Request) => {
    const user = await User.query().insert({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    });
    return user;
};
