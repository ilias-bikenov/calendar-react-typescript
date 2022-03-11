import mongoose from "mongoose";
import 'dotenv/config'
const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING,
      () => console.log('Connected to MongoDB'))
    .catch((e) => console.log(e));
}
export default connectToDB;