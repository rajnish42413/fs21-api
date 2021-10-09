declare namespace Express {
    interface Organization {
        id: number;
        name: string;
    }
    export interface Request {
        token: any;
        user: any;
        organization: Organization;
        validate: (rules: any) => void;
    }
    export interface Response {
        token: any;
    }
}

declare namespace ValidatorJS {
    interface ValidatorStatic {
        required: (val: any) => boolean;
    }
}
