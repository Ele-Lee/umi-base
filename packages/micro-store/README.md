# 用作微前端之前的通讯
主要用于存储父应用和父子应用的数据通讯，或者是iframe中使用

### 基本原理
> 放在最顶层的window下面的一个变量，多个子应用和单个主应用只会实例化一次，自动获取顶层window的变量。
> proxy的双向绑定
> wather的发布订阅模式

### 开始使用
```js
// 主应用
const ss = new MicroStore({ state, isMain: true })
// 子应用
const ss = new MicroStore({ state, name: 'subapp1' })
```

### 开始使用
```js
// 主应用, 只需要设置isMain，会校验是不是最高级的window
const s1 = new MicroStore({ state, isMain: true, state: { mainVal: 1 } }) 
// 子应用，需要起应用名
const ss = new MicroStore({ state, name: 'subapp1', state: { subVal: 2, obj: { b: 2 } } })
```

### 功能
+ 事件巴士，不区分父子应用
```js
ss.on(name: string, fn: (...args: any[]) => void) {} // 监听一个事件
ss.emit(name: string, ...args: any[]) {} // 监听一个事件
ss.once(name: string, fn: (...arg: any[]) => void) {} // 监听一个事件，只触发一次
ss.off(name: string, offcb: (...arg: any[]) => void) {} // 卸载一个事件
```
+ 取值
```js
// 方式1, 直接key的字符可以获取当前模块（当前应用）的值
ss.get('subVal')
// 方式2, 斜杠 或者 点，层层获取
ss.get('subapp1/subVal') || ss.get('subapp1.obj.b')
// 方式3
const subVal = ss.get(({subapp1})=>({b: subapp1.subVal}))
// 方式4, 获取当前应用对象，命名空间加一个斜杠
ss.get('subapp1/')
```
+ 设值
```js
// 斜杠或者点
ss.set('subapp1/obj/b', 22);
```
+ 监听值变化
```js
// 只能先监听了，才能再设值才会有效
ss.watch('subapp1/obj/a', (new, old) => {
  console.log(
    '%celelee test:',
    'background:#000;color:#11f',
    '变化',
    new,
    old,
  );
});
```
