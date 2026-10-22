import { DataType } from "../page/users/interface";
import {post,get} from "../uitls/http/request"
interface searchType{
    page:number;
    pageSize:number;
    companyName?:string;
    contact?:string;
    tel?:string;
}



// 获取租户
export function getUserList(data:searchType){
    return post("/userList",data)
}


// 删除企业
export function deleteUser(id:string){
    return post("/deleteUser",{id})
}



// 批量删除
export function batchDeleteUser(ids:React.Key[]){
    return post("/batchDeleteUser",{ids})
}


// 编辑/新增 
export function editUser(data:DataType){
    return post("/editUser",data)
}