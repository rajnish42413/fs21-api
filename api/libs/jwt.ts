import * as jwt from "jsonwebtoken";
import config from "../configs/app";

interface Payload {
    iat: number;
    sub: number;
}

export const sign = (payload: Payload) => {
    return jwt.sign(payload, config.key);
};

export const verify = (token: string): Payload => {
    return <Payload>jwt.verify(token, config.key);
};
