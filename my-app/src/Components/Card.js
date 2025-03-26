import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

function Card (props){
    
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
 
    let options = props.options;
    let priceOptions = Object.keys(options);
    
    const [qty,setQty] = useState(1);
    const [size,setSize] = useState("")

const handleAddToCart = async () => {
    let food = null;

    // Find the food item in the cart
    for (const item of data) {
        if (item.id === props.foodItem._id) {
            food = item;
            break;
        }
    }

    if (food) {
        // If the food item exists and the size matches, update the quantity
        if (food.size === size) {
            const newQty = parseInt(food.qty) + parseInt(qty); // Ensure both quantities are numbers
            await dispatch({
                type: "UPDATE",
                id: props.foodItem._id,
                price: newQty * parseInt(options[size]), // Update the total price based on newQty
                qty: newQty,
            });
            return;
        }
    }

    // If the size is different or the item is not in the cart, add it as a new entry
    await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: parseInt(qty), // Ensure qty is a number
        size: size,
    });
};



    let finalPrice = qty * parseInt(options[size]);

    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    return(
        <div>
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"170px", objectFit:"fill"}}/>
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <div className="container w-100">
                    <select className="m-2 h-100 bg-success rounded"  onChange={(e)=> setQty(e.target.value)}>
                        {Array.from(Array(6), (e,i) => {
                            return (
                                <option key={i + 1} value={i + 1} > {i + 1} </option>
                            )
                        })}
                    </select>
                
                <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                    {priceOptions.map((data)=>{
                        return <option key={data} value={data}>{data}</option>
                    })}
                </select>
                <div className="d-inline h-100 fs-5">
                ₹{finalPrice}/-
                </div>
                <hr>
                </hr>
                <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>

                </div>
            </div>
        </div>

    </div>
    )
}

export default Card;