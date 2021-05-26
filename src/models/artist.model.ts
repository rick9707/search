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
	tableName: 'artist',
	underscored: true,
	timestamps: false,
})
export class Artist extends Model {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	idx!: number;

	@AllowNull(false)
	@Column(DataType.CHAR)
	name!: string;

	@AllowNull(false)
	@Column(DataType.CHAR(1))
	gender!: string;

	@Column(DataType.CHAR(10))
	birthDate!: string;

	@Column(DataType.TEXT)
	profilePath!: string;

	@Default(true)
	@AllowNull(false)
	@Column(DataType.BOOLEAN)
	enable!: boolean;

	@Default(0)
	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	sequence!: number;

	@Default(NOW)
	@AllowNull(false)
	@Column(DataType.DATE)
	updateAt!: Date;

	@Default(NOW)
	@AllowNull(false)
	@CreatedAt
	@Column(DataType.DATE)
	createAt!: Date;

	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	familyIdx!: number;
}
