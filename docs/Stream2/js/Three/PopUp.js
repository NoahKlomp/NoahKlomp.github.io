"use strict";
class PopUp {
    constructor() {
        this.element = document.createElement('div');
        this.closeButton = document.createElement('a');
        if (PopUp.current) {
            PopUp.current.close();
        }
        PopUp.current = this;
        this.element.className = 'pop-up';
        this.element.style.position = 'fixed';
        this.element.style.left = "50px";
        this.element.style.top = "50px";
        this.element.style.zIndex = '1000';
        this.element.style.backgroundColor = '#fff';
        this.element.style.border = '1px solid #ccc';
        this.element.style.borderRadius = '5px';
        this.element.style.padding = '10px';
        this.element.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        this.element.style.display = 'none'; // Initially hidden
        document.body.appendChild(this.element);
        this.add(this.closeButton);
        this.closeButton.innerHTML = 'X';
        this.closeButton.className = 'close-button';
        this.closeButton.style.display = 'block';
        this.closeButton.style.background = "red";
        this.closeButton.style.position = "fixed";
        this.closeButton.style.right = "10px";
        this.closeButton.style.top = "10px";
        this.closeButton.style.padding = `${CONFIG.TEXT_MARGIN}px`;
        this.closeButton.onclick = this.close.bind(this);
    }
    setBG(background) {
        this.element.style.background = background;
    }
    add(element) {
        this.element.appendChild(element);
    }
    empty() {
        this.element.innerHTML = '';
    }
    open() {
        this.element.style.display = 'block';
        document.body.appendChild(this.element);
    }
    close() {
        this.element.style.display = 'none';
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        PopUp.current = null;
    }
    setPosition(x, y) {
        this.element.style.left = Number.isFinite(x.toString()) ? `${x}px` : x.toString();
        this.element.style.top = Number.isFinite(y.toString()) ? `${y}px` : y.toString();
    }
    setFullScreen() {
        this.element.style.left = '50px';
        this.element.style.top = '50px';
        this.element.style.width = 'calc(100% - 100px)'; // 50px padding on each side
        this.element.style.height = 'calc(100% - 100px)'; // 50px padding on each side
        this.element.style.margin = '0';
        this.element.style.padding = '20px';
        this.element.style.boxSizing = 'border-box'; // Ensure padding is included in width/height
    }
    setSize(width, height) {
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.boxSizing = 'border-box'; // Ensure padding is included in width/height
    }
}
PopUp.current = null;
class CopyCodePopUp extends PopUp {
    constructor(lan, code) {
        super();
        this.preElement = document.createElement("pre");
        this.codeElement = document.createElement("CODE");
        this.contentElement = document.createElement("textarea");
        this.copyButton = document.createElement("button");
        this.codeElement.classList.add("language-" + lan);
        this.preElement.appendChild(this.codeElement);
        this.contentElement.style.display = "none";
        this.copyButton.innerHTML = "Copy Code";
        this.copyButton.onclick = () => {
            var copyText = this.contentElement;
            // Select the text field
            copyText.select();
            copyText.setSelectionRange(0, Infinity); // For mobile devices
            // Copy the text inside the text field
            navigator.clipboard.writeText(copyText.value);
        };
        this.add(this.copyButton);
        this.add(this.preElement);
        this.add(this.contentElement);
        const codeString = lan === "python" ? new PythonCodeMaker(code).toCode() : lan === "java" ? new JavaCodeMaker(code).toCode() : "";
        this.codeElement.innerHTML = this.contentElement.textContent = codeString;
        this.setFullScreen();
        this.open();
    }
}
