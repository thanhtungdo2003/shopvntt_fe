import Textfield from "@atlaskit/textfield";
import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { HandCoins, ListOrdered, User } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getProductFromCart, getUri } from "../js/site";
import axios from "axios";
import momoIcon from "../lib/momo-svgrepo-com.svg"
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
function OrderPage() {
    const [paymethod, setPaymethod] = useState('default');
    const [products, setProducts] = useState([]);
    const [orderDetail, setOrderDetail] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [userData, setUserData] = useState(null);
    const [taxPrice, setTaxPrice] = useState(0);
    const nav = useNavigate();
    useEffect(() => {   
        try {
            const localUserData = localStorage.getItem("shop-vntt-user-data");
            if (localUserData) {
                const user = JSON.parse(localUserData);
                setUserData(user);

                setOrderDetail((prevOrderDetail) => ({
                    ...prevOrderDetail,
                    user_name: user.username,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                }));
            }
        } catch {
            console.log("Lỗi: dữ liệu người dùng không xác định");
        }

        setProducts([]);
        const productRequests = getProductFromCart().map(productFromCart =>
            axios.get(getUri() + "/products/" + productFromCart.id)
                .then(res => ({
                    ...res.data[0], // Dữ liệu từ API
                    quantity: productFromCart.quantity // Thêm quantity từ cart
                }))
        );

        Promise.all(productRequests)
            .then(productDataList => {
                setProducts(productDataList);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);
    useEffect(() => {
        var totalPriceData = 0;
        products.forEach(product => {
            totalPriceData += (product.price * product.quantity);
        });
        setTaxPrice(totalPriceData * 0.1);
        setTotalPrice(totalPriceData);
    }, [products]);

    const orderSubmit = () => {

        const reqData = {
            info: {
                ...orderDetail
            },
            detail: {
                ...getProductFromCart()
            }
        }
        axios.post(getUri() + "/order/create", reqData).then(res => {
            toast.success("Tạo đơn hàng thành công!", { position: "top-right" });
            if (paymethod == 'default') {
                localStorage.removeItem("cart_shopvntt");
                setTimeout(() => {
                    nav("/");
                }, 1000);
            }
        }).catch(err => {
            toast.error(err.status + "Lỗi khi tạo đơn hàng! vui lòng liên hệ admin", { position: "top-right" });
        })
    }
    return (<>
        <ToastContainer />
        <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <div className="order-detail-container">
                <div className="customer-info-container">
                    <div className="order-detail-container-title">
                        <User /> Thông tin khách hàng
                    </div>
                    <div className="order-detail-content-container">
                        <div style={{ display: "flex", alignItems: "center", height: "30px", gap: "5px" }}><label>Họ tên </label><p style={{ color: "red" }} title="thông tin bắt buộc">*</p></div>
                        <Textfield className="form-input-text" placeholder="nhập họ tên đầy đủ"
                            value={orderDetail.fullname}
                            onChange={(e) => {
                                setOrderDetail({ ...orderDetail, fullname: e.target.value })
                            }} />
                        <div style={{ display: "flex", alignItems: "center", height: "30px", gap: "5px" }}><label>Số điện thoại </label><p style={{ color: "red" }} title="thông tin bắt buộc">*</p></div>
                        <Textfield className="form-input-text" placeholder="nhập số điện thoại"
                            value={orderDetail.phone}
                            onChange={(e) => {
                                setOrderDetail({ ...orderDetail, phone: e.target.value })
                            }} />
                        <label>Email</label><br />
                        <Textfield type="email" className="form-input-text" placeholder="nhập email (nếu có)"
                            value={orderDetail.email}
                            onChange={(e) => {
                                setOrderDetail({ ...orderDetail, email: e.target.value })
                            }} />
                        <div style={{ display: "flex", alignItems: "center", height: "30px", gap: "5px" }}><label>Địa chỉ </label><p style={{ color: "red" }} title="thông tin bắt buộc">*</p></div>
                        <Textfield className="form-input-text" placeholder="Số nhà / Đường - Xã - Huyện - Tỉnh"
                            value={orderDetail.address}
                            onChange={(e) => {
                                setOrderDetail({ ...orderDetail, address: e.target.value })
                            }} />
                        <br />
                        <TextField fullWidth multiline rows={5} label="Lưu ý cho shop (nếu có)" className="form-input-text" placeholder="nhập thông tin (nếu có)"
                            value={orderDetail.feedback}
                            onChange={(e) => {
                                setOrderDetail({ ...orderDetail, feedback: e.target.value })
                            }} />
                    </div>
                </div>
                <div className="product-list-container">
                    <div className="order-detail-container-title">
                        <ListOrdered /> Thông tin sản phẩm
                    </div>
                    <div className="order-detail-content-container">
                        {
                            products.map((p, index) => {
                                const imgNames = JSON.parse(p.product_imgs);
                                const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                                return (<>
                                    <div className="order-product-item">
                                        <div>
                                            <img src={getUri() + "/product/get-imgs/product_imgs/" + imageName} />
                                        </div>
                                        <div>
                                            {p.display_name}
                                        </div>
                                        <div>
                                            x{p.quantity}
                                        </div>
                                    </div>
                                </>)
                            })
                        }
                    </div>
                </div>
            </div>
            <StyledWrapper>
                <div className="container">
                    <div className="card cart">
                        <label className="title">KIẾM TRA - XÁC NHẬN ĐƠN HÀNG</label>
                        <div className="steps">
                            <div className="step">
                                <div>
                                    <span>VẬN CHUYỂN ĐẾN</span>
                                    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                        <p>{orderDetail.phone}</p>-
                                        <p>{orderDetail.fullname}</p>

                                    </div>
                                    <p>{orderDetail.address}</p>
                                </div>
                                <hr />
                                <div>
                                    <span>PHƯƠNG THỨC THANH TOÁN</span>
                                    <ToggleButtonGroup
                                        value={paymethod}
                                        exclusive
                                        aria-label="text alignment"
                                    >
                                        <ToggleButton onClick={() => { setPaymethod("momo") }} value="momo" aria-label="left aligned">
                                            <img src={momoIcon} style={{ padding: "5px", width: "24px", height: "24px", backgroundColor: "rgb(162, 58, 103)" }} />
                                        </ToggleButton>
                                        <ToggleButton onClick={() => { setPaymethod("default") }} value="default" aria-label="left aligned">
                                            <HandCoins color="white" style={{ padding: "5px", width: "24px", height: "24px", backgroundColor: "rgb(46, 149, 201)" }} />
                                        </ToggleButton>

                                    </ToggleButtonGroup>
                                </div>
                                <hr />
                                <div className="promo">
                                    <span>CÓ MÃ KHUYẾN MÃI?</span>
                                    <form className="form">
                                        <input className="input_field" placeholder="Nhập mã giảm giá" type="text" />
                                        <button>Áp dụng</button>
                                    </form>
                                </div>
                                <hr />
                                <div className="payments">
                                    <span>THÔNG TIN THANH TOÁN</span>
                                    <div className="details">
                                        <span>Tổng tiền:</span>
                                        <span>đ {totalPrice.toLocaleString()}</span>
                                        <span>Phí vận chuyển:</span>
                                        <span>đ 32.000</span>
                                        <span>TAX, VAT (10%):</span>
                                        <span>đ {taxPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card checkout">
                        <div className="footer">
                            <label className="price">đ {(totalPrice + 32000 + taxPrice).toLocaleString()}</label>
                            <button className="checkout-btn" onClick={orderSubmit}>XÁC NHẬN</button>
                        </div>
                    </div>
                </div>
            </StyledWrapper>
        </div>
    </>)
}
const StyledWrapper = styled.div`
  /* Body */
  .container {
    flex: 3;
    display: grid;
    grid-template-columns: auto;
    gap: 0px;
    transition-duration: 0.2s;
  }

  hr {
    width: 100%;
    height: 1px;
    background-color: rgb(179, 179, 179);
    border: none;
  }

  .card {
    transition-duration: 0.2s;
    width: 400px;
    background:rgb(255, 255, 255);
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .title {
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid rgb(179, 179, 179);
    font-weight: 700;
    font-size: 11px;
    color: #000000;
  }

  /* Cart */
  .cart {
    border-radius: 19px 19px 0px 0px;
  }

  .cart .steps {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .cart .steps .step {
    display: grid;
    gap: 10px;
  }

  .cart .steps .step span {
    font-size: 13px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 8px;
    display: block;
  }

  .cart .steps .step p {
    font-size: 11px;
    font-weight: 600;
    color: #000000;
  }

  /* Promo */
  .promo form {
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 10px;
    padding: 0px;
  }

  .input_field {
    width: auto;
    height: 36px;
    padding: 0 0 0 12px;
    border-radius: 5px;
    outline: none;
    border: 1px solid rgb(213, 213, 213);
    background-color:rgb(244, 244, 244);
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }

  .input_field:focus {
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 2px rgb(75, 162, 243);
    background-color:rgb(242, 242, 242);
  }

  .promo form button {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 18px;
    gap: 10px;
    width: 100%;
    height: 36px;
    background:rgb(88, 176, 231);
    box-shadow: 0px 0.5px 0.5px #F3D2C9, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 5px;
    border: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color:rgb(255, 255, 255);
  }

  /* Checkout */
  .payments .details {
    display: grid;
    grid-template-columns: 10fr auto;
    padding: 0px;
    gap: 5px;
  }

  .payments .details span:nth-child(odd) {
    font-size: 12px;
    font-weight: 600;
    color: #000000;
    margin: auto auto auto 0;
  }

  .payments .details span:nth-child(even) {
    font-size: 13px;
    font-weight: 600;
    color: #000000;
    margin: auto 0 auto auto;
  }

  .checkout .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    background-color:rgb(255, 255, 255);
  }

  .price {
    position: relative;
    font-size: 22px;
    color:rgb(48, 48, 48);
    font-weight: 900;
  }

  .checkout .checkout-btn {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 36px;
    background:rgb(91, 157, 232);
    box-shadow: 0px 0.5px 0.5pxrgb(221, 221, 221), 0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 7px;
    border: 1px solid #ECC2C0;
    color:rgb(253, 253, 253);
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }`;

export default OrderPage;