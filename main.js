let luau, editor;

window.onload = () => {
  editor = CodeMirror(document.getElementById("editor"), {
    value: `print("Executor preview full")

local f = Instance.new("Frame")
f.Size = UDim2.new(0,260,0,160)
f.Position = UDim2.new(0,-130,0,-80)
f.BackgroundColor3 = Color3.fromRGB(40,40,40)
f.Draggable = true

local b = Instance.new("TextButton")
b.Text = "Load menu"
b.Size = UDim2.new(0,140,0,40)
b.Position = UDim2.new(0,-70,0,-10)
b.Parent = f

b.MouseButton1Click:Connect(function()
  loadstring("examples/menu.lua")()
end)
`,
    mode: "lua",
    lineNumbers: true
  });
};

async function run(){
  document.getElementById("ui").innerHTML="";
  clearConsole();

  if(!luau){
    luau=new Luau();
    injectGlobals(luau);
  }

  try{
    await luau.run(editor.getValue());
  }catch(e){
    log("Error: "+e,"error");
  }
}
