import { createClient } from '@redis/client';

const redisUrl = 'redis://localhost:6379'; // Remplacez par vos informations de connexion
const client = createClient({
  url: redisUrl,
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await client.connect();
})();

export default client;