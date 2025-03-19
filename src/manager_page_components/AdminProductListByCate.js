import axios from "axios";
import { Boxes, PlusSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminProductItem from "./AdminProductitem";

function AdminProductListByCate() {
    const { category_slug } = useParams();
    const [products, setProducts] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    useEffect(() => {
        axios.post("http://localhost:3000/api/products-get-by-params", {
            row: 10,
            page: 1,
            keyword: "",
            category_slug: category_slug,
            sort: "newest",
            get_type: ""
        }).then((res) => {

            if (!res.data) return <></>;
            const productsDatas = res.data;
            setCategoryName("");
            
            setProducts(productsDatas.map((p, index) => {
                const imgNames = JSON.parse(p.product_imgs);
                const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];
                setCategoryName(p.category_name)

                return (<AdminProductItem
                    key={p.product_id}
                    id={p.product_id}
                    displayName={p.display_name}
                    categoryName={p.category_name}
                    price={p.price}
                    categorySlug={p.category_slug}
                    img={`http://localhost:3000/api/product/get-imgs/product_imgs/` + imageName}
                />)
            }))
        })
    }, [category_slug])
    return (
        <>
            <div className="category-admin-title">
                <div className="titles">
                    <Boxes color="rgb(119, 119, 119)" size="4vh" />
                    <p style={{ flex: "10", fontSize: "2.6vh", width: "50vh", color: "rgb(120, 120, 120)", borderBottom: "3% solid rgb(100, 100, 100)" }}>Danh sách sản phẩm ({categoryName})</p>
                </div>
                <div>
                    <button><PlusSquare color="rgb(255, 255, 255)" size="auto" /></button>
                </div>
            </div>
            <div className="admin-product-items">
                {products}
            </div>
        </>
    )
}
export default AdminProductListByCate;