import { Request } from 'express';
import Workspace from '../../models/Workspace';
import Area from '../../models/Area';
import City from '../../models/City';


export const index = async (req: Request) => {
  const { city_id, area_id, capacity, location, q } = req.query;
  const res = await Workspace.query()
    .withGraphFetched('[image, city, area]')
    .modifyGraph('image', (builder) => {
      builder.where('entity', 'workspace');
    })
    .orderBy('scores', 'DESC');
  return res;
};

export const show = async (req: Request) => {
  const { workspace } = req.params;
  const res = Workspace.query()
    .findById(workspace)
    .withGraphFetched('[image, city, area, media, openHours]')
    .modifyGraph('media', (builder) => {
      builder.where('entity', 'workspace');
    })
    .modifyGraph('openHours', (builder) => {
      builder.where('entity', 'workspace');
    });
  return res;
};

export const update = async (req: Request) => {
  const {workspace} = req.params;
  const res = await Workspace.query().patchAndFetchById(workspace, req.body);
  return res;
};

export const UploadImage = async (req: Request) => {
  const { image } = req.body;
  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.AWS_ACCESS,
  //   secretAccessKey: process.env.AWS_SECRET,
  // });
  // const filename = 'the-file-name';
  // const fileContent = fs.readFileSync(filename);

  // const params = {
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   Key: `${filename}.jpg`,
  //   Body: fileContent,
  // };
  // const res = s3.upload(params, (err:any, data:any) => {
  //   console.log(data);
  //   console.log(err);
  // });
  return "ok";
};
