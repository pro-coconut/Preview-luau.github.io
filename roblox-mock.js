/* ===============================
   ROBLOX MOCK (SAFE MODE)
   =============================== */

let hasUI = false;
let hasLog = false;

function injectGlobals(luau){

  /* ========= PRINT ========= */
  luau.globals.print = (...a)=>{
    hasLog = true;
    log(a.join(" "));
  };

  /* ========= SAFE WAIT ========= */
  luau.globals.task = {
    wait: (t = 0)=>{
      if (t > 1) t = 1;
      return new Promise(r => setTimeout(r, t * 1000));
    }
  };
  luau.globals.wait = luau.globals.task.wait;

  /* ========= getgenv / shared ========= */
  const _genv = {};
  const _shared = {};
  luau.globals.getgenv = () => _genv;
  luau.globals.shared = _shared;

  /* ========= COLOR3 ========= */
  luau.globals.Color3 = {
    fromRGB: (r,g,b)=>`rgb(${r},${g},${b})`
  };

  /* ========= UDIM2 ========= */
  luau.globals.UDim2 = {
    new: (sx,ox,sy,oy)=>({sx,ox,sy,oy})
  };

  /* ========= INSTANCE ========= */
  let uiCount = 0;
  const UI_LIMIT = 40;

  const Instance = {};

  Instance.new = function(type){
    if (++uiCount > UI_LIMIT){
      throw "UI limit reached (safe mode)";
    }

    hasUI = true;

    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.left = "50%";
    el.style.top = "50%";
    el.style.transform = "translate(-50%,-50%)";
    el.style.background = "#333";
    el.style.color = "#fff";
    el.style.fontSize = "14px";
    el.style.userSelect = "none";

    /* ===== PROPS ===== */
    Object.defineProperties(el,{

      Parent:{
        set(){
          document.getElementById("ui").appendChild(el);
        }
      },

      Size:{
        set(v){
          el.style.width = v.ox + "px";
          el.style.height = v.oy + "px";
        }
      },

      Position:{
        set(v){
          el.style.left = "50%";
          el.style.top = "50%";
          el.style.transform =
            `translate(${v.ox}px,${v.oy}px)`;
        }
      },

      BackgroundColor3:{
        set(v){ el.style.background = v; }
      },

      Text:{
        set(v){ el.innerText = v; }
      },

      Draggable:{
        set(v){
          if (v) makeDraggable(el);
        }
      }
    });

    /* ===== TEXTBUTTON ===== */
    if (type === "TextButton"){
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.cursor = "pointer";
      el.style.border = "1px solid #666";

      el.MouseButton1Click = {
        Connect(fn){
          el.addEventListener("click", fn);
          el.addEventListener("touchstart", fn);
        }
      };
    }

    return el;
  };

  luau.globals.Instance = Instance;

  /* ========= LOADSTRING ========= */
  luau.globals.loadstring = async (src)=>{
    const res = await fetch(src);
    const code = await res.text();
    return async ()=>luau.run(code);
  };
}
