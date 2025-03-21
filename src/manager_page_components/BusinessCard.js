import { AtSign } from "lucide-react";
import { useManager } from "./AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { getUri } from "../js/site";

function BusinessCard({ username, email, phone, perm }) {
    const manager = useManager();
    const handleClick = (e) => {
        axios.post(getUri() + "/user/get-by-params", {
            page: 1,
            row: 1,
            keyword: "",
            username: username
        }, { withCredentials: true }).then((res) => {
            const user = res.data[0];
            manager.setUser(user);
        }).catch((err) => {
            toast.error(err.status + " Lỗi khi lấy thông tin người dùng", { position: "top-right" });
        })
    }
    return (<>
        <div className={"business-card-container "+perm} onClick={handleClick}>
            <div className="business-card-avata-container">
                <img />
            </div>
            <div className="business-card-content">
                <div className="username">{username}</div>
                <a className="email" href={`mailto:${email}`}>{email}</a>
                <div className="phone">{phone}</div>
            </div>
        </div>
    </>)
}
export default BusinessCard;