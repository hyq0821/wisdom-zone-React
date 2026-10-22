import React from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import RequireAuth from "../uitls/RequireAuth";

const Home = React.lazy(() => import("../page/home/index"));
const Login = React.lazy(() => import("../page/login/index"));
const NotFound = React.lazy(() => import("../page/404/index"));

// 静态路由
// const router=createBrowserRouter([
//     {
//         path:"/",
//         element:<RequireAuth allowed={true} redirectTo={"/login"}>
//             <Home/>
//             </RequireAuth>
//     },
//     {
//         path:"/login",
//         element:<RequireAuth allowed={false} redirectTo={"/"}>
//             <Login/>
//             </RequireAuth>
//     },
//     {
//         path:"*",
//         element:<NotFound/>
//     }

// ])

// export  default router

// const routes: RouteObject[]= [
//   {
//     path: "/",
//     element: (
//       <RequireAuth allowed={true} redirectTo={"/login"}>
//         <Home />
//       </RequireAuth>
//     ),
//   },
//   {
//     path: "/login",
//     element: (
//       <RequireAuth allowed={false} redirectTo={"/"}>
//         <Login />
//       </RequireAuth>
//     ),
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ];

export const routes: RouteObject[]=[
      {
        path:"/",
        element:<RequireAuth allowed={true} redirectTo={"/login"}>
            <Home/>
            </RequireAuth>
    },
    {
        path:"/login",
        element:<RequireAuth allowed={false} redirectTo="/dashboard">
            <Login/>
            </RequireAuth>
    },
    {
        path:"*",
        element:<NotFound/>
    }
]