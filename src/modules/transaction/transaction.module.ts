import { Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';
import { TransactionController } from './controller/transaction.controller';
import { TransactionService } from './service/transaction.service';
import {ResponseService} from "../../core/traits";
import {transactionProviders} from "./transaction.provider";
import {GoogleApiService} from "../googleapi/googleapi.service";

@Module({
  providers: [
    ResponseService,
    ValidationService,
    TransactionService,
    GoogleApiService,
      ...transactionProviders
  ],
  controllers: [TransactionController]
})
export class TransactionModule {}
