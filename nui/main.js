import { UIManager, bindNuiButton, fetchNui, useNuiEvent } from "./ui.js";
const uiManager = new UIManager();

// Load custom stylesheets
uiManager.loadCustomStyles(["custom.css"]);

// Create Banking UI
uiManager.createUI("bankingUI", () => `
    <h1>Banking</h1>
    <p>Bank Balance: <span id="bankBalance">$0</span></p>
    <input type="number" id="amountInput" placeholder="Enter amount">
    <button id="depositBtn">Deposit</button>
    <button id="withdrawBtn">Withdraw</button>
    <button id="closeBtn" class="close-btn">Close</button>
`);

// Listen for event from FiveM client
useNuiEvent("setDisplay", (data) => {
	console.log(JSON.stringify(data))
	uiManager.showUI('bankingUI')
});

bindNuiButton('closeBtn', 'closeUI', {}, () => {
	console.log('closed UI')
	uiManager.hideUI('bankingUI')
})