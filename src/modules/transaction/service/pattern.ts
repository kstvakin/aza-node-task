import {transactionRecord, updateRecord} from "../interface/interface";
import Customer from "../../../core/entities/customer.entity";
import Transaction from "../../../core/entities/transaction.entity";

export const TransactionLists : any = function(model){
    this.model = model;
    this.fetchLists = async (query?): Promise<Transaction[]> => {
        return await this.model.findAll({
            attributes:['id','iamount','icurrency','oamount','ocurrency','createdAt'],
            order:[
                ['createdAt', 'DESC']
            ]
        });
    };
    this.fetchList = async (id:number): Promise<Transaction> => {
        return await this.model.findOne({
            where:{
                id
            },
            attributes:['id','iamount','icurrency','oamount','ocurrency','createdAt']
        });
    };
    this.createList = async (data:transactionRecord) => {
        return await this.model.create(data);
    };
    this.updateList = async (data:updateRecord): Promise<any> => {
        await this.model.update(
            {
                iamount:data.iamount,
                icurrency:data.icurrency,
                oamount:data.oamount
            },
            {
                where: { id: data.id},
            }

        );

        return data;
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