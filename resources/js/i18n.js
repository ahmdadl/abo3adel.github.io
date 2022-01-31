import { register, init, locale , getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./lang/en.json'));
// register('en-US', () => import('./en-US.json'));
// register('pt', () => import('./pt.json'));
// en, en-US and pt are not available yet

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});
locale.set('en');
// starts loading 'en-US' and 'en'