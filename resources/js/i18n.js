import { register, init, locale , getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./lang/en.json'));
register('ar', () => import('./lang/ar.json'));


init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});
locale.set('en');
// starts loading 'en-US' and 'en'