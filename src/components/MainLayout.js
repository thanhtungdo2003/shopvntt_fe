import React, { useEffect, useRef, useState } from "react";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import Logo from "../components/logo";
import SearchIcon from "@atlaskit/icon/glyph/search"
import Cart from "../components/cart";
import ShopFooter from "./footer";
import { Outlet, useNavigate } from "react-router-dom";
import { getLengthCart } from "../js/site";
import axios from "axios";
import userIcon from "../lib/profile-user.png"
import { toast } from "react-toastify";
import { LogOutIcon, SearchCheckIcon, Settings2Icon, ShoppingBagIcon, UserCog2Icon, UserCogIcon, UserPen, X } from "lucide-react";

import Swal from "sweetalert2";

function MainLayout() {
    const [lengthCart, setLengthCart] = useState(0);
    const nav = useNavigate();
    const [accountNav, setAccountNav] = useState(<></>)
    const [userMenuStage, setUserMenuStage] = useState("hide");
    const [trigger, setTrigger] = useState(0);
    const [query, setQuery] = useState("");

    const logout = () => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Đăng xuất tài khoản",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Đăng xuất",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:3000/api/user/logout", {}, { withCredentials: true }).then((res) => {
                    if (res.data.statusCode === 200) {
                        setTrigger(trigger + 1)
                    }
                }).catch((err) => {
                    toast.success("Lỗi khi đăng xuất", { position: "top-right" })
                })
            }
        })

    }
    useEffect(() => {
        const timer = setInterval(() => { setLengthCart(getLengthCart()) }, 700)
        return () => clearTimeout(timer);
    });
    const checkPerm = (userData) => {
        console.log(userData)
        const rawPerms = userData.permissions;
        if (rawPerms) {
            const perms = JSON.parse(rawPerms);
            if (["op", "admin", "*"].some(role => perms.includes(role))) {
                return (<>
                    <div className="manager-nav-item" onClick={()=>nav("/manager")}>
                        <UserCog2Icon color="rgb(220, 171, 10)" className="user-menu-item-icon" size={24} /><p style={{ color: "rgb(220, 171,10)" }}>Trang quản lý</p>
                    </div>
                </>)
            }
        }
        return <></>
    }
    useEffect(() => {
        const rawUser = localStorage.getItem('shop-vntt-user-data');
        if (rawUser) {
            axios.post("http://localhost:3000/api/user/auth", {}, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    const userData = res.data.user;
                    localStorage.setItem('shop-vntt-user-data', JSON.stringify(userData));
                    setAccountNav(<>
                        <div className="user-nav" style={{ margin: "auto 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", position: "relative" }}>
                            <div style={{ width: "40px", height: "40px", backgroundColor: "#DDD", borderRadius: "50%", border: "1px solid #CCC" }}>
                                <img src={userIcon} style={{ width: "100%", height: "100%" }} />
                            </div>
                            <div style={{ width: "130px", height: "50px", cursor: "pointer" }} onClick={() => { setUserMenuStage(userMenuStage === "hide" ? "show" : "hide") }}>
                                <div style={{ height: "25px", display: "flex", gap: "5px", alignItems: "center" }}>
                                    <p style={{ color: "rgb(19, 108, 176)", fontWeight: "550" }}>Thành viên</p>
                                    <div style={{ width: "24px", height: "24px" }}>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#2597ef"></path> </g></svg>
                                    </div>
                                </div>
                                <div style={{ height: "25px", fontSize: "14px", color: "rgb(43, 85, 132)" }}>
                                    {userData.username}
                                </div>
                            </div>
                            <div className="user-menu-contaner">
                                <div className="user-menu-item">
                                    <UserPen color="rgb(40, 103, 175)" className="user-menu-item-icon" size={24} /><p>Tài khoản</p>
                                </div>
                                <div className="user-menu-item">
                                    <ShoppingBagIcon color="rgb(40, 103, 175)" className="user-menu-item-icon" size={24} /><p>Đơn hàng của bạn</p>
                                </div>
                                <div className="user-menu-item">
                                    <Settings2Icon color="rgb(40, 103, 175)" className="user-menu-item-icon" size={24} /><p>Cài đặt</p>
                                </div>
                                {checkPerm(userData)}
                                <div className="user-menu-item" onClick={logout}>
                                    <LogOutIcon color="rgb(191, 59, 59)" className="user-menu-item-icon" size={24} /><p style={{ color: "rgb(196, 39, 39)" }}>Đăng xuất</p>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            }).catch((err) => {
                console.log(err);
                setAccountNav(<>
                    <Button onClick={() => {
                        nav("/account");
                    }}>Tài khoản</Button>
                </>)
            })
        }
    }, [trigger])
    const search = (query) => {
        nav("/search_query/" + query);
    }
    const keyDownHandle = (e) => {
        if (e.key === "Enter") {
            const keyword = e.target.value;
            search(keyword);
        }
    }
    return (
        <>
            <div id="container" className="container">
                <header>
                    <div className="header-container">
                        <div className="option-header">
                            <div className="option-header-content">
                                <Logo />
                                <Textfield onKeyDown={keyDownHandle} placeholder="nhập nội dung cần tìm..." id="search-textbox"
                                    style={{ display: "flex", alignItems: "center" }}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    elemBeforeInput={
                                        <span style={{ margin: '5px' }}>
                                            <SearchIcon primaryColor={"#2f77b5"}></SearchIcon>
                                        </span>
                                    }
                                    elemAfterInput={
                                        query && (
                                            <>
                                                <button onClick={() => setQuery("")} className="mr-2" style={{
                                                    border: "none", outline: "none", cursor: "pointer", backgroundColor: "transparent",
                                                    width: "24px", height: "24px"
                                                }}>
                                                    <X color="rgb(35, 131, 220)" size={20} className="text-gray-500 hover:text-gray-700" />
                                                </button>
                                                <button onClick={() => search(query)} className="mr-2" style={{
                                                    border: "none", outline: "none", cursor: "pointer", backgroundColor: "transparent",
                                                    width: "24px", height: "24px", margin: "auto 10px"
                                                }}>
                                                    <SearchCheckIcon color="rgb(35, 131, 220)" size={20} className="text-gray-500 hover:text-gray-700" />
                                                </button>
                                            </>

                                        )
                                    }>
                                </Textfield>
                                <Cart value={lengthCart} />
                                {accountNav}
                            </div>
                        </div>
                        <div className="nav-header">
                            <div className="nav-container">
                                <div className="nav-left">
                                    <ul>
                                        <li><a href="/">TRANG CHỦ</a></li>
                                        <li><a href="/product">SẢN PHẨM</a></li>
                                        <li><a>BLOG</a></li>
                                    </ul>
                                </div>
                                <div className="nav-right">
                                    <ul>
                                        <li><a href="mailto:tungdohotat12345@gmail.com">tungdohotat12345@gmail.com</a></li>
                                        <li><a>Hà Nội: 0389055070</a></li>
                                        <li><a>Hưng Yên: 0389055070</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
                <footer>
                    <ShopFooter />
                </footer>
            </div>
        </>
    )
}
export default MainLayout;