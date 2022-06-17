export class TransactionDto {
    readonly amount : number;
    readonly currency : string;
    readonly customerId : number;
}

export class UpdateRecordDto {
    readonly id : number;
    readonly currency : string;
    readonly amount : number;
}