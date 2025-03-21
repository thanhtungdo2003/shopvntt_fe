import { ArrowLeft, Box, ChartArea, Home, PanelTopOpen, Settings, UserCog2, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AdminProvider } from "./AdminContext";
import '../admin_page.css'

function ManagerMainLayout() {
    const [selectedId, setSelectedId] = useState(2);

    const nav = useNavigate();
    const menuItems = [
        { page: "/manager", id: 2, icon: <Home color="rgb(63, 63, 63)" size={"50%"} />, name: "Home" },
        { page: "/manager/product", id: 3, icon: <Box color="rgb(63, 63, 63)" size={"50%"} />, name: "Box" },
        { page: "/manager/users", id: 4, icon: <Users2 color="rgb(63, 63, 63)" size={"50%"} />, name: "Staff" },
        { id: 5, icon: <PanelTopOpen color="rgb(63, 63, 63)" size={"50%"} />, name: "Order" },
        { id: 6, icon: <ChartArea color="rgb(63, 63, 63)" size={"50%"} />, name: "Chart" },
        { id: 7, icon: <UserCog2 color="rgb(63, 63, 63)" size={"50%"} />, name: "User Settings" },
        { id: 8, icon: <Settings color="rgb(63, 63, 63)" size={"50%"} />, name: "Settings" }
    ];
    return (
        <>
            <ToastContainer />
            <AdminProvider>
                <div id="container" className="admin-container">

                    <div style={{ display: "flex", width: "100%", height: "100%", gap: "3%" }}>
                        <div className="left-menu">
                            <div className="left-menu-item" onClick={() => { nav("/") }}>
                                <ArrowLeft color="rgb(63, 63, 63)" size={"50%"} />
                            </div>
                            {menuItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`left-menu-item ${selectedId === item.id ? "active" : ""}`}
                                    onClick={() => { nav(item.page); setSelectedId(item.id) }}>
                                    {item.icon}
                                </div>
                            ))}
                        </div>
                        <div className="admin-main-container">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </AdminProvider>
        </>
    )
}
export default ManagerMainLayout;