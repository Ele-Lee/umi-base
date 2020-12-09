export function assert(condition: any, msg: string = '', verifyVal?: any) {
  if (!condition) {
    // 不使用 new Error
    throw `[值无效] ${msg}, 当前值：${verifyVal ? JSON.stringify(verifyVal) : condition}`;
  }
}

export function myGet(
  obj: { [key: string]: any },
  path: string | string[],
  defaultVal: any = undefined,
) {
  const paths = Array.isArray(path) ? path : path.replace(/\[(\d+)\]/g, '.$1').split(/\/|\./);
  return paths.reduce((o, k) => (o || {})[k], obj) || defaultVal;
}

export function mySet(obj: { [key: string]: any }, path: string | string[], value: any) {
  const paths = Array.isArray(path) ? path : path.replace(/\[(\d+)\]/g, '.$1').split(/\/|\./);
  if (paths && paths.length) {
    const lastKey = paths.pop() as string;
    const last = myGet(obj, paths.join('.'));
    last[lastKey] = value;
  }
  return obj;
}

export function isObject(value: any) {
  return typeof value === 'object' && !Array.isArray(value);
}

export function checkPathArr(keyArr: string[]) {
  return keyArr.length === keyArr.filter(k => !!k).length;
}
