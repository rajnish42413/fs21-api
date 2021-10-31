import { Request } from "express";
import Type from "../models/Type";

export const index = async (req: Request) => {
    let types = Type.query();
    const res = await types.where('status', 1);
    return res;
};

export const show = async (req: Request) => {
    const {listing} = req.params;
    const res = Type.query().findById(listing)
    return res;
};
