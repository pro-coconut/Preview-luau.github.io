let luau, editor;
let lastCode = "";
let running = false;
let throttleTimer = null;

/* SAFE MODE SETTINGS */
const SAFE_TIMEOUT = 120; // ms
const MAX_LINES = 300;

window.onload = () => {
  editor = CodeMirror(document.getElementById("editor"), {
    value: `print("Safe realtime executor ready")`,
    mode: "lua",
    lineWrapping: true,
    viewportMargin: Infinity
  });

  showTab("editor");

  editor.on("change", () => {
    clearTimeout(throttleTimer);
    throttleTimer = setTimeout(() => {
      const code = editor.getValue();
      if (code === lastCode) return;
      if (running) return;

      lastCode = code;
      runSafeRealtime(code);
    }, 60); // gần realtime
  });
};

async function runSafeRealtime(code){
  running = true;

  document.getElementById("ui").innerHTML="";
  clearConsole();
  hasUI = false;
  hasLog = false;

  /* ===== STATIC SAFETY CHECK ===== */
  const lines = code.split("\n");
  if (lines.length > MAX_LINES){
    log("❌ Script too large (safe mode)", "warn");
    showTab("console");
    running = false;
    return;
  }

  if (/while\s+true|repeat\s+until\s+false/.test(code)){
    log("⛔ Infinite loop blocked (safe mode)", "error");
    showTab("console");
    running = false;
    return;
  }

  /* ===== RESET VM ===== */
  luau = new Luau();
  injectGlobals(luau);

  let killed = false;
  const killer = setTimeout(()=>{
    killed = true;
    log("⏱ Script timeout (safe mode)", "error");
  }, SAFE_TIMEOUT);

  try{
    await luau.run(code);
  }catch(e){
    if (!killed) log("Error: " + e, "error");
    hasLog = true;
  }

  clearTimeout(killer);

  if (!killed){
    if (hasUI) showTab("ui");
    else if (hasLog) showTab("console");
  }

  running = false;
}

/* TAB CONTROL */
function showTab(id){
  ["editor","ui","console"].forEach(t=>{
    document.getElementById(t).style.display="none";
  });
  document.getElementById(id).style.display="block";
}
