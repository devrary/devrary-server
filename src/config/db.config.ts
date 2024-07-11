import { registerAs } from "@nestjs/config";

export default registerAs('db', async() => {
  return {
    uri: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_DBNAME,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    authMechanism: process.env.MONGODB_AUTH_MECHANISM,
    authSource: process.env.MONGODB_AUTH_SOURCE
  }
})