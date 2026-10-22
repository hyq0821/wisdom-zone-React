import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import icons from "./iconList";
import logo from "../../assets/logo.png";
import "./index.scss";
import {  useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// 菜单项类型定义,Required必填
//<MenuProps>['items']取出MenuProps['items']类型,
//[number]数组中的类型
// type MenuItem = Required<MenuProps>['items'][number];

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

// 后端返回的数据类型(图标用字符串表示)
interface MenuItemFromData {
  key: string;
  label: string;
  icon?: string;
  children?: MenuItemFromData[];
}

function NavLeft() {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const { menuList } = useSelector((state: any) => state.authSlice);
  const location=useLocation();
 
  useEffect(() => {
    configMenu();
  }, [menuList]);



  // 发送请求获取菜单数据(根据携带token类型不同)
  async function configMenu() {
    // 将后端返回的数据转换成所需要的数据类型
    const mappedMenuItems: MenuItem[] = mapMenuItems(menuList);
    setMenuData(mappedMenuItems);
  }

  // 将返回的数据转换成所需要的数据类型
    function mapMenuItems(items:MenuItemFromData[]):any{
        return items.map((item:any)=>({
            key:item.key,
            label:item.label,
            icon:icons[item.icon],
            children:item.children ? mapMenuItems(item.children) : null //递归操作
        }))
    }

  //点击菜单 路由跳转
  function handleClick({key}:{key:string}) {
    navigate(key)
  }

  return (
    <div className="navleft">
      <div className="logo">
        <img src={logo} alt=""  width={20}/>
        <h1>朋远智慧园区</h1>
      </div>
      <Menu
        defaultSelectedKeys={["/dashboard"]} //默认选中的是哪项(["1"]表示第一项)
        mode="inline" //菜单模式
        theme="dark"
        // inlineCollapsed={collapsed}         //是否折叠菜单的状态
        items={menuData} //菜单项(数组)
        onClick={handleClick}
        selectedKeys={[location.pathname]}
      />
    </div>
  );
}

export default NavLeft;
