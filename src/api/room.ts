import { post } from "../uitls/http/request";
export function getRoomList(roomid:string){
    return post('/roomList',{roomid})
}