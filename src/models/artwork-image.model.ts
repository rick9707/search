import { NOW } from 'sequelize';
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
	tableName: 'artwork_image',
	underscored: true,
	timestamps: false,
})
export class ArtworkImage extends Model {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	idx!: number;

	@AllowNull(false)
	@Column(DataType.TEXT)
	originImagePath!: string;

	@Column(DataType.TEXT)
	scanImagePath!: string;

	@Default(0)
	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	sequence!: number;

	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	artworkIdx!: number;
}
