import { AlertCircle, Coins, Copy, Eye } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { useManager } from './AdminContext';
import axios from 'axios';
import { getUri } from '../js/site';
import { toast, ToastContainer } from 'react-toastify';

const OrderCard = ({ orderId, createAt, userName, phone, email, address, status, totalPrice }) => {
    const { order, setOrder } = useManager();
    const handleClick = (e) => {
        axios.post(getUri() + "/order/get-by-params", { row: 1, page: 1, keyword: orderId, sort: "newest" }).then((res) => {
            const orderData = res.data[0];
            const rawProducts = JSON.parse(orderData.productDetail);
            var products = [];
            const getProductsReq = rawProducts.map((item) =>
                axios.get(getUri() + "/products/" + item.product_id).then(res => ({
                    ...res.data[0],
                    quantity: item.amount
                }))
            );
            Promise.all(getProductsReq).then(productData => {
                products = [...products, ...productData];
                orderData.products = products;
                setOrder(orderData);
            }).catch(err => {
                console.log(err);
            })


        }).catch((err) => {
            toast.error(err.status + " Lỗi khi lấy chi tiết đơn hàng", { position: "top-right" });
        })
    }
    const copyIdToClipboard = async (e) => {
        try {

            await navigator.clipboard.writeText(orderId);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <StyledWrapper>
            <div className="order-card-container">
                <div className="card cart">

                    <label className="title"><p>ĐƠN HÀNG</p><p>{createAt ? (new Date(createAt).toLocaleDateString("vi-VN")) : "---"}</p></label>

                    <div className="steps">
                        <div className="step">
                            <div>
                                <ToastContainer />
                                <div style={{ display: "flex", maxWidth: "100%", justifyContent: "space-between" }}>
                                    <span>VẬN CHUYỂN ĐẾN</span>
                                    <button onClick={copyIdToClipboard} style={{ border: "none", outline: "none", backgroundColor: "transparent", cursor: "pointer" }}><Copy /></button>
                                </div>
                                <p>{phone} - {userName}</p>
                                <p>{email}</p>
                                <p>{address}</p>
                            </div>
                            <div>
                                <span>TRẠNG THÁI</span>
                                <div className={`order-status ${status === 1 ? "success" : "waiting"}`}>{status === 1 ? "Đã thanh toán" : "Chưa hoàn thành"}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card checkout" >
                    <div className="footer">
                        <label className="price">đ {totalPrice ? totalPrice.toLocaleString('de-DE') : "---"}</label>
                        <button onClick={handleClick} className="checkout-btn"><AlertCircle /></button>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  /* Body */
  .order-card-container {
    display: grid;
    grid-template-columns: auto;
    gap: 0px;
  }

  hr {
    height: 1px;
    background-color: rgba(16, 86, 82, .75);
    border: none;
  }

  .card {
    
    background: rgba(0, 0, 0, 0.1);
  }

  .title {
    justify-content: space-between;
    max-height: 10px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid rgba(16, 86, 82, .75);
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

  
  /* Checkout */
  .payments .details {
    display: grid;
    grid-template-columns: 10fr 1fr;
    padding: 0px;
    gap: 5px;
  }
    .order-status{
        padding: 5px;
        font-size: 13px;  
        border-radius: 10px;  
        width: auto;
        display: flex;
        align-items: center;
        color:white;  

    }
    .order-status.success{
        background-color: rgb(42, 157, 90);
    }
    .order-status.waiting{
        background-color: rgb(226, 112, 59);  
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
    background-color: rgba(16, 86, 82, .5);
    border-top: 3px dashed white;
  }

  .price {
    position: relative;
    font-size: 22px;
    color:rgb(255, 255, 255);
    font-weight: 900;
  }

  .checkout .checkout-btn {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    background: rgba(16, 86, 82, .55);
    border-radius: 7px;
    border: 1px solid rgb(16, 86, 82);
    color:rgb(255, 255, 255);
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }`;

export default OrderCard;
