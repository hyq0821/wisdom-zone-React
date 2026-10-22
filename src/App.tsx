import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";

import { generateRoutes } from "./uitls/generatesRouter";
import { useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import { routes } from "./router";
import { getMenu } from "./api/users";
import { setMenu } from "./store/login/authSlice";
import { useDispatch } from "react-redux";
import { UseSelector } from "react-redux";
// 根组件
function App() {
  const { menuList } = useSelector((state: any) => state.authSlice);
  const [routess, setRouter] = useState<any>(null);
  const dispatch = useDispatch();
  const {token}=useSelector((state:any)=>state.authSlice)
  useEffect(() => {
    async function loadData() {
      const { data } = await getMenu();
      if (data.length) {
        dispatch(setMenu(data));
        const routers = generateRoutes(data); //动态创建的路由表
        const myRoutes = [...routes];
        myRoutes[0].children = routers; // 默认子路由

        if (myRoutes[0].children[0]) {
          // 设置默认路由
          myRoutes[0].children[0].index = true;
        }
        const router = createBrowserRouter(myRoutes);
        setRouter(router);
      } else {
        const router = createBrowserRouter(routes);
        setRouter(router);
      }
    }

    loadData();
  },[token]);

  return (
    <div className="App">
      <Suspense fallback={<p>加载中...</p>}>
        {routess ? 
        <RouterProvider router={routess} />
         : <p>加载中...</p>}
      </Suspense>
    </div>
  );
}

export default App;
