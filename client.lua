RegisterCommand('ui', function()
	SendNUIMessage({
		action = 'setDisplay',
		cashBalance = 100,
		bankBalance = 1200

	})
	SetNuiFocus(true, true)
end)

RegisterNUICallback('closeUI', function(data, cb)
	SetNuiFocus(false, false) -- Remove NUI focus
	SendNuiMessage(json.encode({ action = "hideUI" })) -- Tell UI to hide itself
	cb(json.encode({ success = true }))
end)