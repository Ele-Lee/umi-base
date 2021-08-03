// @ts-nocheck
import { Reducer, Subscription, Action } from 'umi';
// import MicroStore from '@grfe/micro-store';
// import { omitByKey } from '@/utils/recursive';
import _cloneDeep from 'lodash/cloneDeep';
import { MenuConfig, AppOption } from '@grfe/micro-layout/lib/typings/typing';
// import { apps, menus as originMenus } from '../../config';
import { getMenuFromConfigTB } from '@/services/menu';

export type MainAppModelState = {
  menus: MenuConfig[] | null;
  headerTitle: string;
  hideContentByLoginning?: boolean;
  globalLoading?: boolean;
};
export interface IMainAppModel {
  state: MainAppModelState;
  effects: {};
  reducers: {
    save: Reducer<MainAppModelState>;
  };
  subscriptions: { init: Subscription };
}

const defaultState = {
  menus: null,
  headerTitle: '果肉运营后台基座 in main',
  hideContentByLoginning: true,
};

const MainAppModel: IMainAppModel = {
  state: defaultState,
  reducers: {
    save(state: MainAppModelState, action: { payload: any }) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
    // saveRoute(state, action) {
    //   if (!state) return defaultState;
    //   const newRoutes = _cloneDeep(state?.menus);
    //   action.payload.forEach((item: any) => {
    //     const tmp = newRoutes?.find(item2 => item2.title === item.title);
    //     if (tmp) {
    //       tmp.children = item.children;
    //     }
    //   });
    //   return {
    //     ...state,
    //     menus: newRoutes,
    //   };
    // },
  },
  effects: {},
  subscriptions: {
    init({ dispatch, history }) {
      getMenuFromConfigTB().then(res => {
        dispatch({
          type: 'save',
          payload: {
            menus: [
              // ...res,
              {
                title: '子应用Aitem1',
                path: '/subapp1',
                children: [
                  {
                    title: '子菜单1',
                    icon: 'CarOutlined',
                    path: '/sub-item',
                  },
                  {
                    title: '子菜单2',
                    icon: 'CarOutlined',
                    path: '/sub-item2',
                  },
                  {
                    title: '子菜单3',
                    path: '/sub-item3',
                  },
                ],
              },
              // {
              //   title: 'subapp2',
              //   path: '/subapp2',
              //   children: [
              //     {
              //       title: '子菜单2',
              //       icon: 'CarOutlined',
              //       path: '/sub-item2',
              //     },
              //     {
              //       title: '子菜单3',
              //       path: '/sub-item3',
              //     },
              //   ],
              // },
              {
                title: 'test2',
                path: '/test2',
              },
            ],
          },
        });
      });
    },
  },
};
export default MainAppModel;
