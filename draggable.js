function makeDraggable(el) {
  let x=0,y=0,drag=false;
  el.onmousedown=e=>{
    drag=true;
    x=e.clientX-el.offsetLeft;
    y=e.clientY-el.offsetTop;
  };
  document.onmouseup=()=>drag=false;
  document.onmousemove=e=>{
    if(!drag) return;
    el.style.left=(e.clientX-x)+"px";
    el.style.top=(e.clientY-y)+"px";
  };
}
