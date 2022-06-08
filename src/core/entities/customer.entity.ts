import {Table, Column, Model, DataType, Index, HasMany} from 'sequelize-typescript';
import Transaction from "./transaction.entity";

@Table
export default class Customer extends Model<Customer> {
    @Index
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Index
    @Column({
        type: DataType.STRING(3),
        allowNull: false,
    })
    currency: string;

    @HasMany(() => Transaction)
    transaction: Transaction;
}

