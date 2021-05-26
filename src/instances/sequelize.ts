import { Sequelize } from 'sequelize-typescript';
import '@utils/load-env';
import { setProcessEnv } from '@utils/common';

import { Album } from '@models/album.model';
import { Artist } from '@models/artist.model';
import { ArtworkAlbumBridge } from '@models/artwork-album-bridge.model';
import { ArtworkImage } from '@models/artwork-image.model';
import { Artwork } from '@models/artwork.model';
import { FamilyUserBridge } from '@models/family-user-bridge.model';
import { Family } from '@models/family.model';
import { Notice } from '@models/notice.model';
import { UserLoginMethod } from '@models/user-login-method.model';
import { User } from '@models/user.model';
import { FamilyDeepLink } from '@models/family-deep-link.model';

setProcessEnv();

const modelPath = __dirname.replace('instances', 'models/*.model.ts');

export const sequelize = new Sequelize({
	host: process.env.MYSQL_HOST,
	database: process.env.MYSQL_DATABASE_NAME,
	dialect: 'mysql',
	dialectOptions: { decimalNumbers: true },
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	pool: {
		max: 20,
		min: 5,
		idle: 60000,
	},
	logging: true,
	define: {
		timestamps: false,
	},
	models: [modelPath],
	modelMatch: (filename, member) => {
		return (
			filename
				.substring(0, filename.indexOf('.model'))
				.replace(/-/gi, '') === member.toLowerCase()
		);
	},
});

sequelize.addModels([
	Album,
	Artist,
	ArtworkAlbumBridge,
	ArtworkImage,
	Artwork,
	FamilyUserBridge,
	Family,
	Notice,
	UserLoginMethod,
	User,
	FamilyDeepLink,
]);

void sequelize.databaseVersion().then((version: string) => {
	console.log('MariaDB Version : ' + version);
	console.log(__dirname, '../models');
	console.log(modelPath);
});

void sequelize
	.authenticate()
	.then(() => {
		console.log('MariaDB Connection has been established successfully.');
	})
	.catch(function (err) {
		console.log('Unable to connect to the database:', err);
	});
