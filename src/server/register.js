import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const password = '2NaFFZAQgd0GLCfG'
const uri = `mongodb+srv://varunJatav1998:${password}@studentscluster.lnrn49o.mongodb.net/?retryWrites=true&w=majority/`;
// mongodb+srv://varunJatav1998:<password>@studentscluster.lnrn49o.mongodb.net/?retryWrites=true&w=majority
//2NaFFZAQgd0GLCfG

const registrationSchema = new mongoose.Schema({
    name: String,
    date: String,
    age: String,
    gender: String,
    address:String,
    courses: String
});

const Registration = mongoose.model('registrations', registrationSchema);
var postedData = [];
async function main() {
    try{
        await mongoose.connect(uri);
        //  await Registration.insertMany(student1);
        console.log(`MongoDB host: ${mongoose.connection.host}`);
        // console.log(data);
        server.post('/demo',async (req,res)=> {
            try {
                let registration = new Registration();
                registration.name = req.body.name;
                registration.date = req.body.date;
                registration.age = req.body.age;
                registration.gender = req.body.gender;
                registration.address = req.body.address;
                registration.courses = req.body.courses;
                console.log("Registration Obj : ",registration);
                
                const doc = await registration.save();
                postedData.push(doc);
                console.log("doc :", doc);
                res.json(doc);
            } catch (error) {
                console.error("Error saving registration data:", error);
                res.status(500).json({ error: "Failed to save registration data" });
            }
         
            // console.log(res);
        })
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
    } 
}

main();

const server = express();
const port = 3000;
server.use(cors());

server.use(bodyParser.json());


server.get('/demo',(req,res) => {
    res.json(postedData);
})
server.listen(port, () => {
    console.log(`Successfully running on port ${port}`);
});
