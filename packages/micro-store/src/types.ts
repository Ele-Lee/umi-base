import { eventBusKeyOnWindow, storageCacheInsOnWindow } from './constant';
import MicroCache from './cache';
import Bus from './bus';

export type ModuleObj = { [x: string]: any };
export type OnChangeFn = (olcVal: any, newVal: any) => void;

export type keyInterface = string | any[] | null;
export interface CacheInterface {
  get(key: keyInterface): any;
  set(key: keyInterface, value: any): any;
  // keys(): string[];
  has(key: keyInterface): boolean;
  // delete(key: keyInterface): void;
  clear(key?: keyInterface): ModuleObj;
  serializeKey(key: keyInterface): [string, any, string];
  // subscribe(listener: cacheListener): () => void;
}

export interface EventBusInterface {
  on(name: string, fn: (...arg: any[]) => void): void;
  emit(name: string, ...args: any[]): void;
  once(name: string, fn: (...arg: any[]) => void): void;
  off(name: string, cb: () => void): void;
}

// export type cacheListener = () => void;

declare global {
  interface Window {
    [eventBusKeyOnWindow]: Bus;
    [storageCacheInsOnWindow]: MicroCache;
  }
}

export type WindowIndex = (Window & typeof globalThis) | Window;

export interface InitializeOption {
  isMain?: boolean;
  name?: InitializeOption['isMain'] extends true ? undefined : string;
  state?: object;
  isMerge?: boolean;
}

type StandardObj = { [key: string]: any };
export type SelectorFn = (p: StandardObj) => StandardObj;
export type SelectorParams = string | SelectorFn;

export type ValueListener = (newVal: any, oldVal: any) => void;
