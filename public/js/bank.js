function Textswitch(text)
{
    var display = document.getElementById('text_display');
    display.innerHTML = "";
    display.innerHTML = text;
}
function SwtichBack(text)
{
    var display = document.getElementById('text_display');
    display.innerHTML = "";
    display.innerHTML = text;
}
function myLogout() {
 
  document.getElementById("logout").action = "/logout";
  
}

function Deposit(){

  var account= document.getElementById("Deposit").getAttribute("value");
      
  document.getElementById("account").value= account;

  document.getElementById("depositform").action="/deposit";
   
}
function Withdrawal(){

    
  var account= document.getElementById("Account").getAttribute("value");
      
  document.getElementById("account").value= account;

  document.getElementById("withdrawalform").action="/withdrawal";
   
} 




