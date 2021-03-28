const HTTP_PORT= process.env.PORT || 3000;

const express= require("express");
const exphbs= require('express-handlebars');
const path= require("path");
const bodyParser= require("body-parser");
const fs=require("fs");
const e = require("express");
const session = require("client-sessions");
const mongoose = require('mongoose')
const app= express();
const data = require('./reader')
const router = express.Router();
const users = data.readData('./user.json')
var accounts = data.readData('./accounts.json')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine("hbs", exphbs({
    extname:"hbs",
    defaultLayout:false,
    layoutsDir: __dirname + '/views/layouts',
    partialsDir  : [
        path.join(__dirname, '/views/partial'),
    ]
    }));
app.set("view engine", "hbs");
app.use(express.static('public'));
/* app.use(session({

  secret: "weird sheep",

  resave: false,

  saveUninitialized: true,

  cookie: {user:"default",maxAge: 14*24*60*60*1000}
}));
 */
app.use(session({

  cookieName: 'session', 
	secret: 'somecrazykeythatyoushouldkeephidden', 
	duration: 60 * 60 * 1000, 
	activeDuration: 1000 * 60 * 5,
}));
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://yi_zhou:sd4888101@mongodbatlas.4anqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
const collections = client.db("mongodatabase").collection("web322");
collections.find({}).toArray((err, result) => {
  /*   console.log(result) */
 /*  console.log(collection)
    console.log(result) */
  })

//client.close();
});




var userinfo = {
    email:"",
    account:"",
    cheque :"",
    savings:"",
    hasboth: false,
    hascheque: false,
    hassavings: false,
    hasnone:false,
    text:""
  }
/*   "/verify", */
  router.post("/",(req,res)=>{
 
    email = req.body.email;
    var passcheck = false;
   /*  console.log(users)
    console.log(accounts) */
     const password = req.body.password;
     if(email != undefined && password != undefined){
         if(email.trim().length == 0 || password.trim().length==0){
             res.render("login",{body:"UserName or Password is empty"});
             return;
         }
     }
  /*    let found = users.find(user => user.email === req.body.email&&user[email]===password) */
     for(var key in users){
      /*  console.log(key)
       console.log(users[key]) */
       if(key == email && users[key] == password){
         userinfo.email = key
          passcheck = true;
          break;
       }else if(key==email && users[key] != password){
         res.render("login",{body:"Wrong Password"})
         return;
       }else if(key!=email && users[key] == password){
         res.render("login",{body:"Wrong Username"})
         return;
       }
     }
     if(!passcheck){
      
         res.render("login",{body:"Wrong UserName Or Password"})
         return;
       
     }
 
     if(passcheck == true){
       req.session.user = email
      client.db("mongodatabase").collection("web322").find({}).toArray((err, result) => {
       
         for(var key1 in result){
           if(result[key1].Username ==req.session.user ){
             userinfo.cheque = result[key1].Chequing
             userinfo.savings = result[key1].Savings
       
             break
            }
         }
         if(userinfo.cheque.length!=0 &&userinfo.savings.length!=0 ){
           userinfo.hasboth = true
         }else{
           userinfo.hasboth = false
         }
         console.log(userinfo)
       userinfo.text=''
      res.render("bankmain",{body:userinfo});
      return;
       
       })
 /*       db.close(); */
 
 
  /*  console.log(userinfo.hasboth) */
 
     }   
 });
 module.exports = router;