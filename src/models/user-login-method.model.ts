import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
	AllowNull,
	Default,
} from 'sequelize-typescript';

@Table({
	tableName: 'user_login_method',
	underscored: true,
	timestamps: false,
})
export class UserLoginMethod extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.INTEGER.UNSIGNED)
	idx!: number;

	@Column(DataType.TEXT)
	socialId!: string;

	@Column(DataType.TEXT)
	fbUid!: string;

	@Column(DataType.CHAR(4))
	method!: string;

	@Default(true)
	@AllowNull(false)
	@Column(DataType.BOOLEAN)
	enable!: boolean;

	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	userIdx!: number;
}
