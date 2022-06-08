import { Injectable, Inject } from '@nestjs/common';
import {
    BADREQUEST,
    FAILED,
    FORBIDDEN,
    INTERNALSERVERERROR,
    SUCCESS,
    UNAUTHORIZED
} from "../constants";
import {transactionResponse} from "../../modules/transaction/interface/interface";

@Injectable()
export class ResponseService {

    constructor() { }

    success(data:transactionResponse): transactionResponse {

        let response : any = {
            status: data.status,
            resp_code: data.resp_code,
            message: data.message,
            data: data.data
        };

        return response;
    }

    error(error: any): transactionResponse {
        let response:any;
        switch(Number(error.status) || Number(error.response.status)) {
            case 400:

                response = {
                    status: false,
                    resp_code: BADREQUEST,
                    message: error.message,
                };

                return response;

            case 401:
                response = {
                    status: false,
                    resp_code: UNAUTHORIZED,
                    message: `unauthorized access to resource ${error?.response?.config?.url}`,
                };

                return response;

            case 403:
                response = {
                    status: false,
                    resp_code: FORBIDDEN,
                    message: error.message
                };

                return response;

            default:

                response = {
                    status: false,
                    resp_code: INTERNALSERVERERROR,
                    message: "Oops, something went wrong"
                };

                return response;

        }

    }
}