let luau;

async function init() {
  const res = await fetch("luau.wasm");
  const bytes = await res.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes, {});
  luau = instance.exports;
}

function run() {
  document.getElementById("ui").innerHTML = "";
  clearConsole();

  const code = document.getElementById("editor").value;
  luau.run(`
    dofile("roblox-mock.lua")
    ${code}
  `);
}

init();
