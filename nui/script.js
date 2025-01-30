import { UIManager } from "./ui.js";

const uiManager = new UIManager();

// Load custom stylesheets (example: custom UI themes)
uiManager.loadCustomStyles(["custom.css"]);

// Create a Banking UI
uiManager.createUI("bankingUI", () => `
    <h1>Banking</h1>
    <p>Balance: <span id="bankBalance">$0</span></p>
    <input type="number" id="amountInput" placeholder="Enter amount">
    <button id="depositBtn">Deposit</button>
    <button id="withdrawBtn">Withdraw</button>
    <button class="close-btn">Close</button>
`);

uiManager.showUI('bankingUI')