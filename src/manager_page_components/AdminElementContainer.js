import { motion } from "framer-motion";

function AdminElementContainer({ children, className, duration = 0.3 }) {

    return (
        <>
            <motion.div
                className={className}
                initial={{ opacity: 0, x: 500 }} // Bắt đầu mờ + lệch trái
                animate={{ opacity: 1, x: 0 }}  // Khi hiển thị, hiện dần + về đúng vị trí
                exit={{ opacity: 0, x: 500 }}    // Khi rời trang, mờ dần + lệch phải
                transition={{ duration: duration }}  // Tốc độ chuyển động
            >
                {children}
            </motion.div>
        </>
    )
}
export default AdminElementContainer;