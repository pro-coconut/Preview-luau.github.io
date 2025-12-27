// roblox-mock.js
window.game={CoreGui:document.getElementById("ui")};

window.Instance={
  new:(type)=>{
    const el=document.createElement(type==="TextButton"?"button":"div");
    el._events={};
    el.Connect=(fn)=>el._fn=fn;
    if(type==="TextButton"){
      el.onclick=()=>el._fn&&el._fn();
      el.style.padding="10px";
      el.style.margin="10px";
    }
    return {
      Parent:{
        set v(p){ (p||game.CoreGui).appendChild(el); }
      },
      set Text(t){el.textContent=t},
      MouseButton1Click:{Connect:(fn)=>el._fn=fn}
    };
  }
};

window.loadstring=(src)=>()=>window.__runLuau(src);

window.__runLuau=(code)=>{
  const L=luau.createState();
  L.setGlobal("print",(s)=>log(String(s)));
  luau.load(L,code);
  luau.call(L,0,0);
};
