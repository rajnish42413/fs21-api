import { Request } from "express";
import Type from "../../models/Type";
import City from "../../models/City";

export const index = async (req: Request) => {
    const country = 101;
    const types = await Type.query().select('id','name').orderBy('id');
    const cities = await City.query().select('id','name').where('country_id', country).orderBy('id');

    const data = {
        "status" : true,
        "data" : {
            "cities" : cities,
            "types" : types,
        }
    }
    return data;
};
