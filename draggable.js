function makeDraggable(el){
  let dx=0,dy=0,drag=false;
  el.addEventListener("mousedown",e=>{
    drag=true;
    dx=e.clientX-el.offsetLeft;
    dy=e.clientY-el.offsetTop;
  });
  document.addEventListener("mouseup",()=>drag=false);
  document.addEventListener("mousemove",e=>{
    if(!drag) return;
    el.style.left=(e.clientX-dx)+"px";
    el.style.top=(e.clientY-dy)+"px";
  });
}
