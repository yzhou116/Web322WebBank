const HTTP_PORT= process.env.PORT || 3000;
const course=require("./user.json");
const express= require("express");
const exphbs= require('express-handlebars');
const path= require("path");
const bodyParser= require("body-parser");
const fs=require("fs");
const e = require("express");
const session = require("client-sessions");

const app= express();
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




var email

var userinfo = {
  email:"",
  account:""
}

app.post("/check", (req,res)=>{
   email = req.body.email;
    const password = req.body.password;
    if(email != undefined && password != undefined){
        if(email.trim().length == 0 || password.trim().length==0){
            res.render("login",{body:"UserName or Password is empty"});
            return;
        }
    }
    fs.readFile("./user.json",'utf8', function (err, data) {
    var content = JSON.parse(data)
 
   for(var key in content){
  
       if(email ===key && password===content[key]){
        req.session.user = email
      //  req.session.user = email;
         userinfo.email = email
      //   req.session.isLogin = true;
        res.render("bankmain",{body:userinfo});
        return;
       }else if(email==key && password != content[key]){
        res.render("login",{body:"Wrong Passowrd"})
        return;
       }else if(email!=key && password ==content[key] ){
        res.render("login",{body:"Wrong UserName"})
        return;
       }
   }
   res.render("login",{body:"Wrong UserName And Password"})
   return;
   })
});

app.post("/bal",(req,res)=>{
  console.log(req.session.user)
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }
  var account= req.body.accountnum; 
  if(account.length < 7){
    var len = 7 - account.length
   
   var newOne = "0"
   for(var i = 0; i < len-1; i++){
     newOne= newOne+"0"
   }
   account = newOne + account

  }

  fs.readFile("./accounts.json","utf-8",(err,accountinfo)=>{
   var info = JSON.parse(accountinfo)
   var balanceinfo = []
   for (var key in info){
     if(account == key){
       balanceinfo = {
         number: account,
         type: info[key].accountType,
         amount: info[key].accountBalance
       }
       break;
     }
   }
   if(balanceinfo.type==null){
    userinfo.account = "Invalid Account"
    userinfo.email = req.session.user
    console.log(req.session.user)
    res.render("bankmain",{body:userinfo})
    return
  }
    
   res.render('balance',{body: balanceinfo})
  })
})
/* account deposit */
app.post("/accd", (req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
  }
  var account= req.body.accountnum; 
  if(account.length < 7){
    var len = 7 - account.length
   
   var newOne = "0"
   for(var i = 0; i < len-1; i++){
     newOne= newOne+"0"
   }
   account = newOne + account

  }

  fs.readFile("./accounts.json","utf-8",(err,accountinfo)=>{
    var info = JSON.parse(accountinfo)
    var balanceinfo = []
    for (var key in info){
      if(account == key){
        balanceinfo = {
          number: account,
          type: info[key].accountType,
          amount: info[key].accountBalance
        }
        break;
      }
    }
  
    if(balanceinfo.type==null){
      userinfo.account = "Invalid Account"
      userinfo.email = req.session.user
      res.render("bankmain",{body:userinfo})
      return
    }
    res.render('deposit',{body: balanceinfo})
   })
})
app.post("/deposit",(req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }
  let account = req.body.account
  let deposit = req.body.deposit
  var balanceinfo = []
  console.log(account)
  console.log(deposit)
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
            console.log(newFile)
            fs.writeFile("./accounts.json", newFile,(err)=>{
              userinfo.account = ""
              userinfo.email = req.session.user
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

app.post("/accw", (req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }
  var account= req.body.accountnum; 
  var account= req.body.accountnum; 
  if(account.length < 7){
    var len = 7 - account.length
   
   var newOne = "0"
   for(var i = 0; i < len-1; i++){
     newOne= newOne+"0"
   }
   account = newOne + account

  }
  fs.readFile("./accounts.json","utf-8",(err,accountinfo)=>{
    var info = JSON.parse(accountinfo)
    var balanceinfo = []
    for (var key in info){
      if(account == key){
        balanceinfo = {
          number: account,
          type: info[key].accountType,
          amount: info[key].accountBalance
        }
        break;
      }
    }
    if(balanceinfo.type==null){
      userinfo.account = "Invalid Account"
      userinfo.email = req.session.user
      res.render("bankmain",{body:userinfo})
      return
    }
    res.render('witidraw',{body: balanceinfo})
   })
})

app.post("/withdrawal",(req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }
  let account = req.body.account
  let withdrawal = req.body.withdrawal

  var balanceinfo = []
  console.log(account)
  console.log(withdrawal)
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
app.post("/aopn", (req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }
    res.render('openaccount',{body: email})
  
})
app.post("/account", (req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }

  fs.readFile("./accounts.json","utf-8", (err,accountinfo)=>{
    let type = req.body.type
   var  info = JSON.parse(accountinfo)
  var num = +info.lastID +1
   num = num.toString()
   var len = info.lastID.length - num.length -1
   var newOne = "0"
   for(var i = 0; i < len; i++){
     newOne= newOne+"0"
   }
   newOne = newOne + num
   var account = {
    "accountType" : type,
    "accountBalance" : 0
  }

  info[newOne] = account
  info.lastID=newOne;

   fs.writeFile("./accounts.json", JSON.stringify(info,null,4),(err)=>{
    userinfo.account = type + " " + "Account" + "#"+newOne + " Created"
    userinfo.email = req.session.user
    res.render("bankmain",{body:userinfo})
   })

  })
  
})
app.get("/cancel", (req,res)=>{
  if(req.session.user==null){
    res.render("login",{body:"Login First"})
    return
  }

  userinfo.account = ""
  res.render('bankmain',{body:userinfo});
});

app.get('/', (req,res)=>{
    res.render('login');
});

app.post("/logout",(req,res)=>{
  req.session.user = null
  res.redirect("/")
/*   req.session.destroy(function(){

    res.clearCookie("user",{});

    res.cookie("isLogin","false");

    res.redirect("/");

}); */
   // res.render("login");
  });
const server= app.listen(HTTP_PORT, ()=>{
    console.log(`Listening on port...${HTTP_PORT}`);
});
