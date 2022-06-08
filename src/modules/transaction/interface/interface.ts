export interface transactionResponse {
    status? : boolean;
    message : string;
    data? : any;
    resp_code?: string;
}

export interface transactionRecord {
    iamount : number;
    icurrency : string;
    oamount : number;
    ocurrency: number;
    customerId: number;
}