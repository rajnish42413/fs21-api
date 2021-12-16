import { Request } from 'express';
import Listing from '../models/Listing';
import Area from '../models/Area';
import City from '../models/City';
import Type from '../models/Type';

export const index = async (req: Request) => {
  const {
    city_id,
    area_id,
    capacity,
    location,
    q,
    type_id,
    currentPage,
    pageSize,
  } = req.query;
  let listings = Listing.query();
  let page_size = pageSize || 10;
  let current_page = currentPage || 0;
  let area, city, type;
  if (city_id) {
    listings.where('city_id', city_id);
    city = await City.query()
      .select('id', 'slug', 'name')
      .findById(city_id);
  }
  if (area_id) {
    listings.where('area_id', area_id);
    area = await Area.query()
      .select('id', 'slug', 'name')
      .findById(area_id);
  }

  if (type_id) {
    listings.where('type_id', type_id);
    type = await Type.query()
      .select('id', 'slug', 'name')
      .findById(type_id);
  }

  if (capacity) listings.where('capacity', capacity);
  if (q) {
    const item = q.split(',');
    if (item.length) {
      if (item.lenght > 2) {
        area = await Area.query()
          .where('name', 'like', `%${item[0]}%`)
          .first();
        if (!area) {
          const min_lenght = item.lenght > 2 ? 2 : 0;
          city = await City.query()
            .where(
              'name',
              'like',
              `%${item[item.lenght - min_lenght]}%`,
            )
            .first();
          if (city) {
            listings.where('city_id', await city.id);
          }
        }
        if (area) {
          listings.where('area_id', await area.id);
        }
      } else {
        city = await City.query()
          .where('name', 'like', `%${item[0]}%`)
          .first();
        if (city) {
          listings.where('city_id', await city.id);
        }
      }
    }
  }

  const res = await listings
    .withGraphFetched('[image, city, area]')
    .modifyGraph('image', (builder) => {
      builder.where('entity', 'listing');
    })
    .orderBy('scores', 'DESC')
    .page(current_page, page_size);
  const data = { listings: res, area, city, type };
  return {
    status: true,
    data: data,
  };
};

export const show = async (req: Request) => {
  const { listing } = req.params;
  const res = Listing.query()
    .findById(listing)
    .withGraphFetched('[image, city, area, pricings, media, openHours]')
    .modifyGraph('media', (builder) => {
      builder.where('entity', 'listing');
    })
    .modifyGraph('openHours', (builder) => {
      builder.where('entity', 'listing');
    });
  return res;
};

export const showCityListings = async (req: Request) => {
  const { city } = req.params;
  if (!city) return;
  const cityDetail = await City.query()
    .select('id', 'slug', 'name')
    .findById(city);
  const {
    area_id,
    capacity,
    type_id,
    currentPage,
    pageSize,
  } = req.query;
  let listings = Listing.query().where('city_id', city);
  let page_size = pageSize || 10;
  let current_page = currentPage || 0;
  let area, type;
  if (type_id) {
    listings.where('type_id', type_id);
    type = await Type.query()
      .select('id', 'slug', 'name')
      .findById(type_id);
  }
  if (area_id) {
    listings.where('area_id', area_id);
    area = await Area.query()
      .select('id', 'slug', 'name')
      .findById(area_id);
  }
  if (capacity) listings.where('capacity', capacity);
  const res = await listings
    .withGraphFetched('[image, city, area]')
    .modifyGraph('image', (builder) => {
      builder.where('entity', 'listing');
    })
    .orderBy('scores', 'DESC')
    .page(current_page, page_size);
  const data = { "listings": res, area, "city":cityDetail, type };
  return {
    status: true,
    data: data,
  };
};
