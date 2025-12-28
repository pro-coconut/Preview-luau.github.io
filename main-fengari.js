// main-fengari.js
window.addEventListener("DOMContentLoaded", ()=>{
  const editor = CodeMirror(document.getElementById("editor"),{
    value:`print("Hello Lua executor")\ncreateButton("CLICK ME")`,
    mode:"lua",
    lineNumbers:true
  });
  window.editor = editor;

  const consoleEl = document.getElementById("console");
  const ui = document.getElementById("ui");

  function clearAll(){
    consoleEl.textContent="";
    ui.innerHTML="";
  }

  // Realtime auto-run
  let timer = null;
  editor.on("change", ()=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
      clearAll();
      runLua(String(editor.getValue())); // ✅ convert sang JS string
    },300);
  });

  // Run lần đầu khi load
  runLua(String(editor.getValue()));
});
