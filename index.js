const express = require('express')
const users= require("./MOCK_DATA.json")
const mongoose = require ("mongoose")
const app = express()
const port = 3000



// mongoose.connect("mongodb://127.0.0.1:27017/usersDb")
// .then(()=>{console.log("db is connected")})
// .catch((e)=>console.log("error",e))
// const userSchema=new mongoose.Schema({
//   firstName:{
//     type:String,
//     required:true,
//   },
//   lastName:{
//     type:String,
   
//   },
//   email:{
//     type:String,
//     required:true,
//     unique:true,
//   },
//   jobtitle:{
//     type:String,
//   },
//   gender:{
//     type:String,
//     required:true,
//   },
// })

// const User=mongoose.model("user",userSchema)


app.get('/api/users', (req, res) => {
  console.log(req.query)
  return res.send(users)
})



app
.route("/api/users/:id")
.get( (req,res) =>{
  const id =Number(req.params.id);
  // console.log(id);
  const user=users.find((user)=>user.id===id);
  return res.send(user);}
)
.post((req, res) => {
  console.log(req.query)
  return res.send(users)
})
.patch((req, res) => {
  console.log(req.query)
  return res.send(users)
})
.delete((req, res) => {
  console.log(req.query)
  return res.send(users)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



