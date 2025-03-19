import { Delete } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminCategoryItem({id, displayName, amount, slug}){
    const nav = useNavigate();
    const clickHandle = ()=>{
        nav("/manager/product/"+slug);
    }
    return (<>
        <div className="category-admin-item" onClick={clickHandle}>
            <div className="category-admin-item-name">
                {displayName}
            </div>
            <div className="category-admin-item-amount">
                {amount}
            </div>
            <div className="category-admin-item-option">
                <button><Delete color="rgb(233, 59, 59)"/></button>
            </div>
        </div>
    </>)
}
export default AdminCategoryItem;