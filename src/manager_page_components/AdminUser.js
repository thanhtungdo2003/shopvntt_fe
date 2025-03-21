import AdminElementContainer from "./AdminElementContainer";
import { AlertCircle, Edit, FilePlus, Grid2X2Plus, ListOrdered, PlusIcon, PlusSquare, Trash, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getUri } from "../js/site"
import { toast, ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const perms = [
    '*',
    'ADMIN',
    'OP',
    'PRODUCT_MANAGER',
    'USERS_MANAGER'
];

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

function AdminUser() {

    const theme = useTheme();
    const [permItem, setPerm] = React.useState([]);

    const handleChange = (e) => {

        setPerm(e.target.value);
    };
    return (
        <>
            <ToastContainer />
            <div className="admin-page-header">
                <div className="admin-page-title">
                    Người dùng
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
                <div style={{ display: "flex", flex: "3", height: "89%", gap: "1%" }}>
                    <AdminElementContainer className="admin-product-container" duration={0.3}>
                        <div className="category-admin-title">
                            <div className="titles">
                                <ListOrdered color="rgb(119, 119, 119)" size="5vh" />
                                <p style={{ fontSize: "2.6vh", width: "100%", color: "rgb(120, 120, 120)", borderBottom: "3% solid rgb(100, 100, 100)" }}>Cấp bậc</p>
                            </div>
                            <div>
                                <button><Grid2X2Plus color="rgb(255, 255, 255)" size="auto" /></button>
                            </div>
                        </div>
                        <div className="category-admin-items">

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
                                <button><PlusSquare color="rgb(255, 255, 255)" size="auto" /></button>
                                <button><Edit color="rgb(255, 255, 255)" size="auto" /></button>
                                <button style={{ backgroundColor: "red" }}><Trash color="rgb(252, 252, 252)" size="auto" /></button>
                            </div>
                        </div>
                        <div className="admin-product-detail-form">
                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Thông tin chính
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField label="Tên đăng nhập" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig} />
                                    <TextField label="Phone" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig} />
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField label="Email" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig} />
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField label="Address" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig} />
                                </div>
                                <div className="admin-product-detail-row">
                                    <FormControl fullWidth>
                                        <InputLabel >Quyền</InputLabel>
                                        <Select
                                            multiple
                                            value={permItem}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Quyền" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {perms.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles()}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Ảnh đại diện
                                </div>
                                <div className="admin-product-detail-row">
                                    <div className="main-image-container" onClick={(e) => { e.currentTarget.querySelector("input").click(); }}>
                                        <input type="file" style={{ display: "none" }} accept="image/*" multiple />
                                        <FilePlus size="50px" color="rgba(157, 157, 157, 0.69)" /><br />
                                        Tải ảnh lên
                                    </div>

                                    <div className="image-preview-container">
                                        <div style={{
                                            display: "flex", justifyContent: "end",
                                            alignItems: "center", width: "100%",
                                        }}>
                                            <button style={{
                                                display: "flex", justifyContent: "center", padding: "1vh",
                                                alignItems: "center", width: "auto", border: "none", outline: "none",
                                                backgroundColor: "rgb(222, 89, 89)", color: "white", borderRadius: "1vh"
                                                , cursor: "pointer"
                                            }}>
                                                <Trash2 size={20} color="white" />
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Điểm
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField label="Điểm tiêu dùng" type="number" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig} />
                                    <TextField label="Xu" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig} />
                                    <TextField label="Uy tín" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig} />
                                </div>
                            
                            </div>
                        </div>
                    </AdminElementContainer>
                </div>
            </div>

        </>
    )
}
export default AdminUser;