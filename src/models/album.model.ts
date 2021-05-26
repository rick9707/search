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
	tableName: 'album',
	underscored: true,
	timestamps: false,
})
export class Album extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER.UNSIGNED)
	idx!: number;

	@AllowNull(false)
	@Column(DataType.CHAR)
	title!: string;

	@Column(DataType.TEXT)
	repImagePath!: string;

	@Default(1)
	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	sequence!: number;

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

	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	familyIdx!: number;
}
