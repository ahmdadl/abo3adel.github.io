import { register, init, locale, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./lang/en.json'));
register('ar', () => import('./lang/ar.json'));

init({
    fallbackLocale: 'en',
    initialLocale:
        localStorage.getItem('user_lang') || getLocaleFromNavigator(),
});
locale.set(localStorage.getItem('user_lang') || 'en');

locale.subscribe((val) => {
    localStorage.setItem('user_lang', val);
});

// starts loading 'en-US' and 'en'
