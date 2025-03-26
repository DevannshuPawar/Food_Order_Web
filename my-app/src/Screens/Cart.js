import React from "react";
import { useCart, useDispatchCart } from "../Components/ContextReducer";

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();


    if (data.length === 0) {
        return (
            <div className="container">
                <div className="m-5 w-100 text-center fs-3 text-white">
                    The Cart is Empty!
                </div>
            </div>
        );
    }

    const handleCheckOut = async()=>{
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/orderData",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })                         
            
        });
        console.log("Order Response", response);      
        if(response.status === 200){
            dispatch({type:"DROP"})
        }
    }

    
    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div className="container my-5">
            
            <div className="table-responsive">
                <table className="table table-hover text-white">
                    <thead className="text-center fs-5">
                        <tr className="bg-dark">
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope="row" className="text-center">
                                    {index + 1}
                                </th>
                                <td>{food.name}</td>
                                <td className="text-center">{food.qty}</td>
                                <td className="text-center">{food.size}</td>
                                <td className="text-center">₹{food.price}</td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() => {
                                            dispatch({ type: "REMOVE", index: index });
                                        }}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="mt-4">
                <h2 className="text-end fs-3 text-white">
                    <strong>Total Price: ₹{totalPrice}/-</strong>
                </h2>
            </div>

            
            <div className="text-end">
                <button className="btn btn-success btn-lg mt-3" onClick={handleCheckOut}>
                    Check Out
                </button>
            </div>
        </div>
    );
}
