import { motion } from "framer-motion";

function AdminHome() {
    return (
        <>
            <motion.div
                className="admin-home-container"
                initial={{ opacity: 0, x: 500 }} // Bắt đầu mờ + lệch trái
                animate={{ opacity: 1, x: 0 }}  // Khi hiển thị, hiện dần + về đúng vị trí
                exit={{ opacity: 0, x: 500 }}    // Khi rời trang, mờ dần + lệch phải
                transition={{ duration: 0.5 }}  // Tốc độ chuyển động
            >
                
            </motion.div>
        </>
    )
}
export default AdminHome;