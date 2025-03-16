import axios from "axios";
import ProductCartItem from "../components/ProductCartItem";
import { QuantityProvider } from "../components/QuantityContext";

export function addProductToCart(item) {
    const rawData = localStorage.getItem("cart_shopvntt");
    var localCart = [];
    if (rawData === undefined) {
        localCart.push({ ...item, quantity: 1 });
    } else {
        localCart = JSON.parse(localStorage.getItem("cart_shopvntt")) || [];
    }
    const existProductIndex = localCart.findIndex((product) => product.id === item.id);
    if (existProductIndex !== -1) {
        const newQuantity = item.quantity + localCart[existProductIndex].quantity;
        if (Number(newQuantity) > 10) {
            return false;
        }
        localCart[existProductIndex].quantity = newQuantity;
    } else {
        localCart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart_shopvntt", JSON.stringify(localCart));
    return true;
}
export function getTotalPriceCart(localCart) {
    let totalprice = 0;
    if (!localCart) return { totalprice: 0, finalPrice: 0 };
    localCart.forEach((p) => {
        totalprice += ((p.price + (0.05 * p.price)) * p.quantity)
    })
    return { totalprice: totalprice, finalPrice: totalprice - 200000 };
}
export function updateQuantityProductCartByID(id, newValue) {
    var localCart = getProductFromCart();
    const index = localCart.findIndex((p) => p.id === id)
    localCart[index].quantity = newValue;
    localStorage.setItem("cart_shopvntt", JSON.stringify(localCart));
}
export function getProductFromCart() {
    const rawData = localStorage.getItem("cart_shopvntt") || "null";
    var localCart = [];
    if (rawData === "null") {
        return "NONE"
    } else {
        localCart = JSON.parse(localStorage.getItem("cart_shopvntt")) || [];
    }
    return localCart;
}
export function getLengthCart() {
    const rawData = localStorage.getItem("cart_shopvntt") || "null";
    if (rawData !== "null") {
        return JSON.parse(localStorage.getItem("cart_shopvntt")).length;
    } else {
        return 0;
    }
}
export function removeProductFromCart(id) {
    const rawData = localStorage.getItem("cart_shopvntt") || "null";
    var localCart = [];
    if (rawData !== "null") {
        localCart = JSON.parse(localStorage.getItem("cart_shopvntt")) || [];
        localCart.map((product, index) => {
            if (product.id === id) {
                localCart.pop(index, undefined)
                localStorage.setItem("cart_shopvntt", JSON.stringify(localCart));
                window.location.reload();
            }
        })
    }
}

export function getUri(){ return "http://localhost:3000/api"};
