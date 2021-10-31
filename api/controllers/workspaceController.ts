import { Request } from "express";
import Workspace from "../models/Workspace";

export const index = async (req: Request) => {
    const {city_id, area_id, capacity, location} = req.body;
    let listings = Workspace.query();
    if(city_id) listings.where('city_id', city_id);
    if(area_id) listings.where('area_id', area_id);
    if(capacity) listings.where('capacity', capacity);
    const res = await listings.eager('image')
    return res;
};

export const show = async (req: Request) => {
    const {listing} = req.params;
    const res = Workspace.query().findById(listing).eager('image')
    return res;
};
