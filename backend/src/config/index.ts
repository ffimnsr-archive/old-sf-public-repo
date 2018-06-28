export let secret = process.env.NODE_ENV === "production" ? process.env.SECRET : "secret";
export let mongoUri = process.env.MONGODB_URI || "mongodb://localhost/admin";
