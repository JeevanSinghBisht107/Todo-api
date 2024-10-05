import "dotenv/config";

const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;
const JWT_SECRET = process.env.JWT_SECRET;

export { PORT,MONGODB,JWT_SECRET };