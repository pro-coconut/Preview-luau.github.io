const editor = CodeMirror(document.getElementById("editor"), {
  value:
`print("Executor ready")

-- loadstring example:
-- loadstring("https://raw.githubusercontent.com/user/repo/main/test.lua")()`,
  mode: "lua",
  lineNumbers: true
});
window.editor = editor;

function clearConsole(){
  document.getElementById("console").textContent="";
}
function clearUI(){
  document.getElementById("ui").innerHTML="";
}

/* SAFE REALTIME */
let timer=null;
editor.on("change",()=>{
  clearTimeout(timer);
  timer=setTimeout(()=>{
    clearConsole();
    clearUI();
    runLuau(editor.getValue());
  },400); // safe delay chống lag
});
