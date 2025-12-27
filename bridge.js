function createElement(className,obj){
  let el;
  if(className==="TextButton") el=document.createElement("button");
  else if(className==="ImageButton") el=document.createElement("img");
  else el=document.createElement("div");

  el.style.position="absolute";
  el.style.color="white";
  el.style.userSelect="none";

  if(className.includes("Button"))
    el.onclick=()=>obj.MouseButton1Click.Fire();

  document.getElementById("ui").appendChild(el);
  obj.__el=el;
}

function setProp(obj,k,v){
  const el=obj.__el;
  if(!el) return;

  if(k==="Text") el.innerText=v;
  if(k==="Image") el.src=v;

  if(k==="Size"){
    el.style.width=v.x+"px";
    el.style.height=v.y+"px";
  }
  if(k==="Position"){
    el.style.left="50%";
    el.style.top="50%";
    el.style.transform=`translate(${v.x}px,${v.y}px)`;
  }
  if(k==="BackgroundColor3")
    el.style.background=`rgb(${v.r},${v.g},${v.b})`;

  if(k==="ZIndex") el.style.zIndex=v;
  if(k==="Draggable" && v) makeDraggable(el);
}
