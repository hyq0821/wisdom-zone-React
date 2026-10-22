import { componentMap } from './../router/routerMap';
import {post,get} from "../uitls/http/request"

interface LoginParams{
    username:string,
    password:string
}




// 登录接口
export function login(params:LoginParams){
    return post('/login',params)
}


// 获取菜单接口
export function getMenu(){
    return get('/menu')
}






