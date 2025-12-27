function log(msg, type="log") {
  const c = document.getElementById("console");
  const line = document.createElement("div");
  line.textContent = msg;
  line.style.color = type === "warn" ? "orange" : "#0f0";
  c.appendChild(line);
  c.scrollTop = c.scrollHeight;
}

function clearConsole() {
  document.getElementById("console").innerHTML = "";
}
