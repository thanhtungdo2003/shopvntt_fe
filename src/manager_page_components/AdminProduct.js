import { motion } from "framer-motion";
import AdminElementContainer from "./AdminElementContainer";
import { AlertCircle, Boxes, Copy, Edit, File, FilePlus, Grid, Grid2X2, Grid2X2Plus, Paperclip, PlusCircle, PlusIcon, PlusSquare, Trash, Trash2, X } from "lucide-react";
import AdminCategoryItem from "./AdminCategoryItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUri } from "../js/site"
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from 'react'


function AdminProduct() {

    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (!files) return;

        const newImages = Array.from(files).map((file) => ({
            file, // Lưu file để sau này có thể xóa
            url: URL.createObjectURL(file), // URL hiển thị ảnh
        }));

        setImages((prev) => [...prev, ...newImages]);
    };
    const handleRemoveImage = (index) => {
        console.log(images);
        setImages((prev) => {
            const updatedImages = [...prev];
            // Hủy URL để tránh rò rỉ bộ nhớ
            URL.revokeObjectURL(updatedImages[index].url);
            updatedImages.splice(index, 1); // Xóa ảnh khỏi danh sách
            return updatedImages;
        });
    };
    const [categorys, setCategorys] = useState([]);
    useEffect(() => {
        axios.post(getUri() + "/category/get-by-page", {
            row: 50,
            page: 1
        }).then((res) => {
            setCategorys(res.data);
        })
            .catch((err) => {
                toast.error("Lỗi", { position: "top-right" })
            })
    }, []);
    return (
        <>
            <div className="admin-page-header">
                <div className="admin-page-title">
                    Sản phẩm
                </div>
                <div className="admin-page-option">
                    <button style={{
                        display: "flex", justifyContent: "center", alignItems: "center",
                        minWidth: "100%", border: "none", outline: "none", backgroundColor: "rgb(39, 172, 79)",
                        height: "5vh", color: "white", borderRadius: "1vh", fontSize: "2vh", cursor: "pointer"
                    }}><PlusIcon color="white" size="3vh" />Thêm sản phẩm</button>
                </div>
            </div>

            <div className="admin-product-main-container">
                <div style={{ display: "flex", flex: "3", height: "89%", gap: "1%" }}>
                    <AdminElementContainer className="admin-product-container" duration={0.3}>
                        <div className="category-admin-title">
                            <div className="titles">
                                <Grid2X2 color="rgb(119, 119, 119)" size="5vh" />
                                <p style={{ fontSize: "2.6vh", width: "100%", color: "rgb(120, 120, 120)", borderBottom: "3% solid rgb(100, 100, 100)" }}>Danh mục</p>
                            </div>
                            <div>
                                <button><Grid2X2Plus color="rgb(255, 255, 255)" size="auto" /></button>
                            </div>
                        </div>
                        <div className="category-admin-items">
                            {[...categorys].map((category, index) => (
                                <AdminCategoryItem
                                    key={index}
                                    id={category.category_id}
                                    slug={category.category_slug}
                                    amount={category.total_item}
                                    displayName={category.category_name + "."}
                                />
                            ))}
                            <div style={{ width: "100%", height: "30vh", background: "" }}>

                            </div>
                        </div>
                    </AdminElementContainer>
                </div>
                <div style={{ display: "flex", flex: "9", height: "89%", gap: "1%" }}>
                    <AdminElementContainer className="admin-product-container" duration={0.4}>
                        <Outlet />
                    </AdminElementContainer>
                </div>
                <div style={{ display: "flex", flex: "6", height: "89%", gap: "1%" }}>
                    <AdminElementContainer className="admin-product-container" duration={0.5}>
                        <div className="category-admin-title">
                            <div className="titles" style={{ width: "70%" }}>
                                <AlertCircle color="rgb(119, 119, 119)" size="5vh" />
                                <p style={{ fontSize: "2.6vh", width: "100%", color: "rgb(120, 120, 120)", borderBottom: "3% solid rgb(100, 100, 100)" }}>Chi tiết sản phẩm</p>
                            </div>
                            <div>
                                <button><Edit color="rgb(255, 255, 255)" size="auto" /></button>
                                <button style={{ backgroundColor: "rgb(27, 151, 213)" }}><Copy color="rgb(255, 255, 255)" size="auto" /></button>
                                <button style={{ backgroundColor: "red" }}><Trash color="rgb(252, 252, 252)" size="auto" /></button>
                            </div>
                        </div>
                        <div className="admin-product-detail-form">
                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Thông tin chính
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField label="Tên sản phẩm" variant="outlined" style={{ flex: "1" }} />

                                    <FormControl fullWidth style={{ flex: "1" }} >
                                        <InputLabel>Danh mục</InputLabel>
                                        <Select
                                            label="Danh mục"
                                        >
                                            {[...categorys].map((category, index) => (
                                                <MenuItem
                                                    value={category.category_id}
                                                >{category.category_name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField fullWidth label="Giá (VND)" variant="outlined" type="number" />

                                </div>
                            </div>
                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Ảnh sản phẩm (s)
                                </div>
                                <div className="admin-product-detail-row">
                                    <div className="main-image-container" onClick={(e) => { e.currentTarget.querySelector("input").click(); }}>
                                        <input type="file" style={{ display: "none" }} accept="image/*" multiple onChange={handleImageUpload} />
                                        <FilePlus size="50px" color="rgba(157, 157, 157, 0.69)" /><br />
                                        Thêm ảnh
                                    </div>

                                    <div className="image-preview-container">
                                        <div style={{
                                            display: "flex", justifyContent: "end",
                                            alignItems: "center", width: "100%",
                                        }}>
                                            <button onClick={()=>{
                                                setImages([]);
                                            }} style={{
                                                display: "flex", justifyContent: "center", padding: "1vh",
                                                alignItems: "center", width: "auto", border: "none", outline: "none",
                                                backgroundColor: "rgb(222, 89, 89)", color: "white",borderRadius:"1vh"
                                                ,cursor:"pointer"
                                            }}>
                                                <Trash2 size={20} color="white" />
                                            </button>
                                        </div>

                                        {images.map((img, index) => (
                                            <>
                                                <div className="image-item">
                                                    <img key={index} src={img.url} alt={`Uploaded ${index}`} />
                                                    <X className="remove-button" color="white" size={20} onClick={() => handleRemoveImage(index)} />
                                                </div>

                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Thông tin kèm (*lưu ý: xuống dòng sử dụng \n cuối hàng)
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField fullWidth label="Thông số" variant="outlined" multiline rows="4" />
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField fullWidth label="Mô tả" variant="outlined" multiline rows="6" />
                                </div>
                            </div>

                        </div>
                    </AdminElementContainer>
                </div>
            </div>
        </>
    )
}
export default AdminProduct;