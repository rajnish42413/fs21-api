import { Request } from 'express';
import Pricing from '../../models/Pricing';
import Listing from '../../models/Listing';

export const index = async (req: Request) => {
  const { listing } = req.params;
  const res = Pricing.query()
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

export const create = async (req: Request) => {
  const { listing } = req.params;
  await Pricing.query().insert(req.body);
  return Pricing.query().where("entity_id", listing).where("entity", "listing");
};


export const remove = async (req: Request) => {
    const { pricing, listing} = req.params;
    await Pricing.query().deleteById(pricing);
    return Pricing.query().where("entity_id", listing).where("entity", "listing");
  };