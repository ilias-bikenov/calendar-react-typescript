import 'dotenv/config'
import express from 'express';
import connectDB from './db/connect.js';
import usersRoutes from './routes/usersRoutes.js'
import eventsRoutes from './routes/eventsRoutes.js'

const PORT = process.env.PORT || 5000;

const app = express();

//middleware
app.use(express.json())

//routes
app.use('/users', usersRoutes);
app.use('/events', eventsRoutes);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();