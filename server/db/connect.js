import mongoose from "mongoose";
import 'dotenv/config'
const connectDB = async () => {
  return mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING).catch(e => console.log(e));
}
export default connectDB;