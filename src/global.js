import { writable } from 'svelte/store';

/* Global statefull params */
export const language = writable();
export const _ = writable(null);
export const go = writable(null);