import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Delete, Link, Link2 } from "lucide-react";
import { useManager } from "./AdminContext";
import axios from "axios";
import { getUri } from "../js/site";
import { toast, ToastContainer } from "react-toastify";
const container = () => { return <div></div> }
const ContainerStyled = styled.div`
    height: auto;
    max-width: 100%;
    background-color:rgba(6, 6, 6, 0.04);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 2vh;
    overflow: hidden;
    border-radius: 1vh;
    padding: 1vh;
    .product-item-prop{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowarp;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    &:hover{
        transition-duration: 0.3s;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.17);
    }
    &:active{
        transition-duration: 0.3s;
        box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.17);
    }
    .product-item-button{
        width: 30px;
        display:flex;
        align-item:center;
        justify-content: center;
        border-radius:1vh;
        &:hover{
            background-color: rgba(253, 253, 253, 0.53);
        }
    }
`;
function AdminProductItem({ id, displayName, categoryName, price, img, categorySlug, createAt }) {
    const productManager = useManager();

    const nav = useNavigate();

    const openProductDetailUser = (e) => {
        nav(`/${categorySlug}/${id}`);
        window.scrollTo(0, 0); // Cuộn lên đầu trang

    }
    const handleClick = (e) => {
        axios.get(getUri() + "/products/" + id).then((res) => {
            const product = res.data[0];
            productManager.setProduct(product);
           
        }).catch((err) => {
            toast.error(err.status + " Lỗi khi lấy chi tiết sản phẩm!", { position: "top-right" });
        })
    }
    return (
        <>
            <ToastContainer />
            <ContainerStyled onClick={handleClick} id={id}>
                <div style={{ flex: "1" }}>
                    <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={img} />
                </div>
                <div style={{ flex: "8", gap: "5%", display: "flex", alignItems: "center" }}>
                    <div className="product-item-prop" style={{ fontSize: "18px" }}>{displayName}</div>
                    <div className="product-item-prop" style={{ fontSize: "12px", color: "#454545" }}>{categoryName}</div>
                    <div className="product-item-prop" style={{ fontSize: "12px", color: "#454545" }}>{createAt}</div>
                    <div className="product-item-prop" style={{ fontSize: "14px", color: "red" }}>{"đ " + price.toLocaleString('de-DE')}</div>
                </div>
                <div style={{ flex: "1", gap: "10px", display: "flex", alignItems: "center" }}>
                    <div className="product-item-button">
                        <Link2 color="#666" onClick={openProductDetailUser} />
                    </div>
                    <div className="product-item-button">
                        <Delete color="red" />
                    </div>
                </div>
            </ContainerStyled>
        </>
    )
}
export default AdminProductItem;