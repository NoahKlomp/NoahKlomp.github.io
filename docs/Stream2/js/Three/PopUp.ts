abstract class PopUp {
    private readonly element: HTMLDivElement = document.createElement('div');
    private closeButton: HTMLAnchorElement = document.createElement('a');
    protected constructor() {
        this.element.className = 'pop-up';
        this.element.style.position = 'fixed';
        this.element.style.zIndex = '1000';
        this.element.style.backgroundColor = '#fff';
        this.element.style.border = '1px solid #ccc';
        this.element.style.borderRadius = '5px';
        this.element.style.padding = '10px';
        this.element.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        this.element.style.display = 'none'; // Initially hidden
        document.body.appendChild(this.element);
        this.add(this.closeButton);
        this.closeButton.innerHTML = 'Close';
        this.closeButton.className = 'close-button';
        this.closeButton.style.display = 'block';
        this.closeButton.onclick = this.close.bind(this);
    }
    protected setBG(background:string) {
        this.element.style.background = background;
    }
    protected add(element: HTMLElement) {
        this.element.appendChild(element);
    }
    protected empty() {
        this.element.innerHTML = '';
    }


    public open(): void {
        this.element.style.display = 'block';
        document.body.appendChild(this.element);
    }
    public close(): void {
        this.element.style.display = 'none';
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
    public setPosition(x: number | string, y: number): void {
        this.element.style.left = Number.isFinite(x.toString())? `${x}px` : x.toString();
        this.element.style.top = Number.isFinite(y.toString())? `${y}px` : y.toString();
    }
    public setFullScreen(): void {
        this.element.style.left = '50px';
        this.element.style.top = '50px';
        this.element.style.width = 'calc(100% - 100px)'; // 50px padding on each side
        this.element.style.height = 'calc(100% - 100px)'; // 50px padding on each side
        this.element.style.margin = '0';
        this.element.style.padding = '20px';
        this.element.style.boxSizing = 'border-box'; // Ensure padding is included in width/height
    }
    public setSize(width: string, height: string): void {
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.boxSizing = 'border-box'; // Ensure padding is included in width/height
    }
}