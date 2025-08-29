"use strict";
class PopUp {
    constructor(closeOthers = true) {
        this.element = document.createElement('div');
        this.background_element = document.createElement('div');
        this.fullscreen = false;
        this.closeButton = document.createElement('a');
        this.background_element.className = 'pop-up-bg';
        this.background_element.style.position = 'fixed';
        this.background_element.style.left = "0";
        this.background_element.style.top = "0";
        this.background_element.style.bottom = "0";
        this.background_element.style.right = "0";
        this.background_element.style.zIndex = '1000';
        this.background_element.style.borderRadius = '0';
        this.background_element.style.padding = '10px';
        this.background_element.style.background = 'rgba(0, 0, 0, 0.45)';
        this.background_element.style.display = 'none'; // Initially hidden
        this.background_element.appendChild(this.element);
        this.element.className = 'pop-up';
        this.element.style.position = 'fixed';
        this.element.style.left = "50px";
        this.element.style.top = "50px";
        this.background_element.style.zIndex = '1001';
        this.element.style.backgroundColor = '#cececeff';
        this.element.style.border = '1px solid #ccc';
        this.element.style.borderRadius = '5px';
        this.element.style.padding = '10px';
        this.element.style.overflow = 'auto';
        this.element.style.zIndex = '1001';
        this.element.style.boxShadow = '0 2px 10px rgba(255, 255, 255, 0.1)';
        this.element.style.display = 'none'; // Initially hidden
        document.body.appendChild(this.background_element);
        document.body.appendChild(this.element);
        this.add(this.closeButton);
        this.closeButton.innerHTML = 'X';
        this.closeButton.className = 'close-button';
        this.closeButton.style.display = 'block';
        this.closeButton.style.background = "red";
        this.closeButton.style.position = "fixed";
        this.closeButton.style.right = "60px";
        this.closeButton.style.top = "60px";
        this.closeButton.style.borderRadius = "5px";
        this.closeButton.style.padding = `${CONFIG.LINE_WIDTH}px`;
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
        this.background_element.style.display = 'block';
        document.body.appendChild(this.element);
    }
    close() {
        this.element.style.display = 'none';
        this.background_element.style.display = 'none';
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
            this.element.parentNode.removeChild(this.background_element);
        }
    }
    setPosition(x, y) {
        this.element.style.left = Number.isFinite(x) ? `${x}px` : x.toString();
        this.element.style.top = Number.isFinite(y) ? `${y}px` : y.toString();
        this.fullscreen = false;
    }
    setFullScreen() {
        this.element.style.left = '50px';
        this.element.style.top = '50px';
        this.element.style.width = 'calc(100% - 100px)';
        this.element.style.height = 'calc(100% - 100px)';
        this.element.style.margin = '0';
        this.element.style.padding = '20px';
        this.element.style.boxSizing = 'border-box';
        this.fullscreen = true;
    }
    setSize(width, height) {
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.boxSizing = 'border-box';
        this.fullscreen = false;
    }
}
class CopyCodePopUp extends PopUp {
    constructor(lan, code) {
        super();
        this.preElement = document.createElement("pre");
        this.codeElement = document.createElement("CODE");
        this.contentElement = document.createElement("textarea");
        this.copyButton = document.createElement("button");
        if (CopyCodePopUp.current) {
            CopyCodePopUp.current.close();
        }
        CopyCodePopUp.current = this;
        this.codeElement.classList.add("language-" + lan);
        this.preElement.appendChild(this.codeElement);
        this.contentElement.style.display = "none";
        this.copyButton.innerHTML = Words.get("Copy Code");
        const codeString = lan === "python" ? new PythonCodeMaker(code).toCode() : lan === "java" ? new JavaCodeMaker(code).toCode() : "";
        this.copyButton.onclick = () => {
            var copyText = this.contentElement;
            copyText.select();
            navigator.clipboard.writeText(codeString);
        };
        this.add(this.copyButton);
        this.add(this.preElement);
        this.add(this.contentElement);
        this.codeElement.innerHTML = this.contentElement.textContent = codeString;
        this.setFullScreen();
        this.open();
    }
    close() {
        super.close();
        CopyCodePopUp.current = null;
    }
}
class Tutorial extends PopUp {
    constructor() {
        super();
        let main = document.createElement("div");
        this.add(main);
        let content = [];
        content.push(document.createElement("h1"));
        main.appendChild(content[0]);
        content[0].innerHTML = Words.get(`Quick tutorial`);
        content.push(document.createElement("ol"));
        main.appendChild(content[1]);
        // Steps:
        // Step 1
        let steps = [document.createElement("li")];
        content[1].appendChild(steps[0]);
        steps[0].innerHTML = `<h2>${Words.get("Adding nodes")}</h2>
                            <p>
                                ${Words.get("addingNodesGuide")} 
                            </p>`;
        let first = document.createElement("div");
        steps[0].appendChild(first);
        let main_first_step = new Main(first, false);
        //step 2
        steps.push(document.createElement("li"));
        content[1].appendChild(steps[1]);
        steps[1].innerHTML = `<h2>${Words.get("Changing nodes")}</h2>
                            <p>
                                ${Words.get("changingNodesGuide")}
                            </p>`;
        let second = document.createElement("div");
        steps[1].appendChild(second);
        let main_second_step = new Main(second, false);
        recursiveContentAdder([{ type: "StatementCode", content: null, text: Words.get("Edit me!") }], 0, main_second_step.container);
        steps.push(document.createElement("li"));
        content[1].appendChild(steps[2]);
        steps[2].innerHTML = `<h2>${Words.get("Deleting nodes")}</h2>
                            <p>
                                ${Words.get("deletingNodesGuide")}
                            </p>`;
        let third = document.createElement("div");
        steps[2].appendChild(third);
        let main_third_step = new Main(third, false);
        recursiveContentAdder([{ type: "StatementCode", content: null, text: Words.get("Delete me!") }], 0, main_third_step.container);
        this.open();
        this.setFullScreen();
    }
}
