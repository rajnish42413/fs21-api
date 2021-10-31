import { Request } from "express";
import Type from "../../models/Type";

export const index = async (req: Request) => {
    let types = Type.query();
    const res = await types.where('status', 1).limit(20);
    return res;
};

export const show = async (req: Request) => {
    const {listing} = req.params;
    const res = Type.query().findById(listing)
    return res;
};

export const update = async (req: Request) => {
    const {type} = req.params;
    const res = await Type.query().patchAndFetchById(type, req.body);
    return res;
};