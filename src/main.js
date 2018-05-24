import 'core-js/fn/string/includes';
import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import 'whatwg-fetch';

import StateRouter from 'abstract-state-router';
import SvelteRenderer from 'svelte-state-renderer';
import SausageRouter from 'sausage-router';
import HashBrownRouter from 'hash-brown-router';

import { Store } from 'svelte/store';
import MainPage from './js/MainPage';
import i18nStrings from './i18n_strings';

const globalStore = new Store({});

function i18n(translate, language) {
  const langDict = translate[language] != null ? translate[language] : {};
  return {
    _: text => langDict[text] || text,
  };
}

const browserLanguage = navigator.language || navigator.userLanguage;
let userLanguage = 'en';
if (browserLanguage.indexOf('ja') >= 0) {
  userLanguage = 'ja';
}
const language = localStorage.getItem('language') || userLanguage;

globalStore.set({
  language,
});

globalStore.set(i18n(i18nStrings, language));
globalStore.on('state', ({ changed, current }) => {
  if (changed.language) {
    globalStore.set(i18n(i18nStrings, current.language));
  }
});

window.store = globalStore;

document.addEventListener('DOMContentLoaded', () => {
  const stateRouter = StateRouter(
    SvelteRenderer({}),
    document.querySelector('body'),
    {
      pathPrefix: '',
      router: HashBrownRouter(SausageRouter()),
    },
  );

  globalStore.go = (event, path, params) => {
    if (event != null) {
      event.preventDefault();
    }
    stateRouter.go(path, params);
  };
  MainPage(stateRouter, globalStore);

  stateRouter.evaluateCurrentRoute('app');
});

