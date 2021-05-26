import { NOW } from 'sequelize';
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    CreatedAt,
    Default,
} from 'sequelize-typescript';

@Table({
    tableName: 'family_deep_link',
    underscored: true,
    timestamps: false,
})
export class FamilyDeepLink extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    idx!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    familyIdx!: number;

    @AllowNull(false)
    @Column(DataType.CHAR)
    hashCode!: string;

    @AllowNull(false)
    @Column(DataType.CHAR)
    uuid!: string;

    @AllowNull(false)
    @Column(DataType.CHAR)
    salt!: string;

    @Default(true)
    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    enable!: boolean;

    @Default(NOW)
    @AllowNull(false)
    @Column(DataType.DATE)
    updateAt!: Date;

    @Default(NOW)
    @AllowNull(false)
    @CreatedAt
    @Column(DataType.DATE)
    createAt!: Date;

}
