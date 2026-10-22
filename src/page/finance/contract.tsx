// 合同管理页面

import { Card,Table,Row,Col,Input,Button, TableProps, Tag, Pagination, PaginationProps } from "antd"
import { useEffect, useState } from "react"
import { getContractList } from "../../api/contract"
import { useDispatch,useSelector } from "react-redux"
import contract, { setCurrent, setData,setFormList,setSize,setTotal } from "../../store/finance/contractSlice"
import { useNavigate, useSearchParams } from "react-router-dom"

interface SearchType{
  contractNo:string,
  person:string,
  tel:string
}
interface  DataType{
  key:string,
  contractNo:string,
  type:string,
  name:string,
  startDate:string,
  endDate:string,
  jia:string,
  yi:string,
  status:string
}

function Contract() {
  const [formData,setFormData]=useState<SearchType>({
      contractNo:'',
      person:'',
      tel:''
  })


  const columns:TableProps<DataType>['columns']=[
      {
          title:"No.",
          key:"index",
          render:(text,record,index)=>index+1
      },
      {
          title:"合同编号",
          dataIndex:"contractNo",
          key:"contractNo"
      },
      {
          title:"合同类别",
          dataIndex:"type",
          key:"type"
      },
      {
          title:"合同名称",
          dataIndex:"name",
          key:"name"
      },
      {
          title:"合同开始日期",
          dataIndex:"startDate",
          key:"startDate"
      },
      {
          title:"合同结束日期",
          dataIndex:"endDate",
          key:"endDate"
      },
      {
          title:"甲方",
          dataIndex:"jia",
          key:"jia"
      },
      {
          title:"乙方",
          dataIndex:"yi",
          key:"yi"
      },
      {
          title:"审批状态",
          dataIndex:"status",
          key:"status",
          render(value){
              if(value==1){
                return <Tag >待审批</Tag>
              }else if(value==2){
                return <Tag color="green">审批通过</Tag>
              }else{
                return <Tag color="red">审批拒绝</Tag>
              }
            }
      },
      {
          title:"操作",
          key:"operation",
          render(value,record){
              return <Button type="primary" size="small"
               onClick={()=>detail(record.contractNo)}>
                合同详情</Button>
          }
      }

      
  ]



  const [page,setPage]=useState<number>(1)
  const [pageSize,setPageSize]=useState<number>(10)
  const dispatch=useDispatch()
  const [loading,setLoading]=useState<boolean>(false)
  const {data,total,formList,current,size}=useSelector((state:any)=>state.contractSlice)
  const navgate=useNavigate()
  const [searchParams]=useSearchParams()
  const isReturn=searchParams.get('return')


  const handleChange=(e:any)=>{
      const {name,value}=e.target
      setFormData(prevState=>({
          ...prevState,
          [name]:value
      }))
      dispatch(setFormList({
          ...formData,
          [name]:value
      }))
  }
    const loadData=async(page:number,pageSize:number)=>{
      setLoading(true)
      const {data:{list,total}}=await getContractList(
        {...formData,page,pageSize}
      )
      setLoading(false)
      dispatch(setData(list))
      dispatch(setTotal(total))
      
  }
  const onChange:PaginationProps["onChange"]=(page:number,pageSize:number)=>{
      setPage(page)
      setPageSize(pageSize)
      dispatch(setCurrent(page))
      dispatch(setSize(pageSize))
      loadData(page,pageSize)
  }
  const detail=(contractNo:string)=>{
      navgate('/finance/surrender?contractNo='+contractNo)
  }
  const resert=()=>{
      setFormData({
          contractNo:'',
          person:'',
          tel:''
      })
      setPage(1)
      setPageSize(10)
      loadData(1,10)
  }

  useEffect(()=>{
      
      if(!isReturn || !data.length){
        loadData(page,pageSize)
      }

      if(isReturn){
          setFormData(formList)
          setPage(current)
          setPageSize(size)
      }
  },[])

  return (
    <div className="contract">
      <Card className="search">
        <Row gutter={16}>
          <Col span={7}>
            <p>合同编号:</p>
            <Input name="contractNo" value={formData.contractNo} onChange={handleChange}/>
          </Col>
           <Col span={7}>
            <p>合同编号:</p>
            <Input name="person" value={formData.person} onChange={handleChange}/>
          </Col>
           <Col span={7}>
            <p>合同编号:</p>
            <Input name="tel" value={formData.tel} onChange={handleChange}/>
          </Col>
          <Col span={3}>
            <Button type="primary" onClick={()=>loadData(page,pageSize)}>查询</Button>
            <Button  className="ml" onClick={resert}>重置</Button>
          </Col>
        </Row>
      </Card>
      <Card className="mt">
        <Table 
        columns={columns} 
        pagination={false} 
        loading={loading}
        dataSource={data}
        rowKey={(record)=>record.contractNo}
        ></Table>
        <Pagination className="fr mt" 
        showQuickJumper defaultCurrent={1}
        total={total}
        onChange={onChange}
        current={page}
        pageSize={pageSize}/>
      </Card>
      
        
    </div>
  )
}
export default Contract