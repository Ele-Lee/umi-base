## demo启动过程 web + nodejs
前端：
1. yarn
2. yarn build:pkg
3. yarn + 下面的指令启动对应demo
```js
"dev:main": 主应用
"dev:sub1": 子应用1
"dev:sub2": 子应用1
"dev:next": nextjs自应用
```
后端：
1. cd ./services && yarn
> 本来想写个假服务，返回一些接口，但是懒，只写了半个吧
2. cd ./services yarn start


---------
## 插件协议结构


### 前置知识
1. Umi的协议结构
2. dva是自带的redux
3. 巴拉巴拉

### 结构
目录结构和打包和果皮一样

## 插件
#### 布局插件 mlayout
布局插件，包括了顶部栏和侧边栏。父和子都装上，方便子的调试，在微前端渲染时候，子的mlayout会隐藏，只渲染内容。

同时接通dva的redux， models > microLayout，可参考（参考：mainapp）
也是一个配置入口，理论都支持 除了“injectMenuPlugin” 之外的配置（没有就自己补上去），优先级比umirc高。

##### 文件结构
参考：mainapp的 mlayout文件夹
* headerMenu 顶部

##### umirc 配置项：
```js
mlayout: {
  subname: string;
  headerTitle?: string;
  hideContentByLoginning?: boolean; //如果正在请求登录信息的接口，隐藏内容
  menuConfig?:  {
    title: string;
    name?: string;
    path?: string;
    icon?: string; // TODO，嵌入antd的icon
    children?: this[];
  }[],
  headerLogo?: string;
  globalHeaderHeight?: number;
  hideHeader?: boolean;
  hideSideMenu?: boolean;

  injectMenuPlugin?: ['@@/elelee-layout-login/MenuItemLogin'],
},
```
##### 梦想型操作
侧边栏配置，开发环境数据表`portal_home_side_menus`，接口分支@张骏腾

dva > modal > subscriptions > init，去请求配置，并重新设置menuConfig。

参考：mainapp


#### 通讯库 micro-store
具体文档在其子目录的readme

无umirc配置项

#### 登录插件
以`micro-store`为基础，结合mlayout，以其为基础盒子，填到右上角

简单原理：编译组件到`.umi`里面，路径为A，同时在 mlayout 的配置中设置这个路径A

无umirc配置项
```js
mlayout: {
  injectMenuPlugin: ['@@/elelee-layout-login/MenuItemLogin'],
},
```


```js
import { useUserInfo } from 'umi';

...
const infoData = useUserInfo();  // 获取身份信息
...
```
#### 工具插件 plugin-sub-utils
只是抽象一些方法
