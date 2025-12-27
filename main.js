const editor = CodeMirror(document.getElementById("editor"), {
  value: `print("Hello executor")`,
  mode:"lua",
  lineNumbers:true
});

const consoleEl = document.getElementById("console");
const ui = document.getElementById("ui");

function clearAll(){
  consoleEl.textContent="";
  ui.innerHTML="";
}

/* Realtime auto run */
let timer = null;
editor.on("change", ()=>{
  clearTimeout(timer);
  timer = setTimeout(()=>{
    clearAll();
    runLuau(editor.getValue());
  },300);
});
