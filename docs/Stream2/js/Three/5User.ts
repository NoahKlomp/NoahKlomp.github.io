class CustomMenu {
    private static menu: HTMLDivElement;
    private static container: HTMLDivElement;
    private static opened: boolean = false;
    static initialize() {
        CustomMenu.container = document.createElement("div");
        CustomMenu.menu = document.createElement('div');
        CustomMenu.container.appendChild(CustomMenu.menu);
        CustomMenu.container.style.display = "none";
        CustomMenu.container.style.position = 'fixed';
        CustomMenu.menu.className = 'custom-menu';
        CustomMenu.menu.style.display = 'flex';
        CustomMenu.menu.style.flexDirection = 'column';
        CustomMenu.menu.style.alignContent = 'stretch';
        CustomMenu.menu.style.maxHeight = '200px';
        CustomMenu.menu.style.margin = 'auto';
        CustomMenu.menu.style.width = '100%';
        CustomMenu.container.style.zIndex = "1020";
        document.body.appendChild(CustomMenu.container);
    }
    static show(x:number, y:number, items:Map<string,()=>void>):void {
        if (CustomMenu.opened) {
            CustomMenu.hide();
            CustomMenu.opened = false;
        }
        console.log("CustomMenu.show", x, y, items);
        CustomMenu.reset();
        if (items.size > 0) {
            items.forEach((item, name): void => {
                const menuItem: HTMLDivElement = CustomMenu.customItemElement();
                menuItem.textContent = name;
                menuItem.onclick = (): void => {
                    item();
                    CustomMenu.hide();
                }
                CustomMenu.menu.appendChild(menuItem);
            });
        }
        CustomMenu.container.style.left = `${x}px`;
        CustomMenu.container.style.top = `${y}px`;
        CustomMenu.container.style.backgroundColor = CONFIG.MENU_COLOUR;
        CustomMenu.container.style.display = 'block';
        CustomMenu.opened = true;
    }
    static reset():void {
        CustomMenu.menu.innerHTML = '';

    }
    static hide():void {
        CustomMenu.container.style.display = 'none';
        CustomMenu.opened = false;
    }
    private static customItemElement(): HTMLDivElement {
        const item: HTMLDivElement = document.createElement('div');
        item.style.margin = '2px';
        item.style.padding = '5px';
        item.style.backgroundColor = '#f0f0f0';
        item.style.border = '1px solid #ccc';
        item.style.borderRadius = '5px';
        item.className = 'clickable';

        return item;
    }
}

CustomMenu.initialize();
document.onclick = (): void => {CustomMenu.hide()}


(document.getElementById('CopyUrlButton')||document.createElement("button")).innerHTML = Words.get('Copy URL');
(document.getElementById('PythonButton')||document.createElement("button")).innerHTML = Words.get('To Python Comments');
(document.getElementById('JavaButton')||document.createElement("button")).innerHTML = Words.get('To Java Comments');
(document.getElementById('ResetButton')||document.createElement("button")).innerHTML = Words.get('Reset');
(document.getElementById('toImgButton')||document.createElement("button")).innerHTML = Words.get('Export to image');