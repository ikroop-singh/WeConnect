import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from "./routes/posts.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL; 
const app = express();

app.use(bodyParser.json({ limit: '300mb'}));
app.use(bodyParser.urlencoded({ limit: '300mb', extended: true }));
app.use(cors());

//routes 
app.use('/posts',postRoutes);

mongoose.connect(CONNECTION_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.log(err.message)
});

