import { WindowIndex, InitializeOption, SelectorParams } from './types';
import MicroCache from './cache';
import { assert, myGet, mySet, isObject, checkPathArr } from './util';
import { eventBusKeyOnWindow, storageCacheInsOnWindow, completeValuePathReg } from './constant';
import { MAIN_APP } from './constant';
import Bus from './bus';

class MicroStore {
  private namespace: string = '';
  private cacheInstance: MicroCache | null = null;
  private busInstance: Bus | null = null;

  constructor(option: InitializeOption) {
    const { isMain, state, name = '', isCover } = option;
    if (this.isParentWindow() && isMain) {
      assert(
        isMain && !name,
        '主应用应该设置 isMain: true, name 不需要设置，默认为 MAIN_APP',
        name,
      );
      this.namespace = MAIN_APP;
    } else {
      assert(!isMain, '子应用不能设置isMain为true');
      assert(name, '子应用命名空间不能为空');
      this.namespace = name;
    }
    this.initStorageObj(this.namespace, state || {}, !!isCover);
    this.initEventBus();
  }

  getFromMain(_key: string) {
    const topStorage = this.get(({ MAIN_APP }) => ({ MAIN_APP }));
    return topStorage[_key];
  }

  /**
   *
   * @param nameAndKey 用 / 或者 . 隔开模块
   * @param value
   */
  set(nameAndKey: string, value: any) {
    assert(typeof nameAndKey === 'string', '必须传一个key字符');
    assert(MAIN_APP !== nameAndKey, '不能使用主应用关键字');
    const keyArr = nameAndKey.split(/\.|\//);
    assert(checkPathArr(keyArr), '输入的改值路径有误', keyArr);
    if (/^\w+\.|\/\w+/.test(nameAndKey)) {
      return mySet(this.getCacheInstance().getStorage(), nameAndKey, value);
    }
    const moduleModel = this.getCacheInstance().get(this.namespace);
    moduleModel[nameAndKey] = value;
    return moduleModel;
  }

  get(selector?: SelectorParams) {
    if (typeof selector === 'string') {
      if (/^\w+\/$/.test(selector)) {
        return this.getCacheInstance().get(selector.slice(0, -1));
      }
      if (completeValuePathReg.test(selector)) {
        let _selector;
        if (/\w+\/$/.test(selector)) {
          _selector = selector.slice(0, -1);
        } else {
          _selector = selector;
        }
        return myGet(this.getCacheInstance().getStorage(), _selector);
      }
      assert(/^\w+$/.test(selector), '当前模块的Key有误', selector);
      const moduleModel = this.getCacheInstance().get(this.namespace);
      return moduleModel[selector];
    } else if (typeof selector === 'function') {
      return selector(this.getCacheInstance().getStorage());
    }
    return this.getCacheInstance().get(this.namespace);
  }

  getModulesList() {
    return Object.keys(this.getCacheInstance().getStorage());
  }

  getCurModulesKeys() {
    return Object.keys(this.getCacheInstance().get(this.namespace));
  }

  clear(moduleKey: string = this.namespace) {
    assert(moduleKey !== MAIN_APP, '不能清空main app的存储');
    if (this.namespace === MAIN_APP) {
      assert(moduleKey, '需要传入命名空间');
      this.getCacheInstance().clear(moduleKey);
    } else {
      assert(moduleKey === this.namespace, '子应用只能清除自己的命名空间');
      this.getCacheInstance().clear(this.namespace);
    }
    return this.getCacheInstance().getStorage();
  }

  /**
   *
   * @param valuePath module/xx
   * @param cb (new,old) => void
   */
  watch(valuePath: string, cb: (ov: any, nv: any) => void) {
    const keyArr = valuePath.split(/\/|\./);
    assert(checkPathArr(keyArr), '输入的改值路径有误', keyArr);
    let _namespace, _key;
    const _matchRes = valuePath.match(completeValuePathReg);
    if (_matchRes) {
      const divisionIdx = valuePath.lastIndexOf('/');
      _namespace = valuePath.substr(0, divisionIdx + 1);
      _key = valuePath.substr(divisionIdx + 1);
    } else {
      _namespace = this.namespace + '/';
      _key = valuePath;
    }
    // assert(this.getModulesKeys().includes(_key), '不存在监听的key', _key);
    this.getCacheInstance().watch(this.get(_namespace), _key, cb);
  }

  on(name: string, fn: (...args: any[]) => void) {
    this.getBusInstance().on(name, fn);
  }
  emit(name: string, ...args: any[]) {
    this.getBusInstance().emit(name, ...args);
  }
  once(name: string, fn: (...arg: any[]) => void) {
    this.getBusInstance().once(name, fn);
  }
  off(name: string, offcb: (...arg: any[]) => void) {
    this.getBusInstance().off(name, offcb);
  }

  private getCacheInstance() {
    if (!this.cacheInstance) throw 'no cacheInstance';
    return this.cacheInstance;
  }
  private getBusInstance() {
    if (!this.busInstance) throw 'no busInstance';
    return this.busInstance;
  }

  private initEventBus() {
    const win = this.getParentWindow();
    if (!win[eventBusKeyOnWindow]) {
      win[eventBusKeyOnWindow] = new Bus();
    }
    this.busInstance = win[eventBusKeyOnWindow];
  }

  private initStorageObj(name: string, initialData: object, isCover: boolean) {
    assert(name, '模块名有误');
    assert(isObject(initialData), '初始化模块必须用对象');
    const win = this.getParentWindow();
    if (!Reflect.has(win, storageCacheInsOnWindow)) {
      const cacheIns = new MicroCache({ [name]: initialData });
      Object.defineProperty(win, storageCacheInsOnWindow, {
        value: cacheIns,
        //不可枚举
        enumerable: false,
      });
    } else {
      // const fnType = isCover ? 'merge' : 'set';
      // console.log(
      //   '%celelee test:',
      //   'background:#000;color:#fff',
      //   win[storageCacheInsOnWindow],
      //   fnType,
      // );
      let tmpTarget = win[storageCacheInsOnWindow]['get'](name);
      // if (tmpTarget && tmpTarget.__isProxy) {
      //   tmpTarget.__isProxy = (tmpTarget.__isProxy || 0) + 1;
      // }
      if (tmpTarget && !isCover) {
        Object.keys(initialData).forEach(k => {
          // @ts-ignore
          tmpTarget[k] = initialData[k];
        });
        // win[storageCacheInsOnWindow]['set'](name, tmpTarget);
      } else {
        win[storageCacheInsOnWindow]['set'](name, initialData);
      }
    }

    this.cacheInstance = win[storageCacheInsOnWindow];
    // this.hadInit = true;
  }

  private isParentWindow(_window: WindowIndex = window) {
    return _window.parent === _window && _window.top === _window;
  }

  private getParentWindow(w: WindowIndex = window): WindowIndex {
    if (this.isParentWindow(w)) return w;
    return this.getParentWindow(w.parent);
  }
}

export default MicroStore;
