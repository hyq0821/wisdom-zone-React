

import React from 'react';

import {  useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Iprops{
    allowed:boolean;
    redirectTo:string;
    children:React.ReactNode
}

//如果 allowed 为 true（意味着访问当前路由需要⽤户已登录），且 isLoggedIn() 也返回 true（⽤户已登
// 录），则表达式的结果为 true，⽤户可以访问该路由。
//如果 allowed 为 false（意味着访问当前路由不需要⽤户登录），但 isLoggedIn() 返回 true 或 
// false，则会根据具体的检查决定是否允许访问或重定向到其他⻚⾯。

function RequireAuth({allowed,redirectTo,children}:Iprops) {
    const {token}=useSelector((state:any)=>state.authSlice)
    // 携带token则是登录
    const isLogin=token?true:false
    const navigate=useNavigate()
    useEffect(()=>{
        // allowed表示当前路由是否需要登录,isLogin表示用户是否需要登录
       
        if(allowed!==isLogin){
            navigate(redirectTo)
        }
    },[isLogin,allowed,redirectTo,navigate])

    return allowed===isLogin?<>{children}</>:<></>
}


export default RequireAuth;