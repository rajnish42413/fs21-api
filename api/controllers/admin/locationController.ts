import { Request } from "express";
import City from "../../models/City";
import Area from "../../models/Area";
import Country from '../../models/Country';
import { ResponseError } from "../../errors";

const indiaCountryId = 101;

export const cities =  async (req: Request) => {
    const {country} = req.params;
    let country_id = 101;
    if(country) country_id = country;
    const cities = await City.query().where('country_id', country_id).joinEager('image').where('image.entity','city').orderBy('id');
    return cities;
};

export const cityUpdate = async (req: Request) => {
    const {city} = req.params;
    const res = await City.query().patchAndFetchById(city, req.body);
    return res;
};

export const areas =  async (req: Request) => {
    const {city} = req.params;
    if(!city) throw new ResponseError("CityId is required", 422);
    const areas = await Area.query().where('city_id', city);
    return areas;
};

export const countries =  async (req: Request) => {
    const countries = await Country.query();
    return countries;
};