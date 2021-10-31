import { Request } from 'express';
import Listing from '../models/Listing';
import Area from '../models/Area';
import City from '../models/City';
import * as AWS from 'aws-sdk';
var fs = require('fs');


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
    region:process.env.AWS_REGION
});

export const index = async (req: Request) => {
  const { city_id, area_id, capacity, location, q } = req.query;
  let listings = Listing.query();
  if (city_id) listings.where('city_id', city_id);
  if (area_id) listings.where('area_id', area_id);
  if (capacity) listings.where('capacity', capacity);
  if (q) {
    const item = q.split(',');
    if (item.length) {
      if (item.lenght > 2) {
        const area = await Area.query()
          .where('name', 'like', `%${item[0]}%`)
          .first();
        if (!area) {
          const min_lenght = item.lenght > 2 ? 2 : 0;
          const city = await City.query()
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
        const city = await City.query()
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
    .orderBy('scores', 'DESC');
  return res;
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

export const UploadImage = async (req: Request) => {
  const { image } = req.body;
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
  });
  const filename = 'the-file-name';
  const fileContent = fs.readFileSync(filename);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${filename}.jpg`,
    Body: fileContent,
  };
  const res = s3.upload(params, (err:any, data:any) => {
    console.log(data);
    console.log(err);
  });
  return res;
};
