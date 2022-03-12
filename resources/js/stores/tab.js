import { writable } from 'svelte/store';
import * as animateScroll from 'svelte-scrollto';

const tabStore = writable('');

if (location.hash.length) {
    const sectionId = location.hash.replace('#', '').replace('-section', '');
    tabStore.set(sectionId);

    // wait for element to be loaded
    setTimeout(() => {
        const element = document.getElementById(sectionId);

        if (!element) return;
        animateScroll.scrollTo({ element });
    }, 400);
}

tabStore.subscribe((val) => {
    if (!val) return;

    location.hash = val + '-section';

    // animation will be done by actions in <Nav /> componet
});

export default tabStore;
