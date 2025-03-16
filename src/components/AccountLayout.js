import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function AccountLayout() {

    const [title, setTitle] = useState("LOGIN");
    const [form, setFrom] = useState(<></>);
    const userNameTextBox = useRef(null);
    const emailTextBox = useRef(null);
    const passwordTextBox = useRef(null);
    const rePasswordTextBox = useRef(null);
    const nav = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        if (title === "SIGN UP") {

            try {
                const username = userNameTextBox.current.value;
                const email = emailTextBox.current.value;
                const password = passwordTextBox.current.value;
                const rePassword = rePasswordTextBox.current.value;

                if (!username || !email || !password || !rePassword) {
                    toast.error("Thiếu thông tin tài khoản", { position: "top-right" });
                    return;
                }
                if (password !== rePassword) {
                    toast.error("Mật khẩu nhập lại không chính xác", { position: "top-right" });
                    return;
                }
                const res = await axios.post("http://localhost:3000/api/user/register", {
                    userName: userNameTextBox.current.value,
                    email: emailTextBox.current.value,
                    password: passwordTextBox.current.value,
                });

                if (res.status === 200) {
                    toast.success("Đăng ký thành công!", { position: "top-right" });
                    setTitle("LOGIN")
                } else {
                    toast.error("Đăng ký thất bại!", { position: "top-right" });
                }

            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Tên tài khoản đã tồn tại!", { position: "top-right" });
            }
        }else if (title === "LOGIN"){
            try {
                const username = userNameTextBox.current.value;
                const password = passwordTextBox.current.value;

                if (!username || !password) {
                    toast.error("Thiếu thông tin đăng nhập", { position: "top-right" });
                    return;
                }
                const res = await axios.post("http://localhost:3000/api/user/login", {
                    userName: userNameTextBox.current.value,
                    password: passwordTextBox.current.value,
                }, {withCredentials: true});

                if (res.status === 200) {
                    toast.success("Đăng nhập thành công!", { position: "top-right" });
                    const user = res.data;
                    localStorage.setItem('shop-vntt-user-data', JSON.stringify(user));
                    nav('/');
                } else {
                    toast.error("Đăng nhập thất bại!", { position: "top-right" });
                }

            } catch (error) {
                console.error("Lỗi:", error);
                toast.error("Tài khoản hoặc mật khâu không chính xác!", { position: "top-right" });
            }
        }
    };

    useEffect(() => {
        if (title === "LOGIN") {
            setFrom(
                <>
                    <div className="form-container">
                        <input ref={userNameTextBox} type="text" className="input" placeholder="Username" />
                        <input ref={passwordTextBox} type="password" className="input" placeholder="Password" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}><a href="" style={{ fontSize: "13px", margin: "10px 10px", color: "rgb(70, 87, 112)" }}>Quên mật khẩu?</a></div>
                </>
            );
        } else {
            setFrom(
                <>
                    <div className="form-container">
                        <input ref={userNameTextBox} type="text" className="input" placeholder="Username" />
                        <input ref={emailTextBox} type="email" className="input" placeholder="Email" />
                        <input ref={passwordTextBox} type="password" className="input" placeholder="Password" />
                        <input ref={rePasswordTextBox} type="password" className="input" placeholder="Password repeat" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}><a href="" style={{ fontSize: "13px", margin: "10px 10px", color: "rgb(70, 87, 112)" }}>Quên mật khẩu?</a></div>
                </>
            );
        }
    }, [title])

    return (
        <>
            <ToastContainer />
            <div className="account-layout-container">
                <div className="account-form-container">
                    <button onClick={() => nav('/')} className="back-btn" style={{ width: "40px", height: "40px", position: "absolute", border: "none", outline: "none", backgroundColor: "transparent", cursor: "pointer" }}>
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#545454" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#545454" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                    </button>
                    <div className="account-form-title">
                        {title}
                    </div>
                    <div className="account-form-sub">
                        {title === "LOGIN" ? "Đăng nhập tài khoản với Email" : "Đăng ký tài khoản với Email"}
                    </div>
                    <form onSubmit={submit}>
                        {form}
                        <button type="sumbit" className="account-sumbit-btn">{title}</button>
                    </form>
                    <div className="account-form-nav">
                        <p onClick={() => setTitle(title === "LOGIN" ? "SIGN UP" : "LOGIN")}>{title === "LOGIN" ? "đăng ký" : "đăng nhập"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AccountLayout;