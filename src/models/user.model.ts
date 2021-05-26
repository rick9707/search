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
	tableName: 'user',
	underscored: true,
	timestamps: false,
})
export class User extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER.UNSIGNED)
	idx!: number;

	@AllowNull(false)
	@Column(DataType.CHAR)
	email!: string;

	@AllowNull(false)
	@Column(DataType.CHAR)
	name!: string;

	@Column(DataType.CHAR)
	birthDate!: string;

	@Default('N')
	@Column(DataType.CHAR(1))
	gender!: string;

	@Column(DataType.CHAR(13))
	phone!: string;

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
