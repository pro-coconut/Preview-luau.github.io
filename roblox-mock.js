async function runLuau(code){
  try{
    const L = luau.createState();

    /* print */
    L.setGlobal("print",(x)=>{
      const c=document.getElementById("console");
      c.textContent+=String(x)+"\n";
      c.scrollTop=c.scrollHeight;
    });

    /* UI button */
    L.setGlobal("createButton",(text)=>{
      const b=document.createElement("button");
      b.textContent=text;
      b.onclick=()=>{
        const c=document.getElementById("console");
        c.textContent+="Button clicked\n";
      };
      document.getElementById("ui").appendChild(b);
    });

    /* loadstring(url) */
    L.setGlobal("loadstring",(url)=>{
      return ()=>{
        fetch(url)
          .then(r=>r.text())
          .then(src=>{
            runLuau(src);
          })
          .catch(e=>{
            const c=document.getElementById("console");
            c.textContent+="Load error: "+e+"\n";
          });
      };
    });

    luau.load(L,code);
    luau.call(L,0,0);

  }catch(e){
    const c=document.getElementById("console");
    c.textContent+="Error: "+e+"\n";
  }
}
