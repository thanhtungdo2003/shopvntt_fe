import axios from "axios";
import { useEffect, useState } from "react";
import { getUri } from "../js/site";

function ShopFooter() {
    const [cateItems, setCateItem] = useState([]);
    useEffect(()=>{
        axios.get(`${getUri()}/category/get-all`)
        .then((res)=>{
            const categorys = res.data;
            setCateItem(categorys.map((cate, index) => {
                return <a style={{cursor:"pointer"}}>{cate.category_name}, </a>;
            }))
        })
    }, [])
    return (
        <>
            <div className="scrollback-container">
                <a href="#container"><button>Lên trên cùng</button></a>
            </div>
            <div class="footer-2">
                <div class="footer-gioithieu">
                    <div>GIỚI THIỆU</div>
                    <span>
                        VNTT chuyên cung cấp máy tính, laptop, linh kiện và phụ kiện chính hãng với giá cạnh tranh. Chúng tôi cam kết mang đến sản phẩm chất lượng, bảo hành uy tín và dịch vụ tư vấn chuyên nghiệp. Với nhiều lựa chọn từ PC gaming, laptop văn phòng đến thiết bị hỗ trợ làm việc, VNTT là địa chỉ tin cậy cho khách hàng yêu công nghệ.
                    </span>
                </div>
                <div class="footer-top">
                    <div>TOP SẢN PHẨM</div>
                    <span>Laptop</span>
                    <div>
                        <a href="#">Macbook</a>, <a href="#">Asus</a>,
                        <a href="#">HP</a>, <a href="#">DEL</a>
                    </div>
                    <span>Chuột máy tính</span>
                    <div>
                        <a href="#">FW</a>, <a href="#">Apple</a>,
                        <a href="#">Samsung</a>
                    </div>
                    <span>USB</span>
                    <div>
                        <a href="#">Kington</a>, <a href="#">Samsung</a>, <a href="#">IBM</a>
                    </div>
                    <span>Bàn phím</span>
                    <div>
                        <a href="#">Apple</a>, <a href="#">BS</a>, <a href="#">HEVG</a>
                    </div>
                </div>
                <div class="footer-location">
                    <div>ĐỊA CHỈ</div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.2609062616098!2d106.05719710455183!3d20.94203499852238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a30555555555%3A0x39a8acd006ab8e69!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgUGjhuqFtIEvhu7kgVGh14bqtdCBIxrBuZyBZw6puLCBDxqEgc-G7nyAy!5e0!3m2!1svi!2s!4v1728696947337!5m2!1svi!2s"
                        width="90%"
                        height="70%"
                        style={{ border: "1px solid rgb(214, 214, 214)" }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div class="footer-category">
                    <div>DANH MỤC</div>
                    <div>
                        {cateItems}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ShopFooter;