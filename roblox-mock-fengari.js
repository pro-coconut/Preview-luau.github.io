// roblox-mock-fengari.js
function runLua(code){
  const L = fengari.lauxlib.luaL_newstate();
  fengari.lualib.luaL_openlibs(L);

  // Override print
  fengari.lua.lua_pushjsfunction(L, function(L){
    const n = fengari.lua.lua_gettop(L);
    let out = [];
    for(let i=1;i<=n;i++){
      out.push(fengari.tojsstring(L, i));
    }
    document.getElementById("console").textContent += out.join(" ") + "\n";
    document.getElementById("console").scrollTop = document.getElementById("console").scrollHeight;
    return 0;
  });
  fengari.lua.lua_setglobal(L, "print");

  // Override createButton
  fengari.lua.lua_pushjsfunction(L,function(L){
    const text = fengari.tojsstring(L,1);
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = ()=>{document.getElementById("console").textContent+="Button clicked\n";};
    document.getElementById("ui").appendChild(btn);
    return 0;
  });
  fengari.lua.lua_setglobal(L, "createButton");

  try{
    fengari.load(L, String(code))(); // ✅ convert sang JS string
  }catch(e){
    document.getElementById("console").textContent += "Error: "+e+"\n";
  }
}
