import AdminElementContainer from "./AdminElementContainer";
import { AlertCircle, Brush, Delete, Edit, FilePlus, FileX, Grid2X2Plus, Image, ListOrdered, PanelBottomIcon, PlusIcon, PlusSquare, Save, Search, Trash, Trash2, X, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getUri } from "../js/site"
import { toast, ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { useManager } from "./AdminContext";
import BusinessCard from "./BusinessCard";

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
    'admin',
    'op',
    'product.manager',
    'user.manager'
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
    const userManager = useManager();
    const [keyword, setKeyword] = useState("");
    const [users, setUsers] = useState([]);
    const [userSelected, selectUser] = useState([])
    const [permForUserSelected, setPermForUserSelected] = useState([]);

    useEffect(() => {
        axios.post(getUri() + "/user/get-by-params", {
            page: 1,
            row: 20,
            keyword: keyword,
            username: null

        }, { withCredentials: true }).then((res) => {
            setUsers(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [keyword, userManager.trigger]);


    useEffect(() => {
        if (userManager) {
            const user = userManager.user;
            if (user) {
                if (user.permissions && user.permissions !== null) {
                    try {
                        setPermForUserSelected(JSON.parse(user.permissions));
                    } catch {
                        setPermForUserSelected([]);
                    }
                } else {
                    setPermForUserSelected([]);

                }
                selectUser(user);
            }
        }
    }, [userManager]);

    const updateUserSelected = (e) => {
        console.log(userSelected);
        axios.post(getUri() + "/user/update", userSelected, { withCredentials: true }).then((res) => {
            userManager.onTrigger(Math.floor(Math.random() * 1000));
            toast.success("Cập nhật thành công!", { position: "top-right" });

            permForUserSelected.forEach(perm => {
                axios.post(getUri() + "/user/add-perm", { userName: userSelected.user_name, perm: perm }, { withCredentials: true }).then(res => {
                }).catch(err => {
                    toast.error(err.status + " Cập nhật thất bại!", { position: "top-right" });
                })
            })
        }).catch((err) => {
            toast.error(err.status + " Cập nhật thất bại!", { position: "top-right" });

        })
    }
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

                <div style={{ display: "flex", flex: "11", height: "89%", gap: "1%" }}>
                    <AdminElementContainer className="admin-product-container" duration={0.4}>
                        <div className="category-admin-title">
                            <div className="titles" style={{ width: "70%" }}>
                                <AlertCircle color="rgb(119, 119, 119)" size="5vh" />
                                <p style={{ fontSize: "2.6vh", width: "100%", color: "rgb(120, 120, 120)", borderBottom: "3% solid rgb(100, 100, 100)" }}>Danh sách tài khoản</p>
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
                        <div className="business-cards-container">
                            {[...users].map((user, index) => {
                                return (<BusinessCard perm={user.permissions} username={user.user_name} email={user.email ?? "none email"} phone={user.phone ?? "none phone"} />)
                            })}
                        </div>
                    </AdminElementContainer>
                </div>
                <div style={{ display: "flex", flex: "6", height: "89%", gap: "1%" }}>
                    <AdminElementContainer className="admin-product-container" duration={0.5}>
                        <div className="category-admin-title">
                            <div className="titles" style={{ width: "70%" }}>
                                <AlertCircle color="rgb(119, 119, 119)" size="5vh" />
                                <p style={{ fontSize: "2.6vh", width: "100%", color: "rgb(120, 120, 120)", borderBottom: "3% solid rgb(100, 100, 100)" }}>Thông tin tài khoản</p>
                            </div>
                            <div>
                                <button style={{ backgroundColor: "red" }}><Trash color="rgb(252, 252, 252)" size="auto" /></button>
                            </div>
                        </div>
                        <div className="admin-product-detail-form">
                            <div className="admin-product-detail-block">
                                <div className="admin-product-detail-row title">
                                    Thông tin chính
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField label="Tên đăng nhập" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig}
                                        value={userSelected.user_name}
                                        onChange={(e) => {
                                            selectUser({ ...userSelected, user_name: e.target.value })
                                        }}
                                    />
                                    <TextField label="Phone" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig}
                                        value={userSelected.phone}
                                        onChange={(e) => {
                                            selectUser({ ...userSelected, phone: e.target.value })
                                        }} />
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField label="Email" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig}
                                        value={userSelected.email}
                                        onChange={(e) => {
                                            selectUser({ ...userSelected, email: e.target.value })
                                        }} />
                                </div>
                                <div className="admin-product-detail-row">
                                    <TextField label="Address" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig}
                                        value={userSelected.address}
                                        onChange={(e) => {
                                            selectUser({ ...userSelected, address: e.target.value })
                                        }} />
                                </div>
                                <div className="admin-product-detail-row">
                                    <FormControl fullWidth>
                                        <InputLabel >Quyền</InputLabel>
                                        <Select
                                            multiple
                                            value={permForUserSelected}
                                            onChange={(e) => {
                                                setPermForUserSelected(e.target.value)
                                            }}
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
                                        <Image size="50px" color="rgba(157, 157, 157, 0.69)" /><br />
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
                                    <TextField label="Điểm tiêu dùng" type="number" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig}
                                        value={userSelected.consumer_point}
                                        onChange={(e) => {
                                            selectUser({ ...userSelected, consumer_point: e.target.value })
                                        }} />
                                    <TextField label="Xu" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig}
                                        value={userSelected.user_point}
                                        onChange={(e) => {
                                            selectUser({ ...userSelected, user_point: e.target.value })
                                        }} />
                                    <TextField label="Uy tín" variant="outlined" style={{ flex: "1" }} slotProps={textfieldConfig}
                                        value={userSelected.reputation_point}
                                        onChange={(e) => {
                                            selectUser({ ...userSelected, reputation_point: e.target.value })
                                        }} />
                                </div>
                                <div className="admin-product-detail-row">
                                    <div style={{ width: "100%", display: "flex", gap: "10px", justifyContent: "end" }}>
                                        <Button style={{ backgroundColor: "rgb(224, 49, 49)" }}><FileX color="white" /></Button>
                                        <Button onClick={updateUserSelected} fullWidth style={{ backgroundColor: "rgb(42, 164, 52)" }}><Save color="white" /></Button>
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
export default AdminUser;