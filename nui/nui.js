/**
 * Binds a button to trigger an NUI callback when clicked.
 * @param {string} buttonId - The ID of the button.
 * @param {string} nuiEvent - The NUI event to send.
 * @param {Object} [data={}] - Optional data to send with the event.
 * @param {Function} [callback] - Optional function to execute after sending the event.
 */
export function bindNuiButton(buttonId, nuiEvent, data = {}, callback) {
	const button = document.getElementById(buttonId);
	if (!button) {
		console.warn(`Button with ID '${buttonId}' not found.`);
		return;
	}

	button.addEventListener("click", () => {
		fetchNui(nuiEvent, data).then((response) => {
			if (callback) callback(response);
		});
	});
}

// nui.js - Utility functions for FiveM NUI interactions

/**
 * Listens for NUI events from the client.
 * @param {string} eventName - The name of the NUI event.
 * @param {Function} callback - Function to execute when the event is received.
 */
export function useNuiEvent(eventName, callback) {
	window.addEventListener("message", (event) => {
		if (event.data.action === eventName) {
			callback(event.data);
		}
	});
}

/**
 * Sends a callback to the FiveM client (fetchNUI event).
 * @param {string} eventName - The event name.
 * @param {Object} data - The data to send.
 * @returns {Promise<any>} - Resolves with the response from the client.
 */
export function fetchNui(eventName, data = {}) {
	return fetch(`https://${GetParentResourceName()}/${eventName}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.catch((err) => console.error(`NUI Fetch Error (${eventName}):`, err));
}
