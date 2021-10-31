import { Request } from "express";
import City from "../models/City";
import Area from "../models/Area";
import Country from '../models/Country';
import { ResponseError } from "../errors";

const indiaCountryId = 101;

export const cities =  async (req: Request) => {
    // const {country} = req.params;
    // if(!country) throw new ResponseError("CountryId is required", 422);
    const country = 101;
    const cities = await City.query().where('country_id', country).joinEager('image').where('image.entity','city').orderBy('id');
    return cities;
};

export const areas =  async (req: Request) => {
    const {city} = req.params;
    if(!city) throw new ResponseError("CityId is required", 422);
    const areas = await Area.query().where('city_id', city).where('status',1);
    return areas;
};

export const countries =  async (req: Request) => {
    const countries = await Country.query().where('status',1);
    return countries;
};