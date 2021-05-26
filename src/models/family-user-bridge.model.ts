import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
	AllowNull,
} from 'sequelize-typescript';

@Table({
	tableName: 'family_user_bridge',
	underscored: true,
	timestamps: false,
})
export class FamilyUserBridge extends Model {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	idx!: number;

	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	familyIdx!: number;

	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	userIdx!: number;
}
