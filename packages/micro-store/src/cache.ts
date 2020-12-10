import { CacheInterface, keyInterface, ModuleObj, OnChangeFn } from './types';
import hash from './hash';
import { isObject, assert } from './util';

let uid = 0;

class Dep {
  subs: Watcher[];
  id: number;
  static target: Watcher | null;
  constructor() {
    // 设置id,用于区分新Watcher和只改变属性值后新产生的Watcher
    // 储存订阅者的数组
    this.id = uid++;
    this.subs = [];
  }
  // 触发target上的Watcher中的addDep方法,参数为dep的实例本身
  depend(watcherId: string) {
    if (Dep.target) {
      Dep.target.addDep(this, watcherId);
    }
  }
  // 添加订阅者
  addSub(sub: Watcher) {
    this.subs.push(sub);
  }
  notify(propKey: string, newVal: any) {
    // 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理
    this.subs.forEach(sub => {
      if (sub.expOrFn === propKey) sub.update(newVal);
    });
  }
}

Dep.target = null;

class Watcher {
  depIds: any;
  storage: ModuleObj;
  cb: OnChangeFn;
  expOrFn: any;
  val: any;
  constructor(storage: ModuleObj, expOrFn: string, cb: OnChangeFn) {
    this.depIds = {};
    this.storage = storage;
    this.cb = cb;
    this.expOrFn = expOrFn;
    this.val = this.watcherGet();
  }

  update(newVal: any) {
    this.run(newVal);
  }
  addDep(dep: Dep, watcherId?: string) {
    // if (watcherId !== this.expOrFn) return;

    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this);
      // this.depIds[this.expOrFn] = dep;
      this.depIds[dep.id] = dep;
    }
  }

  run(newVal: any) {
    const val = this.watcherGet(true);
    if (val !== newVal) {
      // if (val !== this.val) {
      this.cb.call(this.storage, newVal, val);
      // this.val = val;
      this.val = newVal;
    }
  }
  watcherGet(isRun?: boolean) {
    // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者

    if (!isRun) {
      Dep.target = this;
    } // 不是初始化就不要设，proxy会多次调用
    const val = this.storage[this.expOrFn];
    // 置空，用于下一个Watcher使用
    !isRun && (Dep.target = null);
    return val;
  }
}

class Observer {
  value: ModuleObj;
  constructor(value: ModuleObj) {
    this.value = this.walk(value);
  }
  getValue() {
    return this.value;
  }
  // 遍历属性值并监听
  walk(value: ModuleObj) {
    if (Object.isFrozen(value)) {
      return value;
    }
    Object.keys(value).forEach(itemKey => {
      if (typeof value[itemKey] === 'object') {
        value[itemKey] = this.walk(value[itemKey]);
      }
    });
    return this.convert(value);
  }
  // 执行监听的具体方法
  convert(value: ModuleObj) {
    if (Object.isFrozen(value)) {
      return value;
    }
    const dep = new Dep();
    Object.defineProperty(value, '__isProxy', {
      value: 1,
      //是否为枚举属性
      enumerable: false,
    });
    const temp = new Proxy(value, {
      get(target, propKey, receiver) {
        if (Dep.target) {
          dep.depend(propKey as string);
        }
        return Reflect.get(target, propKey, receiver);
      },
      set(target, propKey, value, receiver) {
        if (value === receiver[propKey]) return value;
        dep.notify(propKey as string, value);
        return Reflect.set(target, propKey, value, receiver);
      },
    });
    return temp;
  }
}

function observe(value: any): ModuleObj {
  // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
  if (!value || typeof value !== 'object') {
    return value;
  }
  return new Observer(value).getValue();
}

export default class MicroCache implements CacheInterface {
  private __cache!: ModuleObj;
  // private __listeners: cacheListener[];

  constructor(initialData: ModuleObj = {}) {
    // this.__listeners = [];
    this.setCache(observe(initialData));
  }

  getCache() {
    return this.__cache;
  }
  setCache(innerCache: ModuleObj) {
    this.__cache = innerCache;
    return this;
  }

  watch(moduleSpace: ModuleObj, key: string, cb: (ov: any, nv: any) => void) {
    new Watcher(moduleSpace, key, cb);
  }

  getStorage() {
    return this.__cache;
  }

  get(key: keyInterface): any {
    const [_key] = this.serializeKey(key);
    return this.__cache[_key];
  }

  merge(key: keyInterface, value: object) {
    const [_key] = this.serializeKey(key);
    assert(isObject(value), 'merge: value不是Object');
    Object.entries(value).forEach(([itemKey, itemValue]) => {
      this.__cache[_key][itemKey] = observe(itemValue);
    });
    return this.__cache[_key];
  }

  set(key: keyInterface, value: any): any {
    const [_key] = this.serializeKey(key);
    this.__cache[_key] = observe(value);
    return this.__cache[_key];
  }

  has(key: keyInterface) {
    const [_key] = this.serializeKey(key);
    return Reflect.has(this.__cache, _key);
  }

  clear(key: keyInterface) {
    const [_key] = this.serializeKey(key);
    Reflect.deleteProperty(this.__cache, _key);
    return this.__cache;
  }

  serializeKey(key: keyInterface | Function): [string, any, string] {
    let args = null;
    if (typeof key === 'function') {
      try {
        key = key();
      } catch (err) {
        // dependencies not ready
        key = '';
      }
    }

    if (Array.isArray(key)) {
      // args array
      args = key;
      key = hash(key);
    } else {
      // convert null to ''
      key = String(key || '');
    }

    const errorKey = key ? 'err@' + key : '';

    return [key, args, errorKey];
  }

  // subscribe(listener: cacheListener) {
  //   if (typeof listener !== 'function') {
  //     throw new Error('Expected the listener to be a function.');
  //   }

  //   let isSubscribed = true;
  //   this.__listeners.push(listener);

  //   return () => {
  //     if (!isSubscribed) return;
  //     isSubscribed = false;
  //     const index = this.__listeners.indexOf(listener);
  //     if (index > -1) {
  //       this.__listeners[index] = this.__listeners[this.__listeners.length - 1];
  //       this.__listeners.length--;
  //     }
  //   };
  // }
}
