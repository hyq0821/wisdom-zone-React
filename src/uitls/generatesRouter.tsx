// 将菜单项数据 转成路由对象

import { RouteObject } from "react-router-dom";
import { componentMap } from "../router/routerMap";
interface MenuType {
  icon: string;
  key: string;
  label: string;
  children?: MenuType[];
}

export function generateRoutes(menu: MenuType[]):RouteObject[] {
  
  
  return menu.map((item: MenuType) => {
    const hasChildren = item.children;

    let routerObj: RouteObject = {
      path: item.key,
      element: hasChildren ? null : <>{componentMap[item.key]}</>,
    };
    // 如果有子路由，递归生成路由(点击是显示子路由的页面)
    if (item.children) {
      routerObj.children = generateRoutes(item.children);
    }

    return routerObj;
  });
}
