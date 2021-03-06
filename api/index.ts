import { Express, Request, Router } from "express";
import { ResponseError } from "./errors";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();
import "./extensions/express-response";

const app = Router();

app.use(cors());
import authMiddleware from "./middlewares/auth";
import loginController from "./controllers/auth/loginController";
import registerController from "./controllers/auth/registerController";
import * as locationController from "./controllers/locationController";
import * as listingController from "./controllers/listingController";
import * as workspaceController from "./controllers/workspaceController";
import * as typeController from "./controllers/typeControllers";


import * as AdminLocationController from "./controllers/admin/locationController";
import * as AdminTypeController from "./controllers/admin/typeControllers";
import * as AdminListingController from "./controllers/admin/listingController";
import * as AdminPricingController from "./controllers/admin/pricingsController";
import * as AdminWorkspaceController from "./controllers/admin/workspaceController";
import * as AdminHomeController from "./controllers/admin/homeController";

//import delete_item from "./controllers/removeController";
import "./db";
app.use(bodyParser.json());

app.post("/login", loginController);
app.post("/register", registerController);

app.get("/countries", locationController.countries);
app.get("/countries/:country/cities", locationController.cities);
app.get("/cities", locationController.cities);
app.get("/types", typeController.index);
app.get("/cities/:city/areas", locationController.areas);
app.get("/cities/:city/listings", listingController.showCityListings);
app.get("/listings", listingController.index);
app.get("/listings/:listing", listingController.show);
app.get("/workspaces", workspaceController.index);
app.get("/workspaces/:workspace", workspaceController.show);

// user routes
app.use(authMiddleware);


// admin routes
// app.use(authMiddleware);
app.get("/admin/countries", AdminLocationController.countries);
app.get("/admin/countries/:country/cities", AdminLocationController.cities);
app.get("/admin/required-data", AdminHomeController.index);

app.get("/admin/cities", AdminLocationController.cities);
app.post("/admin/cities", AdminLocationController.storeCity);
app.put("/admin/cities/:city", AdminLocationController.cityUpdate);

app.get("/admin/types", AdminTypeController.index);
app.put("/admin/types/:type", AdminTypeController.update);
app.delete("/admin/types/:type", AdminTypeController.remove);
app.post("/admin/types", AdminTypeController.store);

app.get("/admin/cities/:city/areas", AdminLocationController.areas);
app.post("/admin/cities/:city/areas", AdminLocationController.storeArea);

app.get("/admin/listings", AdminListingController.index);
app.post("/admin/listings", AdminListingController.store);
app.post("/admin/listings/create", AdminListingController.store);
app.get("/admin/listings/:listing", AdminListingController.show);
app.post("/admin/listings/:listing/update", AdminListingController.update);
app.post("/admin/listings/:listing/pricings", AdminPricingController.create);
app.delete("/admin/listings/:listing/pricings/:pricing", AdminPricingController.remove);
app.post("/admin/listings/:listing/open-hours", AdminListingController.updateOpenHours);

app.get("/admin/workspaces", AdminWorkspaceController.index);
app.post("/admin/workspaces", AdminWorkspaceController.store);
app.post("/admin/workspaces/:workspace/update", AdminWorkspaceController.update);
app.get("/admin/workspaces/:workspace", AdminWorkspaceController.show);


export default (expApp: Express) => {
    return app;
};
