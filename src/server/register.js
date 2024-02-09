import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  console.log('db connected');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

const server = express();
const port = 3000;
server.use(cors());

server.use(bodyParser.json());
var postedData = [];
server.post('/demo',async (req,res)=> {

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    const doc = await user.save();
    postedData.push(doc);
    console.log(doc);
    res.json(req.body);
})
server.get('/demo',(req,res) => {
    res.json(postedData);
})
server.listen(port, () => {
    console.log(`Successfully running on port ${port}`);
});