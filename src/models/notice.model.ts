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
	tableName: 'notice',
	underscored: true,
	timestamps: false,
})
export class Notice extends Model {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	idx!: number;

	@AllowNull(false)
	@Column(DataType.CHAR)
	title!: boolean;

	@AllowNull(false)
	@Column(DataType.TEXT)
	content!: string;

	@Default(true)
	@AllowNull(false)
	@Column(DataType.BOOLEAN)
	visible!: boolean;

	@Default(true)
	@AllowNull(false)
	@Column(DataType.BOOLEAN)
	enable!: boolean;

	@AllowNull(false)
	@Column(DataType.CHAR)
	writer!: boolean;

	@Default(NOW)
	@AllowNull(false)
	@CreatedAt
	@Column(DataType.DATE)
	createAt!: Date;
}
