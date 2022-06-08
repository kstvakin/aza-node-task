import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleApiService {
    constructor(){}
    async convert(amount:number, from:string, to:string){
        try {
            let url: string = process.env.APILAYER || '';
            return await axios.get(url, {
                headers: {apikey: process.env.APILAYER_APIKEY},
                params: {amount, from, to}
            })
        }catch (error) {
            throw new HttpException(error?.message, error?.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
