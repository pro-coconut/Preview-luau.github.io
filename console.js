function log(msg,type="log"){
  const c=document.getElementById("console");
  const d=document.createElement("div");
  d.style.color=type==="warn"?"orange":type==="error"?"red":"#0f0";
  d.textContent=msg;
  c.appendChild(d);
  c.scrollTop=c.scrollHeight;
}

function clearConsole(){
  document.getElementById("console").innerHTML="";
}
