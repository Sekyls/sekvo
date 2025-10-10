import { createClient } from "redis";

export const redis = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

export async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
    console.log("Connected to Redis Cloud");
  }
}

redis.on("error", (err) => console.log("Redis Client Error", err));
