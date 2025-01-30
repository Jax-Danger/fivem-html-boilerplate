RegisterCommand('ui', function()
	SendNuiMessage(json.encode({
		action = 'setDisplay',
	}))
	SetNuiFocus(true, true)
end)

RegisterNUICallback('closeUI', function(data, cb)
	SetNuiFocus(false, false)
	print(data)
	cb('ok')
end)
