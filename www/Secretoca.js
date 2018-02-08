var URLAREAGOURMET = "http://192.168.29.202/";



var oldAV;
var noOH = -998;
var reloadInterval = 10100;

var AsyncLock = 0;
var AV='';
var JSON_Todo='';
var CommandInQueue='';


function callAreaGourmet(str) {
  var url = URLAREAGOURMET + str;
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

function setChurrasqueiraDisabled(disable=true) {
  Estrada      .disabled = disable;
  JardimGourmet.disabled = disable;
  Gourmet      .disabled = disable;
  Piscina      .disabled = disable;
  Amplificador .disabled = disable;
}

function callAreaGourmetJSONAsync(str="STATUS") {
    if (AsyncLock>0) {
        AsyncLock ++;
        if (AsyncLock < 5) {
          //console.log("Incrementing Asynclock: " + AsyncLock);
          if (str!="STATUS") {
              //console.log("saved command: "+str);
              CommandInQueue = str;
          }
          return;
        }
        console.log("Missed response: recovered from lost AsyncLock:" + AsyncLock);
    }
    
    AsyncLock = 1;    
    CommandInQueue = "";
  var url = URLAREAGOURMET + str;

  var request = new XMLHttpRequest();
    request.timeout = 5000;

    request.onload = function() {
        //console.log("Load");
        AsyncLock = 0;
        if(request.readyState==4)
          if (request.status==200) {
            var params = JSON.parse(request.responseText);
            var editItems = document.querySelectorAll("input");
            for (var i = 0; i <= editItems.length-1; i++) {
              x = params[editItems[i].id];
              console.log("id "+i+": "+editItems[i].id +"-->"+x);
              editItems[i].checked=(x==1);
            }
            setChurrasqueiraDisabled(false);
          }
          else
              content = '';
            
        if (CommandInQueue!="") {
          //console.log("Recursed for queued command: "+CommandInQueue);
          callAreaGourmetJSONAsync(CommandInQueue);
        }
            
    };
    request.ontimeout = function() {
        console.log("Timed out");
        setChurrasqueiraDisabled(false);
        AsyncLock = 0;
    };

    setChurrasqueiraDisabled(true);
    request.open("GET", url, true); 
    console.log(url);
    request.send(null);  
}



function RenderAreaGourmetSwitches() {
  callAreaGourmetJSONAsync();
};

function SaveAreaGourmetSwitch(name="") {
  var editItem = document.getElementById(name);
  var chk = editItem.checked;
  console.log("ID: "+editItem.id+"  name: "+editItem.name+ "  edit: "+chk);
  var s = "."+editItem.name + (chk?'1':'0');
  console.log("changing: "+s);
  callAreaGourmetJSONAsync(s);
};





function SaveAreaGourmetSwitches() {
  var params=callAreaGourmetJSON("STATUS");
  var editItems = document.querySelectorAll("input");
  for (var i = 0; i <= editItems.length-1; i++) {
    var chk = editItems[i].checked;
    var prm = params[editItems[i].id]==1;
    console.log("ID: "+editItems[i].id+"  name: "+editItems[i].name+ "  edit: "+chk+"   params: "+prm);
    if (chk != prm) {
      var s = editItems[i].name+(1-prm);
      console.log("changing: "+s);
      callAreaGourmet(s);
    }
  }
  RenderAreaGourmetSwitches();
};



