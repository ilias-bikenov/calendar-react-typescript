import 'dotenv/config'
import express from 'express';
import connectToDB from './db/connect.js';
import usersRoutes from './routes/usersRoutes.js'

const PORT = process.env.PORT || 5000;

const app = express();

//middleware
app.use(express.json())

//routes
app.use('/users', usersRoutes);

connectToDB();
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));