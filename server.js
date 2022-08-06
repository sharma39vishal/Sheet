const express = require("express");
const dotenv = require('dotenv').config();
const app= express();
const mongoose=require('mongoose');
const URI = process.env.MONGODB_URL;
app.use(express.json())
app.use(express.urlencoded())

mongoose.connect(URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
},() => {
    console.log("Database connected")
})

const questionSchema = new mongoose.Schema({
    link:String,
    name:String,
    tag:String
})
const Question = new mongoose.model("Question", questionSchema)

app.get('/getquestions',(req, res)=>{
    Question.find(function(err,Question) {
        if (err) {
            console.log(err);
        } else {
            res.json(Question);
        }
    });
}); 

app.post("/addquestion", (req, res)=> {
    const { name,tag,link} = req.body
            const question = new Question({
               link,
               name,
               tag
            })
            question.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Content Was Uploaded" })
                }
            })        
})

app.post("/deletequestion", (req, res)=> {
    const {name} = req.body
            Question.deleteOne({name:name}, (err,result)=>{
                if (err) {
                  res.send(err);
                } else {
                  res.json(result);
                }
        });
})


const PORT=process.env.PORT||9002;

// to deploy
// if(process.env.NODE_ENV=="production"){
    // app.use(express.static("build"));
    // const path = require("path");
    // app.get("*",(req,res)=>{
    //     res.sendFile(path.resolve('build','index.html'));
    // })
// }

app.listen(PORT,() => {
    console.log('Backend was connected at port ',PORT);
})