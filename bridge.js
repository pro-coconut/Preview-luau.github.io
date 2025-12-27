function js_create(className, obj) {
  const el = document.createElement(
    className === "TextButton" ? "button" : "div"
  );
  el.style.position="absolute";
  el.style.color="white";

  if (className === "TextButton") {
    el.onclick=()=>obj.MouseButton1Click?.Fire();
  }

  document.getElementById("ui").appendChild(el);
  obj.__el = el;
}

function js_set(obj,k,v){
  const el=obj.__el;
  if(!el) return;

  if(k==="Text") el.innerText=v;
  if(k==="Size"){el.style.width=v.xo+"px";el.style.height=v.yo+"px";}
  if(k==="Position"){
    el.style.left="50%";el.style.top="50%";
    el.style.transform=`translate(${v.xo}px,${v.yo}px)`;
  }
  if(k==="BackgroundColor3")
    el.style.background=`rgb(${v.r},${v.g},${v.b})`;
  if(k==="Draggable" && v) makeDraggable(el);
}

async function js_loadstring(src){
  let code=src;
  if(src.includes(".lua")){
    const r=await fetch(src);
    code=await r.text();
  }
  return ()=>luau.run(code);
}
