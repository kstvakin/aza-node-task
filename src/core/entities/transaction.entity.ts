import {
    Table,
    Column,
    Model,
    DataType,
    Index,
    HasMany,
    ForeignKey,
    BelongsTo,
    BeforeCreate
} from 'sequelize-typescript';
import Customer from "./customer.entity";

@Table
export default class Transaction extends Model<Transaction> {
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
        type: DataType.DOUBLE,
        allowNull: false,
    })
    iamount: number;

    @Index
    @Column({
        type: DataType.STRING(3),
        allowNull: false
    })
    icurrency: string;

    @Index
    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    oamount: number;

    @Index
    @Column({
        type: DataType.STRING(3),
        allowNull: false,
    })
    ocurrency: string;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    customerId: number

    @BeforeCreate
    static makeUpperCase(instance: Transaction) {
        instance.icurrency = instance.icurrency.toLocaleUpperCase().trim();
        instance.ocurrency = instance.ocurrency.toLocaleUpperCase().trim();
    }

    @BelongsTo(() => Customer)
    payment: Customer;
}

