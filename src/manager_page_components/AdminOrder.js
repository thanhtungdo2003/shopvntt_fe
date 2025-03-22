import { Button, Chip, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AlertCircle, Box, FileX, Image, ListOrdered, PlusIcon, Save, Search, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AdminElementContainer from "./AdminElementContainer";
import OrderCard from "./OrderCard";
import axios from "axios";
import { getUri } from "../js/site";
import { useManager } from "./AdminContext";

const status = [
    "Đã hoàn thành",
    "Chưa hoàn thành"
]

function getStyles() {
    return {
        fontWeight: 500,
    };
}
const textfieldConfig = {
    inputLabel: {
        shrink: true,
    },
}
function AdminOrder() {
    const [keyword, setKeyword] = useState("");
    const { order, setOrder } = useManager();
    const [orderProducts, setOrderProducts] = useState([]);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.post(getUri() + "/order/get-by-params", {
            row: 20,
            page: 1,
            keyword: keyword,
            sort: "newest"
        }).then(res => {
            setOrders(res.data);

        }).catch(err => {
            toast.error(err.status + " Lỗi: truy xuất dữ liệu không thành công!");
        });
    }, [keyword]);

    return (
        <>
            <ToastContainer />
            <div className="admin-page-header">
                <div className="admin-page-title">
                    Đơn hàng
                </div>
                <div className="admin-page-option">
                    <button style={{
                        display: "flex", justifyContent: "center", alignItems: "center",
                        minWidth: "100%", border: "none", outline: "none", backgroundColor: "rgb(39, 172, 79)",
                        height: "5vh", color: "white", borderRadius: "1vh", fontSize: "2vh", cursor: "pointer"
                    }}><PlusIcon color="white" size="3vh" /></button>
                </div>
            </div>

            <div className="admin-product-main-container">

                <div style={{ display: "flex", flex: "11", height: "89%", gap: "1%" }}>
                    <AdminElementContainer className="admin-product-container" duration={0.4}>
                        <div className="category-admin-title">
                            <div className="titles" style={{ width: "70%" }}>
                                <ListOrdered color="rgb(119, 119, 119)" size="5vh" />
                                <p style={{ fontSize: "2.6vh", width: "100%", color: "rgb(120, 120, 120)", borderBottom: "3% solid rgb(100, 100, 100)" }}>Danh sách đơn hàng</p>
                            </div>
                            <div className="search-bar" style={{ width: "70%" }}>
                                <TextField fullWidth
                                    label="Tìm kiếm"
                                    value={keyword}
                                    onChange={(e) => {
                                        setKeyword(e.target.value)
                                    }}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    variant="standard"
                                />
                            </div>
                        </div>
                        <div className="admin-orders-container">
                            {orders.map((item, index) => {
                                return (<>
                                    <OrderCard
                                        orderId={item.order_id}
                                        createAt={item.create_at}
                                        userName={item.user_name}
                                        email={item.email}
                                        address={item.address}
                                        phone={item.phone}
                                        totalPrice={Number(item.totalPrice)}
                                        status={item.status}
                                    />
                                </>)
                            })}
                        </div>

                    </AdminElementContainer>
                </div>
                <div style={{ display: "flex", flex: "6", height: "89%", gap: "1%" }}>
                    <AdminElementContainer className="admin-product-container" duration={0.5}>
                        <div className="category-admin-title">
                            <div className="titles" style={{ width: "70%" }}>
                                <AlertCircle color="rgb(119, 119, 119)" size="5vh" />
                                <p style={{ fontSize: "2.6vh", width: "100%", color: "rgb(120, 120, 120)", borderBottom: "3% solid rgb(100, 100, 100)" }}>Thông tin - Chi tiết đơn hàng</p>
                            </div>
                            <div>
                                <button style={{ backgroundColor: "red" }}><Trash color="rgb(252, 252, 252)" size="auto" /></button>
                            </div>
                        </div>
                        <div className="admin-product-detail-form">
                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Thông tin khách hàng
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField value={order.user_name} label="Tên đăng nhập" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig}

                                    />
                                    <TextField value={order.phone} label="Phone" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig}
                                    />
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField value={order.email} label="Email" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig}
                                    />
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField value={order.address} label="Address" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig}
                                    />
                                </div>
                            </div>

                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Thông tin đơn hàng
                                </div>
                                <div className="admin-product-detail-row">
                                    <FormControl fullWidth style={{ flex: "1" }} >
                                        <InputLabel>Trạng thái</InputLabel>
                                        <Select
                                            label="Trạng thái"
                                            value={order.status===1?1:0}
                                            onChange={(e) => {
                                                setOrder({ ...order, status: e.target.value }); // Cập nhật state
                                            }}
                                        >

                                            <MenuItem value={0}>Chưa hoàn thành</MenuItem>
                                            <MenuItem value={1}>Đã thanh toán</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="admin-product-detail-row">
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", width: "100%", backgroundColor: "rgba(255, 146, 14, 0.26)" }}>
                                        <div>Tổng tiền hàng:</div>
                                        <div style={{ color: "#333", fontSize: "17px", fontWeight: "550" }}>đ {Number(order.totalPrice).toLocaleString()}</div>
                                    </div>

                                </div>
                            </div>

                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Sản phẩm (s)
                                </div>
                                <div className="admin-product-detail-row">
                                    <div style={{ width: "100%" }}>
                                        {
                                            order.products ? order.products.map((item, index) => {
                                                const imgNames = JSON.parse(item.product_imgs);
                                                const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];
                                                return (
                                                    <>
                                                        <div className="order-product-item">
                                                            <div>
                                                                <img src={getUri() + "/product/get-imgs/product_imgs/"+imageName} />
                                                            </div>
                                                            <div>
                                                                {item.display_name}
                                                            </div>
                                                            <div>
                                                                x{item.quantity}
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }) : ""
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </AdminElementContainer>
                </div>
            </div>

        </>
    )
}
export default AdminOrder;