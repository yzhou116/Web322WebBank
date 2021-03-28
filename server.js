const HTTP_PORT= process.env.PORT || 3000;
const course=require("./user.json");
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
const users = data.readData('./user.json')
var accounts = data.readData('./accounts.json')
const verifymodule = require('./verify')
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
 
/* const MongoClient = require("mongodb").MongoClient;							//	require MongoDB and create MongoClient object
const url = "mongodb://localhost:27017/mongodatabase";
const client =  MongoClient.connect(url);
db = client.db('mongodatabase');
/* mongoose.connect("mongodb+srv://yi_zhou:sd4888101@mongodbatlas.4anqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true  });
const db = mongoose.connection


db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Database'))
const col = db.db("mongodatabase")
console.log(col) */



var email

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

app.use('/verify', verifymodule)

/* app.post("/verify",  (req,res)=>{
   email = req.body.email;
   var passcheck = false;
    const password = req.body.password;
    if(email != undefined && password != undefined){
        if(email.trim().length == 0 || password.trim().length==0){
            res.render("login",{body:"UserName or Password is empty"});
            return;
        }
    }

    for(var key in users){
    
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

    }

     
}); */
app.post("/checkchoice",(req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }

  var account= req.body.accountNumber;
  console.log(account)
  accounts = data.readData('./accounts.json')

 // console.log(req.body)
  var type = req.body.account;
  /* console.log(type) */
 
  //console.log(accountnumber)
  var balanceinfo = []
  for(var key in accounts){
    if(account == key){
     balanceinfo = {
       number: account,
       type: accounts[key].accountType,
       amount: accounts[key].accountBalance
     }
     break
    }
 }
 console.log(balanceinfo.number)
 console.log(balanceinfo.type)
 console.log(balanceinfo.amount)
  if(type=='balance'){
    if(balanceinfo.number==null){
      userinfo.text = 'You do not have account'
      userinfo.email = req.session.user
      res.render('bankmain',{body:userinfo})
      return
    }
   
  //  var accountnumber = req.body.accountNumber
  //  console.log(accountnumber)
 
    res.render('balance',{body: balanceinfo})
    
  }else if(type == 'deposit'){
    if(balanceinfo.number==null){
      userinfo.text = 'You do not have account'
      userinfo.email = req.session.user
      res.render('bankmain',{body:userinfo})
      return
    }

      res.render('deposit',{body: balanceinfo})
     
   }else if(type == 'withdrawal'){
    if(balanceinfo.number==null){
      userinfo.text = 'You do not have account'
      userinfo.email = req.session.user
      res.render('bankmain',{body:userinfo})
      return
    }
    res.render('witidraw',{body: balanceinfo})
    
   }else if(type=='openaccount'){
    /* db.collection("web322") */client.db("mongodatabase").collection("web322").find({}).toArray((err, result) => {
      /*   console.log(result) */
        for(var key1 in result){
          if(result[key1].Username ==req.body.email){
            userinfo.cheque = result[key1].Chequing
            userinfo.savings = result[key1].Savings
           
            break
           }
        }
      })
  
      balanceinfo.hasnone= false
      balanceinfo.cheque= false
      balanceinfo.hassavings= false
      if(userinfo.cheque.length == 0&&userinfo.savings.length==0){
        balanceinfo.hasnone = true
        console.log(balanceinfo.hasnone)
        res.render('openaccount',{body: balanceinfo})
       
      }else if(userinfo.cheque.length!=0){
        balanceinfo.hassavings = true
        console.log(balanceinfo.hascheque)
        res.render('openaccount',{body: balanceinfo})
     
      }else{
        balanceinfo.hascheque = true
        console.log(balanceinfo.hassavings)
      }
       res.render('openaccount',{body: balanceinfo})
   }
   if(type!= 'balance'&& type!= 'openaccount'&& type!='withdrawal'&& type!= 'deposit' ){
    userinfo.text="Invalid Chioce"
    res.render('bankmain',{body: userinfo})
   }
   console.log("finish")
   
 /*   else{
     userinfo.text="Invalid Chioce"
     res.render('bankmain',{body: userinfo})
     return;
   }  */
})


