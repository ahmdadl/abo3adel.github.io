export default class ScrollObserver {
    public observer: IntersectionObserver;

    constructor(onInter: IntersectionObserverCallback) {
        this.observer = new IntersectionObserver(onInter, {
            root: null, // default is the viewport
            threshold: 0.3, // percentage of taregt's visible area. Triggers "onIntersection"
        });
    }
}
