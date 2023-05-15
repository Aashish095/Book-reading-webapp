import { createClient } from "redis";

const redisUrl = 'redis://172.20.0.3:6379';

// Create Redis client instance
const redisClient = createClient({
  url: redisUrl
});

// Connect to Redis
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('? Redis client connected');
    redisClient.set(
      'tRPC', 
      'Welcome to Book Store🤗🕵️‍♀️👨‍💻'
    );
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }
};

// Call connectRedis to establish the connection
connectRedis();

// Log Redis errors
redisClient.on('error', (err) => console.log(err));

export default redisClient;
