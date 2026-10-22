import { promises } from "dns";
import React, { use, useCallback, useEffect, useState } from "react";




type MyformData={
    [key:string]:any
}

interface DataFetcher<T>{
    (args:T&{page:number;pageSize:number}):Promise<any>
}
function useDataList<T extends MyformData,U>(initialFormData:T,fetchData:DataFetcher<T>) {
    const [dataList,setDataList]=useState<U[]>([])
    const [loading,setLoading]=useState(false)
    const [total,setTotal]=useState(0)
    const [page,setPage]=useState(1)
    const [pageSize,setPageSize]=useState(10)
    const [formData,setFormData]=useState<T>(initialFormData)

    const loadData=useCallback(async ()=>{
        setLoading(true)
        try{
           const {data:{list,total}}=await fetchData({...formData,page,pageSize});
           setDataList(list)
           setTotal(total)
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    },[fetchData,formData,page,pageSize])
    useEffect(()=>{
        loadData()
    },[loadData])

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setFormData(prevState=>({...formData,[name]:value}))
    }
    const onChange=(page:number,pageSize:number)=>{
        setPage(page)
        setPageSize(pageSize)
    }
    const reset=()=>{
        setFormData(initialFormData)
        setPage(1)
        setPageSize(10)
        
    }
    return {
    dataList,
    page,
    pageSize,
    total,
    loading,
    formData,
    setDataList,
    setPage,
    setPageSize,
    setTotal,
    setLoading,
    setFormData,
    loadData,
    onChange,
    handleChange,
    reset,
  }
}


export default useDataList