import { ArrowLeft, Box, ChartArea, Home, PanelTopOpen, Settings, UserCog2, Users2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const menuItems = [
    { id: 2, icon: <Home color="rgb(63, 63, 63)" size={"50%"} />, name: "Home" },
    { id: 3, icon: <Box color="rgb(63, 63, 63)" size={"50%"} />, name: "Box" },
    { id: 4, icon: <Users2 color="rgb(63, 63, 63)" size={"50%"} />, name: "Staff" },
    { id: 5, icon: <PanelTopOpen color="rgb(63, 63, 63)" size={"50%"} />, name: "Order" },
    { id: 6, icon: <ChartArea color="rgb(63, 63, 63)" size={"50%"} />, name: "Chart" },
    { id: 7, icon: <UserCog2 color="rgb(63, 63, 63)" size={"50%"} />, name: "User Settings" },
    { id: 8, icon: <Settings color="rgb(63, 63, 63)" size={"50%"} />, name: "Settings" }
];
function ManagerMainLayout() {
    const [selectedId, setSelectedId] = useState(2);
    const nav = useNavigate();
    return (
        <>
            <div id="container" className="admin-container">

                <div style={{ display: "flex", width: "100%", height: "100%" }}>
                    <div className="left-menu">
                        <div className="left-menu-item" onClick={()=>{nav("/")}}>
                            <ArrowLeft color="rgb(63, 63, 63)" size={"50%"}/>
                        </div>
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className={`left-menu-item ${selectedId === item.id ? "active" : ""}`}
                                onClick={() => setSelectedId(item.id)}>
                                {item.icon}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManagerMainLayout;