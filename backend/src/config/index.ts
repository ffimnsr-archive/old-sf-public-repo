export let secret = process.env.NODE_ENV === "production" ? process.env.SECRET : "secret";
export let mongoUri = process.env.MONGODB_URI || "mongodb://root:secret@localhost/smartfunding?authSource=admin";
export let redisUri = process.env.REDIS_URI || "redis://localhost/0";
export let baseUri = process.env.BASE_URI || "http://localhost:4444";
export let walletWIF = process.env.WALLET_WIF || "";
