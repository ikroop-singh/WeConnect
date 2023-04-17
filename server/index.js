import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from "./routes/posts.js";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
const app = express();

dotenv.config();

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL; 
app.use(cors());

app.use(express.json()); 
app.use(bodyParser.json({ limit: '300mb'}));
app.use(bodyParser.urlencoded({ limit: '300mb', extended: true }));

//routes 
app.use('/posts',postRoutes);
app.use('/auth',authRoutes);
app.use('/users',userRoutes);

mongoose.connect(CONNECTION_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.log(err.message)
});

