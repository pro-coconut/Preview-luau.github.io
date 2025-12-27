function makeDraggable(el){
  let ox=0,oy=0,drag=false;

  const start=e=>{
    drag=true;
    const t=e.touches?e.touches[0]:e;
    ox=t.clientX-el.offsetLeft;
    oy=t.clientY-el.offsetTop;
  };

  const move=e=>{
    if(!drag) return;
    const t=e.touches?e.touches[0]:e;
    el.style.left=(t.clientX-ox)+"px";
    el.style.top=(t.clientY-oy)+"px";
  };

  const end=()=>drag=false;

  el.addEventListener("mousedown",start);
  el.addEventListener("touchstart",start);
  document.addEventListener("mousemove",move);
  document.addEventListener("touchmove",move);
  document.addEventListener("mouseup",end);
  document.addEventListener("touchend",end);
}
