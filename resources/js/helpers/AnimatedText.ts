export default class AnimatedText {
    private stringInx = 0;
    private currentArrayInx = 0;
    private el!: HTMLElement;
    private arr = [''];
    private interval = {};

    public constructor(el: HTMLElement, arr: string[]) {
        this.el = el;
        this.arr = arr;
    }

    public run() {
        this.el.textContent = '';

        this.interval = setInterval((_) => {
            this.typeWriter();
        }, 150);

        window.addEventListener('hashchange', () => {
            // @ts-ignore
            clearInterval(this.interval);
        });
    }

    private typeWriter() {
        if (this.stringInx >= this.arr[this.currentArrayInx].length) {
            if (this.currentArrayInx >= this.arr.length - 1) {
                this.currentArrayInx = -1;
            }

            this.stringInx = 0;
            this.el.textContent = '';
            this.currentArrayInx++;
            return;
        }

        this.el.textContent += this.arr[this.currentArrayInx].charAt(
            this.stringInx
        );
        this.stringInx++;
    }
}
