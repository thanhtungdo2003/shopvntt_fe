import { useState } from "react";
import Button from "@atlaskit/button";
import { useQuantity } from "./QuantityContext";
import { updateQuantityProductCartByID } from "../js/site";
let finalValue = 0;
export default function QuantitySelector({ min = 1, max = 10, onChange, val, id, cartItem = false}) {
    const { quantity, setQuantity } = useQuantity();

    const handleChange = (value) => {
        const newValue = Math.max(min, Math.min(max, Number(value)));
        if (Number.isNaN(newValue)) return;
        setQuantity(newValue);
        onChange?.(newValue);
        finalValue = newValue;
        if (cartItem){ 
            updateQuantityProductCartByID(id, newValue);
            
        };
    };

    return (
        <div className="quantity-selector">
            <button onClick={() => handleChange(quantity - 1)} disabled={quantity <= min}>
                -
            </button>
            <input
                type="text"
                value={quantity}
                onChange={(e) => handleChange(e.target.value)}
            />
            <button onClick={() => handleChange(quantity + 1)} disabled={quantity >= max}>
                +
            </button>
        </div>
    );
}
