// roblox-mock-fengari.js
function toJSString(str){
  if(typeof str === "string") return str;
  return str.toString(); // đảm bảo JS string
}

function runLua(code){
  const L = fengari.lauxlib.luaL_newstate();
  fengari.lualib.luaL_openlibs(L);

  const consoleEl = document.getElementById("tab-console");
  const ui = document.getElementById("tab-ui");

  // Override print
  fengari.lua.lua_pushjsfunction(L, function(L){
    const n = fengari.lua.lua_gettop(L);
    let out = [];
    for(let i=1;i<=n;i++){
      out.push(fengari.tojsstring(L, i));
    }
    consoleEl.textContent += out.join(" ") + "\n";
    consoleEl.scrollTop = consoleEl.scrollHeight;
    return 0;
  });
  fengari.lua.lua_setglobal(L, "print");

  // Override createButton
  fengari.lua.lua_pushjsfunction(L,function(L){
    const text = fengari.tojsstring(L,1);
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className = "executor-btn";
    btn.onclick = ()=>{consoleEl.textContent+="Button clicked\n";};
    ui.appendChild(btn);
    return 0;
  });
  fengari.lua.lua_setglobal(L, "createButton");

  try{
    fengari.load(L, toJSString(code))(); // convert sang JS string chuẩn
  }catch(e){
    consoleEl.textContent += "Error: "+e+"\n";
  }
}
