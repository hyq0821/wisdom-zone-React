import axios,{AxiosInstance,InternalAxiosRequestConfig,AxiosResponse} from "axios"
import {message} from "antd"
import {store} from "../../store"




// 创建axios实例(AxiosInstance是axios的实例类型)
const http:AxiosInstance = axios.create({
    baseURL: "https://www.wisdom.com",
    timeout: 5000,       // 请求超时时间

})


// 请求拦截器
http.interceptors.request.use((config:InternalAxiosRequestConfig) => {     //config请求参数
    const token=store.getState().authSlice
    if(token){
        // 在请求头中添加token(Authorization是专门用来携带认证信息)
        // Bearer是认证方式,表示一种认证类型,表示后面携带的是一个token
        config.headers['Authorization']=`Bearer ${token}`
    }

    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});



// 响应拦截器
http.interceptors.response.use((response:AxiosResponse) => {
    const res=response.data
    if(res.code!==200){
        message.error(res.code+":"+res.message)
        // 把错误信息抛出
        return Promise.reject(new Error(res.message||"Error"))
    }
    // 对响应数据做点什么
    return response.data;       //发送请求后得到的结果(必须要写)
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default http;