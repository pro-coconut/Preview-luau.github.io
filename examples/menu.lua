local f = Instance.new("Frame")
f.Size = UDim2.new(0,220,0,140)
f.Position = UDim2.new(0,-110,0,-70)
f.BackgroundColor3 = Color3.fromRGB(60,60,60)
f.Draggable = true
f.ZIndex = 5

local b = Instance.new("TextButton")
b.Text = "Hello"
b.Size = UDim2.new(0,120,0,40)
b.Position = UDim2.new(0,-60,0,-10)
b.Parent = f

b.MouseButton1Click:Connect(function()
  print("Clicked from menu.lua")
end)
