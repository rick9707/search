import 'module-alias/register';
import '@utils/load-env';
import errorHandler from 'errorhandler';
import app from './app';

if (process.env.NODE_ENV !== 'production') {
	app.use(errorHandler());
}

const server = app.listen(app.get('port'), () => {
	console.log(
		'  App is running at http://localhost:%d in %s modes',
		app.get('port'),
		app.get('env')
	);
	console.log('  Press!! CTRL-C to stop\n');
});

server.keepAliveTimeout = 61 * 1000;
server.headersTimeout = 65 * 1000;

console.log('current time out ::', server.timeout);
console.log('server.keepAliveTimeout', server.keepAliveTimeout);
export default server;
