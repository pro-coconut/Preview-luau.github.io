// main.js
const editor = CodeMirror(document.getElementById("editor"), {
  value:
`print("Hello executor")
createButton("CLICK ME")

-- loadstring example:
-- loadstring("https://raw.githubusercontent.com/user/repo/main/test.lua")()`,
  mode:"lua",
  lineNumbers:true
});

const consoleEl = document.getElementById("console");
const ui = document.getElementById("ui");

function clearAll(){
  consoleEl.textContent="";
  ui.innerHTML="";
}

/* Realtime safe */
let timer=null;
editor.on("change",()=>{
  clearTimeout(timer);
  timer=setTimeout(()=>{
    clearAll();
    runLuau(editor.getValue());
  },300);
});
