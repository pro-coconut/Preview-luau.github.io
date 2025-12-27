function injectGlobals(luau){

  luau.globals.print=(...a)=>log(a.join(" "));
  luau.globals.warn=(...a)=>log(a.join(" "),"warn");
  luau.globals.error=(...a)=>log(a.join(" "),"error");

  const _genv={}, _shared={};
  luau.globals.getgenv=()=>_genv;
  luau.globals.shared=_shared;

  luau.globals.task={
    wait:(t=0)=>new Promise(r=>setTimeout(r,t*1000))
  };
  luau.globals.wait=luau.globals.task.wait;

  luau.globals.loadstring=async(src)=>{
    let code=src;
    if(src.endsWith(".lua")){
      const r=await fetch(src);
      code=await r.text();
    }
    return async()=>luau.run(code);
  };

  luau.globals.UDim2={ new:(a,x,b,y)=>({x,y}) };
  luau.globals.Color3={ fromRGB:(r,g,b)=>({r,g,b}) };

  luau.globals.Instance={
    new:(className)=>{
      const obj={ClassName:className,ZIndex:1};
      if(className.includes("Button")){
        obj.MouseButton1Click={
          _f:null,
          Connect(f){this._f=f},
          Fire(){this._f&&this._f()}
        };
      }
      createElement(className,obj);
      return new Proxy(obj,{
        set(t,k,v){ setProp(t,k,v); t[k]=v; return true; }
      });
    }
  };
      }
