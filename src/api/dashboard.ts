// 获取工作台页面数据

import {get} from "../uitls/http/request"



export function getEnergyData() {
    return get("/energyData")
}