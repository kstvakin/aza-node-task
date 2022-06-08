import {CUSTOMER_REPOSITORY, TRANSACTION_REPOSITORY} from '../../core/constants';
import Transaction from "../../core/entities/transaction.entity";
import Customer from "../../core/entities/customer.entity";

export const transactionProviders = [
    {
        provide: TRANSACTION_REPOSITORY,
        useValue: Transaction,
    },
    {
        provide: CUSTOMER_REPOSITORY,
        useValue: Customer,
    }
];