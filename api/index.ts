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
import * as passwordController from "./controllers/auth/passwordController";

//import delete_item from "./controllers/removeController";
import "./db";
app.use(bodyParser.json());

app.post("/login", loginController);
app.post("/register", registerController);

app.use(authMiddleware);

export default (expApp: Express) => {
    return app;
};
