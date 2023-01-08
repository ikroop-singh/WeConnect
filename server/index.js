import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from "./routes/posts.js";

const port = 5000;
const app = express();

app.use(bodyParser.json({ limit: '300mb'}));
app.use(bodyParser.urlencoded({ limit: '300mb', extended: true }));
app.use(cors());

//routes 
app.use('/posts',postRoutes);

const connection_url = 'mongodb+srv://ikroopsingh:123@cluster0.nh2tqlf.mongodb.net/weconnect?retryWrites=true&w=majority'; 
mongoose.connect(connection_url).then(() => {
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
  })
}).catch((err) => {
  console.log(err.message)
});

