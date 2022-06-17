import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";
import Transaction from "../../../core/entities/transaction.entity";
import Customer from "../../../core/entities/customer.entity";
import {CUSTOMER_REPOSITORY, FAILED, SUCCESS, TRANSACTION_REPOSITORY} from "../../../core/constants";
import {TransactionDto, UpdateRecordDto} from "../dto/transaction.dto";
import {transactionResponse} from "../interface/interface";
import {TransactionLists, CustomerLists} from "../service/pattern";
import {GoogleApiService} from "../../googleapi/googleapi.service";
import {ValidationService} from "../validation/validation.service";
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TransactionService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @Inject(TRANSACTION_REPOSITORY) private readonly trxRepo: typeof Transaction,
        @Inject(CUSTOMER_REPOSITORY) private readonly cusRepo: typeof Customer,
        private googleapi: GoogleApiService,
        private validation:ValidationService,
        private eventEmitter: EventEmitter2
    ) {
    }

    async create(data: TransactionDto): Promise<transactionResponse> {
        try {
            await this.validation.transactionSchema(data);
            const customerLists = new CustomerLists(this.cusRepo);
            const lists = new TransactionLists(this.trxRepo);
            const customer = await customerLists.fetchCustomer(data.customerId);
            const resp : any = await this.googleapi.convert(data.amount, data.currency, customer.currency);
            await lists.createList({
                iamount: data.amount,
                icurrency: data.currency,
                oamount: resp.data.result,
                ocurrency: customer.currency,
                customerId:data.customerId
            });
            let response: transactionResponse = {
                status: true,
                resp_code: SUCCESS,
                message: 'transaction record created successfully'
            };

            return response;

        } catch (error) {
            this.logger.error(error);
            switch (error.name) {
                case "validationError":
                    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
                case "HttpException":
                    this.eventEmitter.emit('proxy_is_down', 'proxy server unreachable');
                    throw new HttpException('proxy not reachable', HttpStatus.BAD_GATEWAY);
                default:
                    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async lists(query:any): Promise<transactionResponse> {
        try {

            const lists = new TransactionLists(this.trxRepo);
            const records = await lists.fetchLists(query);
            const count = records.length;
            const message = count ? 'record fetched successfully' : 'no record found';

            let response: transactionResponse = {
                status: true,
                resp_code: SUCCESS,
                message,
                data:{
                    results: records,
                    total: count,
                    ...(count && {page: query.page || 1})
                }
            };

            return response;

        } catch (error) {
            this.logger.error(error);
            throw new HttpException('Oops! something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async fetchARecord(id:number): Promise<transactionResponse> {
        try {

            const lists = new TransactionLists(this.trxRepo);
            const record = await lists.fetchList(id);
            const message = record ? 'record fetched successfully' : 'record not found';
            let response: transactionResponse = {
                status: !!record,
                resp_code: record ? SUCCESS : FAILED,
                message,
                ...(record && {data:record})
            };

            return response;

        } catch (error) {
            this.logger.error(error);
            throw new HttpException('Oops! something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateARecord(data:UpdateRecordDto, id:number): Promise<transactionResponse> {
        try {

            const lists = new TransactionLists(this.trxRepo);
            const transactionRecord = await lists.fetchList(id);
            const resp : any = await this.googleapi.convert(data.amount, data.currency.toUpperCase(), transactionRecord.ocurrency);
            const record = await lists.updateList({
                iamount:data.amount,
                icurrency:data.currency.toUpperCase(),
                oamount:resp.data.result,
                id
            });
            const message = 'record updated successfully';
            let response: transactionResponse = {
                status: !!record,
                resp_code: record ? SUCCESS : FAILED,
                message,
                ...(record && {data:record})
            };

            return response;

        } catch (error) {
            this.logger.error(error);
            throw new HttpException('Oops! something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
