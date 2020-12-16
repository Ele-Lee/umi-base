export function omitByKey(arr: any[], key: string, childArrKey = 'children') {
  return arr.map(item => {
    if (Array.isArray(item[childArrKey])) {
      item[childArrKey] = omitByKey(item[childArrKey], key, childArrKey);
    }
    const tmp = { ...item };
    Reflect.deleteProperty(tmp, key);
    return tmp;
  });
}
