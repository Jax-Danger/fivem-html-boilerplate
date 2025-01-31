# FiveM UI Template

This is a simple and modular UI template for FiveM that allows developers to create and manage in-game UIs using HTML, CSS, and JavaScript. It provides an easy-to-use **UIManager** class that dynamically generates and controls UI elements without requiring manual HTML edits.

## 🚀 Features
- **Dynamic UI Creation** – Define UIs in JavaScript without modifying HTML files.
- **NUI Callbacks** – Easily send and receive events from the FiveM client.
- **Built-in Close Buttons** – Automatic handling for UI close functionality.
- **Custom Styles** – Supports external CSS files for user customization.

---

## 📌 Installation
1. **Clone or Download the Repository:**
   ```sh
   git clone https://github.com/your-repo-name/FiveM-UI-Template.git
   ```
2. **Move the Folder to Your FiveM Resource Directory:**
   ```sh
   mv FiveM-UI-Template your-fivem-server/resources/
   ```
3. **Ensure the Resource is Started in `server.cfg`:**
   ```cfg
   start FiveM-UI-Template
   ```

---

## 📖 Usage
### 1️⃣ **Creating a UI**
To create a new UI, use `uiManager.createUI()` in `main.js`:

```javascript
import { UIManager } from "./ui.js";
const uiManager = new UIManager();

uiManager.createUI("myCustomUI", () => `
    <h1>My Custom UI</h1>
    <p>Welcome to my UI!</p>
    <button id="closeBtn" class="close-btn">Close</button>
`);
```

This will create a UI with an **ID of `myCustomUI`**, which can be shown or hidden using `showUI(id)` and `hideUI(id)`.

### 2️⃣ **Showing and Hiding a UI**
To **show** a UI, call:
```javascript
uiManager.showUI("myCustomUI");
```
To **hide** a UI, call:
```javascript
uiManager.hideUI("myCustomUI");
```

### 3️⃣ **Adding a Close Button**
To automatically bind a close button inside your UI, add:
```javascript
createButton("closeBtn", "closeUI", {}, () => {
    uiManager.hideUI("myCustomUI");
});
```

---

## 🎨 Customizing the UI with CSS
To modify the UI appearance, edit `custom.css`. Example:
```css
.ui {
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 20px;
    border-radius: 10px;
}
```

If you want to **load multiple custom styles**, use:
```javascript
uiManager.loadCustomStyles(["custom.css", "dark-theme.css"]);
```

---

## ⚡ FiveM Integration
### **Registering the UI in `client.lua`**
To trigger the UI in-game, add a FiveM command:
```lua
RegisterCommand('openui', function()
    SendNuiMessage(json.encode({ action = 'setDisplay' }))
    SetNuiFocus(true, true)
end)
```

### **Handling UI Close in `client.lua`**
```lua
RegisterNUICallback('closeUI', function(data, cb)
    SetNuiFocus(false, false)
    SendNuiMessage(json.encode({ action = "hideUI" }))
    cb(json.encode({ success = true }))
end)
```

Now, when the close button is clicked, it **automatically hides the UI and removes focus**.

---

## 📂 File Structure
```
FiveM-UI-Template/
│── fxmanifest.lua       # FiveM resource manifest
│── html/
│   ├── index.html       # Entry point for UI (loads JS)
│   ├── custom.css       # User-defined styles
│   ├── script.js        # User-defined scripts
│   ├── ui.js            # UIManager class (core functionality)
│── client.lua           # FiveM client-side event handling
│── main.js              # UI and event bindings
│── README.md            # Documentation (this file)
```

---


