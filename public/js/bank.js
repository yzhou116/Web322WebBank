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
function submitForm(){

  
  const radios = document.querySelectorAll('input[name="account"]')
  var selected;
  for (const ra of radios) {
      if (ra.checked) {
        selected = ra.value;
          break;
      }
  }
  console.log(selected)
 
  if (selected == "balance")
  {
     document.getElementById("bankform").action="/bal";
  }else if(selected =="deposit"){
    document.getElementById("bankform").action="/accd";
  }else if(selected =="withdrawal"){
    document.getElementById("bankform").action="/accw";
  }else if(selected == "openaccount"){
    document.getElementById("bankform").action="/aopn";
  }
  
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
function Type(type) {

 document.getElementById("openbtn").disabled=false;
  document.getElementById("type").value = type;
}




