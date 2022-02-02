import { writable } from 'svelte/store';

const darkMode = writable(false);

darkMode.set(localStorage.getItem('darkMode') === '1' ? true : false);

const unsubdarkMode = darkMode.subscribe(async (val) => {
    localStorage.setItem('darkMode', val ? '1' : '0');

    document.documentElement.classList.toggle('dark', val);
});

export default darkMode;