app.post("/deposit",(req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }
  userinfo.text=''
  let account = req.body.account
  let deposit = req.body.deposit
  var balanceinfo = []

  if(isNaN(deposit) || deposit.length==0){
    fs.readFile("./accounts.json","utf-8",(err,accountinfo)=>{
      var info = JSON.parse(accountinfo)
     
      for (var key in info){
        if(account == key){
          balanceinfo = {
            number: account,
            type: info[key].accountType,
            amount: info[key].accountBalance,
            text: "Invalid Number"
          }
          break;
        }
      }
      userinfo.text=''
      res.render('deposit',{body: balanceinfo})
     })
    return

  }else{
    fs.readFile("./accounts.json","utf-8",(err,accountinfo)=>{
      var info = JSON.parse(accountinfo)
      for(var key in info){
        if(account == key){
          amount = parseFloat(info[key].accountBalance) + parseFloat(deposit)
          
            balanceinfo = {
              number: account,
              type: info[key].accountType,
              amount: info[key].accountBalance,
              text: ""
            }
           /*  res.render("bankmain",{body:balanceinfo}) */
            info[key].accountBalance  = amount.toFixed(2)
            info[key].accountBalance  = parseFloat(info[key].accountBalance)
            var newFile = JSON.stringify(info,null,4)
            console.log('dddd')
            console.log(newFile)
            fs.writeFile("./accounts.json", newFile,(err)=>{
              userinfo.account = ""
              userinfo.email = req.session.user
              userinfo.text=''
              res.render("bankmain",{body:userinfo})
            })
            break
        }
      }
      return
    })

  }

})
/* account widthdraw */

app.post("/withdrawal",(req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }
  userinfo.text=''
  let account = req.body.account
  let withdrawal = req.body.withdrawal

  var balanceinfo = []
 
  if(isNaN(withdrawal) || withdrawal.length==0){
    fs.readFile("./accounts.json","utf-8",(err,accountinfo)=>{
      var info = JSON.parse(accountinfo)
     
      for (var key in info){
        if(account == key){
          balanceinfo = {
            number: account,
            type: info[key].accountType,
            amount: info[key].accountBalance,
            text: "Invalid Number"
          }
          break;
        }
      }
      res.render('witidraw',{body: balanceinfo})
     })
    return
  }else{
    fs.readFile("./accounts.json","utf-8",(err,accountinfo)=>{
      var info = JSON.parse(accountinfo)
      for(var key in info){
        if(account == key){
          amount = info[key].accountBalance - withdrawal
          if(amount < 0){
            balanceinfo = {
              number: account,
              type: info[key].accountType,
              amount: info[key].accountBalance,
              text: "Insufficient Funds"
            }
            res.render("witidraw",{body:balanceinfo})
            break;
          }else{
            info[key].accountBalance  = amount.toFixed(2)
            info[key].accountBalance  = parseFloat(info[key].accountBalance)
            var newFile = JSON.stringify(info,null,4)
            console.log(newFile)
            fs.writeFile("./accounts.json", newFile,(err)=>{
              userinfo.account = ""
              userinfo.email = req.session.user
              userinfo.text=''
              res.render("bankmain",{body:userinfo})
            })
            break
          }
        }
      }
      return
    })
  }
 
})
/* open account */

app.post("/account", (req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }
  userinfo.text=''
  var mtype = req.body.type
  var account = {
    "accountType" : mtype,
    "accountBalance" : 0
  }
  var newOne = ""
 
  fs.readFile("./accounts.json","utf-8", (err,accountinfo)=>{
  var info= JSON.parse(accountinfo)
   var num = +info.lastID +1
    num = num.toString()
    var len = info.lastID.length - num.length -1
    
    for(var i = 0; i < len; i++){
      newOne= newOne+"0"
    }
    newOne = newOne + num
   info[newOne] = account
   info.lastID=newOne;
  /*  console.log(info) */
   fs.writeFile("./accounts.json", JSON.stringify(info,null,4),(err)=>{
    
    })
    if(mtype=="Savings"){
    client.db("mongodatabase").collection("web322").updateOne({Username:req.session.user}, {$set: {"Savings":newOne}})
      userinfo.text = mtype + " " + "Account" + "#"+newOne + " Created"
      userinfo.savings = newOne
      userinfo.hassavings = true
      if(userinfo.cheque.length!=0){
        userinfo.hasboth= true
      }
      res.render("bankmain",{body:userinfo}) 
     }else{
     client.db("mongodatabase").collection("web322").updateOne({Username:req.session.user}, {$set: {"Chequing":newOne}})
      userinfo.text = mtype + " " + "Account" + "#"+newOne + " Created"
      userinfo.cheque = newOne
      userinfo.hassavings = true
      if(userinfo.savings.length!=0){
        userinfo.hasboth= true
      }
      res.render("bankmain",{body:userinfo}) 
     }
  })

  
})
app.get("/cancel", (req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }

  userinfo.account = ""
  userinfo.text=''
  res.render('bankmain',{body:userinfo});
});

app.get('/', (req,res)=>{
    res.render('login');
});

app.post("/logout",(req,res)=>{
  req.session.user = null
  userinfo.text=''
  res.redirect("/")

  });
const server= app.listen(HTTP_PORT, ()=>{
    console.log(`Listening on port...${HTTP_PORT}`);
});
