import {transactionRecord} from "../interface/interface";
import Customer from "../../../core/entities/customer.entity";
import Transaction from "../../../core/entities/transaction.entity";

export const TransactionLists : any = function(model){
    this.model = model;
    this.fetchLists = async (query?): Promise<Transaction[]> => {
        let pageSize = Number(query.limit) || 10;
        pageSize = pageSize > 200 ? 200 : pageSize;
        const page = Number(query.page) || 1;
        const offset = (pageSize * page) - pageSize;
        return await this.model.findAll({
            attributes:['iamount','icurrency','oamount','ocurrency','createdAt'],
            limit: pageSize,
            order:[
                ['createdAt', 'DESC']
            ],
            offset
        });
    };
    this.fetchList = async (id:number): Promise<Transaction> => {
        return await this.model.findOne({
            where:{
                customerId:id
            },
            attributes:['iamount','icurrency','oamount','ocurrency','createdAt']
        });
    };
    this.createList = async (data:transactionRecord) => {
        return await this.model.create(data);
    };
}

export const CustomerLists: any = function(model){
    this.model = model;
    this.fetchCustomer = async (customerId:number) : Promise<Customer> => {
        return await this.model.findOne({
            where:{
                id:customerId
            },
            attributes:['currency']
        });
    };
}