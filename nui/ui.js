export class UIManager {
	constructor() {
		this.uis = {}; // Stores UI elements by ID
		this.createGlobalStyles(); // Inject core styles
	}

	/**
	 * Allows users to add external CSS files dynamically.
	 * @param {string[]} stylesheets - Array of CSS file paths.
	 */
	loadCustomStyles(stylesheets) {
		stylesheets.forEach((sheet) => {
			if (!document.querySelector(`link[href="${sheet}"]`)) {
				const link = document.createElement("link");
				link.rel = "stylesheet";
				link.href = sheet;
				document.head.appendChild(link);
			}
		});
	}

	/**
	 * Creates a new UI dynamically.
	 * @param {string} id - The unique ID of the UI.
	 * @param {Function} renderFunction - A function returning inner HTML.
	 * @param {string} [customStyle] - Optional custom styles for this UI.
	 */
	createUI(id, renderFunction, customStyle = "") {
		if (this.uis[id]) return console.warn(`UI with ID '${id}' already exists.`);

		const uiContainer = document.createElement("div");
		uiContainer.id = id;
		uiContainer.className = "ui hidden";
		uiContainer.innerHTML = renderFunction();

		if (customStyle) {
			uiContainer.style.cssText = customStyle;
		}

		document.body.appendChild(uiContainer);
		this.uis[id] = uiContainer;

		// Auto-close button detection
		const closeBtn = uiContainer.querySelector(".close-btn");
		if (closeBtn) {
			closeBtn.addEventListener("click", () => {
				this.hideUI(id);
				fetchNui(`hide${id}`);
			});
		}
	}


	/**
	 * Shows a UI.
	 * @param {string} id - The UI ID.
	 */
	showUI(id) {
		if (this.uis[id]) this.uis[id].classList.remove("hidden");
	}

	/**
	 * Hides a UI.
	 * @param {string} id - The UI ID.
	 */
	hideUI(id) {
		if (this.uis[id]) this.uis[id].classList.add("hidden");
	}

	/**
	 * Deletes a UI from the DOM.
	 * @param {string} id - The UI ID.
	 */
	removeUI(id) {
		if (this.uis[id]) {
			this.uis[id].remove();
			delete this.uis[id];
		}
	}

	/**
	 * Injects global CSS styles for base UI layout.
	 */
	createGlobalStyles() {
		if (document.getElementById("global-styles")) return; // Prevent multiple injections

		const style = document.createElement("style");
		style.id = "global-styles";
		style.innerHTML = `
            .hidden { display: none; }
            .ui {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                width: 300px;
            }
            .hud {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px;
                border-radius: 5px;
                text-align: right;
                font-size: 18px;
            }
            .close-btn {
                margin-top: 10px;
                background: red;
                border: none;
                color: white;
                padding: 5px;
                cursor: pointer;
            }
        `;
		document.head.appendChild(style);
	}
}