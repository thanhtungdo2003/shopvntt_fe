import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import downIcon from "../lib/down-chevron-svgrepo-com.svg"
import { ProductProvider, useProduct } from "./ProductsContext";

function CategoryPage() {
    const {keyword} = useParams();
    const {page, setPage} = useProduct();
    const {row, setRow} = useProduct();
    const {searchKeyword, setSearchKeyword} = useProduct();
    const {categorySlug, setCategorySlug} = useProduct();
    const {sortType, setSortType} = useProduct();
    const {getType, setGetType} = useProduct();

    const [sortTypeName, setSortTypeName] = useState("Giá");
    const handleClickSortType = (content) => {
        setSortTypeName(content);
    }
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        axios.post("http://localhost:3000/api/products-get-by-params",{
            row: row,
            page: page,
            keyword: keyword,
            category_slug: categorySlug,
            sort: sortType,
            get_type: getType
        })
            .then((res) => {
                if (!res.data) return <></>;
                const productsDatas = res.data;
                setProducts(productsDatas.map((p, index) => {
                    const imgNames = JSON.parse(p.product_imgs);
                    const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                    return (<ProductItem
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
    }, [categorySlug, page, row, sortType, keyword, getType])

    return (
        <>
            <div style={{ position: "sticky", top: "70px", maxWidth: "100%", height: "40px", backgroundColor: "rgba(1, 1, 1, 0.08)", backdropFilter: "blur(10px)", display: "flex", padding: "10px", alignItems: "center", justifyContent: "space-between" }}>
                <div className="product-show-option-container" style={{ display: "flex", width: "75%", height: "40px", alignItems: "center", gap: "7px" }}>
                    <p>Sắp xếp theo</p>
                    <button>Phổ biến</button>
                    <button>Mới nhất</button>
                    <button>Bán chạy</button>
                    <div className="sort-type-select-container">
                        <div className="sort-type-content" style={{ width: "80%" }}>
                            <p>{sortTypeName}</p>
                            <div className="sort-type-option-container">
                                <div onClick={() => { handleClickSortType("Giá: từ thấp đến cao") }}>
                                    Giá: từ thấp đến cao
                                </div>
                                <div onClick={() => { handleClickSortType("Giá: từ cao đến thấp") }}>
                                    Giá: từ cao đến thấp
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "20%" }}>
                            <img style={{ width: "20px", height: "20px" }} src={downIcon} />
                        </div>
                    </div>
                </div>
                <div className="page-control-container">
                    <p>{page}</p>
                    <div>
                        <button disabled={page === 1}>{"<"}</button>
                        <button>{">"}</button>
                    </div>
                </div>
            </div>
            <div style={{ gap: "10px", display: "grid", gridTemplateColumns: "170px 170px 170px 170px 170px" }}>
                {products}
            </div>
        </>
    )
}
export default CategoryPage;