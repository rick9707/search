import { RedisClient } from 'redis';

let redisClient: RedisClient;

export const initRedisClient = (): void => {
	redisClient = new RedisClient({
		port: Number(process.env.REDIS_PORT),
		host: process.env.REDIS_HOST,
	});
	console.log(
		`Redis Client Connected => ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
	);
};

export const getRedisClient = (): RedisClient => {
	return redisClient;
};
