shared = {}
local _GENV = {}
function getgenv() return _GENV end

function print(...)
  js_log(table.concat({...}," "))
end
function warn(...)
  js_warn(table.concat({...}," "))
end

local function event()
  return {
    _={}, Connect=function(self,f)table.insert(self._,f)end,
    Fire=function(self)for _,f in ipairs(self._)do f()end end
  }
end

Instance={}
function Instance.new(class)
  local o={ClassName=class}
  if class=="TextButton" then
    o.MouseButton1Click=event()
  end
  js_create(class,o)
  return setmetatable(o,{__newindex=function(t,k,v)js_set(t,k,v)end})
end

UDim2={}; function UDim2.new(a,b,c,d)return{xo=b,yo=d}end
Color3={}; function Color3.fromRGB(r,g,b)return{r=r,g=g,b=b}end
function loadstring(s)return js_loadstring(s)end
