/** Objetos falsos que imitam o mínimo necessário do navegador, para testar sem DOM. */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from '../../scripts/lib/features.js';

export function fakeEl() {
  const attributes = {};
  const classes = new Set();
  return {
    textContent: '',
    innerHTML: '',
    className: '',
    hidden: false,
    disabled: false,
    value: '',
    dataset: {},
    style: {},
    setAttribute(name, value) {
      attributes[name] = String(value);
    },
    getAttribute(name) {
      return attributes[name] ?? null;
    },
    classList: {
      add: (...names) => names.forEach((name) => classes.add(name)),
      remove: (...names) => names.forEach((name) => classes.delete(name)),
      contains: (name) => classes.has(name),
    },
  };
}

export function hasClass(el, name) {
  return el.className.split(/\s+/).includes(name) || el.classList.contains(name);
}

export function fakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    data,
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
  };
}

export function brokenStorage() {
  return {
    getItem() {
      throw new Error('storage bloqueado');
    },
    setItem() {
      throw new Error('storage bloqueado');
    },
  };
}

/** Cria um `fetch` falso que responde 200 com `payload` e registra as URLs chamadas. */
export function okFetch(payload) {
  const fn = async (url) => {
    fn.calls.push(url);
    return { ok: true, status: 200, json: async () => payload };
  };
  fn.calls = [];
  return fn;
}

export const mock = JSON.parse(readFileSync(path.join(ROOT, 'data/mock.json'), 'utf8'));
