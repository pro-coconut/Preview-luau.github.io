// main.js
let debounce=null;

function run(code){
  try{
    if(window.__SAFE__ && code.includes("getgenv")) throw "Blocked by Safe mode";
    window.__runLuau(code);
  }catch(e){
    log("Error: "+e);
  }
}

editor.on("change",()=>{
  if(!rt.classList.contains("on")) return;
  clearTimeout(debounce);
  debounce=setTimeout(()=>{
    document.getElementById("console").textContent="";
    window.__SAFE__=safe.classList.contains("on");
    run(editor.getValue());
  },300);
});
