import 'core-js/es/string/includes';
import 'core-js/es/symbol';
import 'core-js/es/symbol/iterator';
import 'core-js/modules/es.promise.finally';
import 'core-js/features/object/from-entries';
import 'whatwg-fetch';

import StateRouter from 'abstract-state-router';
import SvelteRenderer from 'svelte-state-renderer';
// For HTML5 History routing, but you http server should return index.html instead 404.
// import SausageRouter from 'sausage-router';
import HashBrownRouter from 'hash-brown-router';

import { language, _, go } from 'global';
import MainPage from './js/MainPage';
import i18nStrings from './i18n_strings';

const browserLanguage = navigator.language || navigator.userLanguage;
let userLanguage = 'en';
if (browserLanguage.indexOf('ja') >= 0) {
  userLanguage = 'ja';
}
language.subscribe((value) => {
  if (!value) {
    return;
  }
  const langDict = i18nStrings[value] != null ? i18nStrings[value] : {};
  _.set(text => langDict[text] || text);
  localStorage.setItem('language', value);
});
language.set(localStorage.getItem('language') || userLanguage);

document.addEventListener('DOMContentLoaded', () => {
  const stateRouter = StateRouter(
    SvelteRenderer({}),
    document.querySelector('body'),
    {
      pathPrefix: '',
      // router: HashBrownRouter(SausageRouter()),
      router: HashBrownRouter(),
    },
  );

  go.set((event, path, params) => {
    if (event != null) {
      event.preventDefault();
    }
    stateRouter.go(path, params);
  });

  MainPage(stateRouter);

  stateRouter.evaluateCurrentRoute('app');
});
