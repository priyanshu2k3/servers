const express = require('express')
const users= require("./MOCK_DATA.json")
const mongoose = require ("mongoose")
const app = express()
const port = 3000
const fs = require('fs');


//mogodb connecting
mongoose.connect("mongodb://127.0.0.1:27017/usersDatabase")
.then(()=>{console.log("db is connected")})
.catch((e)=>console.log("error",e))

const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  jobtitle:{
    type:String,
  },
  gender:{
    type:String,
    required:true,
  },
},{timestamps:true})

const User=mongoose.model("user",userSchema)

app.use(express.urlencoded({extended:false}))


app.get('/api/users', async(req, res) => {
  const allDbUsers=await User.find({})
  //console.log(req.query)
  return res.send(allDbUsers)
})



app
.route("/api/users/:id")

.get(async (req,res) =>{
 const user=await User.findById(req.params.id);
  return res.send(user);}
)

.patch(async(req, res) => {
  const data=req.body
  console.log(data)
  return res.send("Updated")
})

.delete(async(req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json("Deleted")
})



app
.route("/api/users/")

// .post((req, res) => {
//   const body=req.body;
//   console.log(body,users.length);
//   const id=users.lenght+1;
//   users.push({id:users.length +1,...body});
//   fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
//   return res.json({id:users.length});
// })
// })

.post(async(req, res) => {
  const body=req.body;
 if(!body.first_name || !body.last_name|| !body.email|| !body.gender|| !body.job_title){
  return res.send("all data must be filled");
 }
 const result=await User.create(
  { firstName: body.first_name,
    lastName: body.last_name,
    email:  body.email,
    gender: body.gender,
    jobtitle:  body.job_title
       }
 );
 console.log("result",result);
 return res.status(201).json({msg:"success"})
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



