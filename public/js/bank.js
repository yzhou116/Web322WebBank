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
/* function Dochange(){
  var  myselect=document.getElementById("useraccountnum");
  console.log(myselect)
  var index=myselect.selectedIndex 
  document.getElementById("accountnum").getAttribute("value") = myselect.options[index].value;
} */


/* function sendtheForm(){
   console.log("get into submit")
  
  const radios = document.querySelectorAll('input[name="account"]')
  console.log(radios)
  var selected;
  for (const ra of radios) {
      if (ra.checked) {
        selected = ra.value;
          break;
      }
  }
  console.log(selected)
  var  myselect=document.getElementById("useraccountnum");
  var index=myselect.selectedIndex 
  document.getElementById("accountnum").getAttribute("value") = myselect.options[index].value;
 
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




*/
/* function Type(type) {

 document.getElementById("openbtn").disabled=false;
  document.getElementById("type").value = type;
} */
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




