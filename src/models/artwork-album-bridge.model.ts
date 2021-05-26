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
	tableName: 'artwork_album_bridge',
	underscored: true,
	timestamps: false,
})
export class ArtworkAlbumBridge extends Model {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	idx!: number;

	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	albumIdx!: number;

	@AllowNull(false)
	@Column(DataType.INTEGER.UNSIGNED)
	artworkIdx!: number;
}
