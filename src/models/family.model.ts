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
	tableName: 'family',
	underscored: true,
	timestamps: false,
})
export class Family extends Model {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	idx!: number;

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
	leaderUserIdx!: number;
}
