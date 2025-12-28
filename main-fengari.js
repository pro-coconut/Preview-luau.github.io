// main-fengari.js
window.addEventListener("DOMContentLoaded", ()=>{
  const editorEl = document.getElementById("tab-editor");
  const editor = CodeMirror(editorEl,{
    value:`print("Hello Lua executor")\ncreateButton("CLICK ME")`,
    mode:"lua",
    lineNumbers:true
  });
  window.editor = editor;

  const consoleEl = document.getElementById("tab-console");
  const ui = document.getElementById("tab-ui");

  function clearAll(){
    consoleEl.textContent="";
    ui.innerHTML="";
  }

  // Tabs
  const tabButtons = document.querySelectorAll("#tabs button");
  tabButtons.forEach(btn=>{
    btn.addEventListener("click",()=>{
      tabButtons.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".tab-content").forEach(tc=>tc.style.display='none');
      const current = document.getElementById("tab-"+btn.dataset.tab);
      current.style.display='flex';
      if(btn.dataset.tab==='editor') editor.refresh(); // refresh CodeMirror khi hiện
    });
  });
  // Show editor tab by default
  document.getElementById("tab-editor").style.display='flex';
  editor.refresh();

  // Realtime auto-run
  let timer = null;
  editor.on("change", ()=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
      clearAll();
      runLua(toJSString(editor.getValue())); // convert JS string chuẩn
    },300);
  });

  // Run lần đầu khi load
  runLua(toJSString(editor.getValue())); // convert JS string chuẩn
});
