var URLAREAGOURMET = "http://192.168.29.202/";
var URLSALA        = "http://192.168.29.201/";



var reloadInterval = 10100;

var AsyncLockGourmet = 0;
var AsyncLockSala = 0;
var CommandInQueueGourmet='';
var CommandInQueueSala   ='';


function callAreaGourmet(str) {
  var url = URLAREAGOURMET + str;
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send(null);  
    return;
}

function callSala(str) {
  var url = URLSALA + str;
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send(null);  
    return;
}

function callAreaGourmetJSON(str) {
  var url = URLAREAGOURMET + str;
  var request = new XMLHttpRequest();
  console.log(url);
  request.open("GET", url, false);
  request.send(null); 
  console.log(request.responseText);
  return JSON.parse(request.responseText);
}

function callSalaJSON(str) {
  var url = URLSALA + str;
  var request = new XMLHttpRequest();
  console.log(url);
  request.open("GET", url, false);
  request.send(null); 
  console.log(request.responseText);
  return JSON.parse(request.responseText);
}

function setChurrasqueiraDisabled(disable=true) {
  Estrada      .disabled = disable;
  JardimGourmet.disabled = disable;
  Gourmet      .disabled = disable;
  Piscina      .disabled = disable;
  Amplificador .disabled = disable;
}

function setSalaDisabled(disable=true) {
  Entrada   .disabled = disable;
  Varanda   .disabled = disable;
  AmplSala  .disabled = disable;
}

function callAreaGourmetJSONAsync(str="STATUS") {
    if (AsyncLockGourmet>0) {
        AsyncLockGourmet ++;
        if (AsyncLockGourmet < 5) {
          //console.log("Incrementing AsyncLockGourmetin "+sw+": " + AsyncLockGourmet);
          if (str!="STATUS") {
              //console.log("saved command: "+str);
              CommandInQueue = str;
          }
          return;
        }
        console.log("Missed response in "+sw+": recovered from lost AsyncLockGourmet:" + AsyncLockGourmet);
    }
    
    AsyncLockGourmet = 1;   
    CommandInQueueGourmet = "";
    
  var url = "";
  url = URLAREAGOURMET + str;

  var request = new XMLHttpRequest();
    request.timeout = 5000;

    request.onload = function() {
        //console.log("Load");
        AsyncLockGourmet = 0;
        if(request.readyState==4)
          if (request.status==200) {
            var params = JSON.parse(request.responseText);
            var editItems = document.querySelectorAll("input");
            for (var i = 0; i <= editItems.length-1; i++) {
              x = params[editItems[i].id];
              console.log("id "+i+": "+editItems[i].id +"-->"+x);
              if (x==1)
                editItems[i].checked=true;
              else if (x==0)
                editItems[i].checked=false;
            }
            setChurrasqueiraDisabled(false);
          }
          else
              content = '';
        
        if (CommandInQueueGourmet!="") {
          //console.log("Recursed for queued command: "+CommandInQueueGourmet);
          callChurrasqueiraJSONAsync(CommandInQueueGourmet);
        }
    };
    request.ontimeout = function() {
        console.log("Timed out");
        setChurrasqueiraDisabled(false);
        AsyncLockGourmet = 0;
    };

    setChurrasqueiraDisabled(true);
    request.open("GET", url, true); 
    console.log(url);
    request.send(null);  
}

function callSalaJSONAsync(str="STATUS") {
    if (AsyncLockSala>0) {
        AsyncLockSala ++;
        if (AsyncLockSala < 5) {
          //console.log("Incrementing AsyncLockSalain "+sw+": " + AsyncLockSala);
          if (str!="STATUS") {
              //console.log("saved command: "+str);
              CommandInQueue = str;
          }
          return;
        }
        console.log("Missed response in "+sw+": recovered from lost AsyncLockSala:" + AsyncLockSala);
    }
    
    AsyncLockSala = 1;   
    CommandInQueueSala = "";
    
  var url = "";
  url = URLSALA + str;

  var requestSala = new XMLHttpRequest();
    requestSala.timeout = 5000;

    requestSala.onload = function() {
        //console.log("Load");
        AsyncLockSala = 0;
        if(requestSala.readyState==4)
          if (requestSala.status==200) {
            var params = JSON.parse(requestSala.responseText);
            var editItems = document.querySelectorAll("input");
            for (var i = 0; i <= editItems.length-1; i++) {
              x = params[editItems[i].id];
              console.log("id "+i+": "+editItems[i].id +"-->"+x);
              if (x==1)
                editItems[i].checked=true;
              else if (x==0)
                editItems[i].checked=false;
            }
            setSalaDisabled(false);
          }
          else
              content = '';
        
        if (CommandInQueueSala!="") {
          //console.log("Recursed for queued command: "+CommandInQueueSala);
          callSalaJSONAsync(CommandInQueueSala);
        }
          
            
    };
    requestSala.ontimeout = function() {
        console.log("Timed out");
        setSalaDisabled(false);
        AsyncLockSala = 0;
    };

    setSalaDisabled(true);
    requestSala.open("GET", url, true); 
    console.log(url);
    requestSala.send(null);  
}



function RenderAreaGourmetSwitches() {
  console.log("render Churrasqueira");
  callAreaGourmetJSONAsync();
};

function RenderSalaSwitches() {
  console.log("render sala");
  callSalaJSONAsync();
};


function SaveAreaGourmetSwitch(name="") {
  var editItem = document.getElementById(name);
  var chk = editItem.checked;
  console.log("ID: "+editItem.id+"  name: "+editItem.name+ "  edit: "+chk);
  var s = "."+editItem.name + (chk?'1':'0');
  console.log("changing: "+s);
  callAreaGourmetJSONAsync(s);
};

function SaveSalaSwitch(name="") {
  var editItem = document.getElementById(name);
  var chk = editItem.checked;
  console.log("ID: "+editItem.id+"  name: "+editItem.name+ "  edit: "+chk);
  var s = "."+editItem.name + (chk?'1':'0');
  console.log("changing: "+s);
  callSalaJSONAsync(s);
};




