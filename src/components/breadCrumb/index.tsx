
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { title } from "process"
import { Breadcrumb } from "antd"


interface MenuItem{
    key:string,
    label:string,
    children?:MenuItem[]
}
function findBreadCrumbPath(path:string,menuItems:MenuItem[]) :string[]{
    const pathSegments:string[]=[]
    function findPath(currentPath:string,items:MenuItem[]){
        for (let item of items) {
            // currentPath.startsWith(item.key)表示当前路径以什么开头
            if (currentPath.startsWith(item.key)) {
                pathSegments.push(item.label)               

                // 如果有子路由，递归调用
                if (item.children) {
                    findPath(currentPath,item.children)
                }

                break;
            }
            
        }
        return pathSegments
    }
    return findPath(path,menuItems)
}









function MyBreadCrumb(){
    // 通过路径获取当前路由
    const location = useLocation()
    const { menuList } = useSelector((state: any) => state.authSlice)
    const breadList=findBreadCrumbPath(location.pathname,menuList).map(item=>({title:item}))
    console.log(breadList);
    
    return(
        <div>
             <Breadcrumb items={breadList}  className="mt mb"/>
        </div>
    )
}

export default MyBreadCrumb