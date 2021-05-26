/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';

// Setup command line options
const options = commandLineArgs([
	{
		name: 'env',
		alias: 'e',
		defaultValue: 'dev',
		type: String,
	},
]);

// Set the env file
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const result = dotenv.config({
	path: `./env/${options.env}.env`,
});
if (result.error) {
	throw result.error;
} else {
	console.log(`env ok ./env/${options.env}.env`);
}
