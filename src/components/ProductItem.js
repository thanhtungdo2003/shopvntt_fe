import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const container = () => { return <div></div> }
const ContainerStyled = styled.div`
    height: 250px;
    background-color:rgb(251, 251, 251);
    margin: 10px 0px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.13);
    cursor: pointer;
    .product-item-prop{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowarp;
        width: 160px;
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
`;
function ProductItem({id, displayName, categoryName, price, img, categorySlug }) {
    const nav = useNavigate();
    
    const handlerClick = (e) => {
        nav(`/${categorySlug}/${e.currentTarget.id}`);
        window.scrollTo(0, 0); // Cuộn lên đầu trang

    }
    return (
        <>
            <ContainerStyled onClick={handlerClick} id={id}>
                <div style={{ width: "160px", height: "160px", backgroundColor: "#c4c4c4", margin: "2.5px auto" }}>
                    <img style={{ width: "160px", height: "160px", objectFit: "cover" }} src={img} />
                </div>
                <div style={{ paddingLeft: "5px" }}>
                    <div className="product-item-prop" style={{ fontSize: "14px" }}>{displayName}</div>
                    <div className="product-item-prop" style={{ fontSize: "12px", color: "#454545" }}>{categoryName}</div>
                    <div className="product-item-prop" style={{ fontSize: "14px", color: "red" }}>{"đ " + price.toLocaleString('de-DE')}</div>
                </div>
            </ContainerStyled>
        </>
    )
}
export default ProductItem;