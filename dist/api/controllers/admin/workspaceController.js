"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Workspace_1 = require("../../models/Workspace");
exports.index = (req) => __awaiter(this, void 0, void 0, function* () {
    const { city_id, area_id, capacity, location, q, currentPage, pageSize } = req.query;
    const res = yield Workspace_1.default.query()
        .withGraphFetched('[image, city, area]')
        .modifyGraph('image', (builder) => {
        builder.where('entity', 'workspace');
    })
        .orderBy('id', 'DESC').page(currentPage, pageSize);
    return res;
});
exports.show = (req) => __awaiter(this, void 0, void 0, function* () {
    const { workspace } = req.params;
    const res = Workspace_1.default.query()
        .findById(workspace)
        .withGraphFetched('[image, city, area, media, openHours]')
        .modifyGraph('media', (builder) => {
        builder.where('entity', 'workspace');
    })
        .modifyGraph('openHours', (builder) => {
        builder.where('entity', 'workspace');
    });
    return res;
});
exports.update = (req) => __awaiter(this, void 0, void 0, function* () {
    const { workspace } = req.params;
    const res = yield Workspace_1.default.query().patchAndFetchById(workspace, req.body);
    return res;
});
exports.UploadImage = (req) => __awaiter(this, void 0, void 0, function* () {
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
});
//# sourceMappingURL=workspaceController.js.map