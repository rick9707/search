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
	tableName: 'artwork',
	underscored: true,
	timestamps: false,
})
export class Artwork extends Model {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	idx!: number;

	@AllowNull(false)
	@Column(DataType.CHAR)
	title!: string;

	@Column(DataType.TEXT)
	desc!: string;

	@Column(DataType.TEXT)
	repImagePath!: string;

	@Default(false)
	@AllowNull(false)
	@Column(DataType.BOOLEAN)
	favorite!: boolean;

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
	artistIdx!: number;

	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	familyIdx!: number;
}
