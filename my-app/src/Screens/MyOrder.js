import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]); // Initialize as an array

    const fetchMyOrder = async () => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            console.error("User email not found");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
    
            const data = await response.json();
            if (data.orderData && Array.isArray(data.orderData)) {
                setOrderData(data.orderData);
            } else {
                console.error("Unexpected response format:", data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        }
    };
    

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {orderData.length > 0 ? (
                        orderData.map((data, index) => (
                            data.order_data
                                .slice(0)
                                .reverse()
                                .map((item, itemIndex) => (
                                    <React.Fragment key={`${index}-${itemIndex}`}>
                                        {item.map((arrayData, arrayIndex) => (
                                            <div key={`${index}-${itemIndex}-${arrayIndex}`}>
                                                {arrayData.Order_date ? (
                                                    <div className="m-auto mt-5">
                                                        <strong>{arrayData.Order_date}</strong>
                                                        <hr />
                                                    </div>
                                                ) : (
                                                    <div className="col-12 col-md-6 col-lg-3">
                                                        <div
                                                            className="card mt-3"
                                                            style={{
                                                                width: "16rem",
                                                                maxHeight: "360px",
                                                            }}
                                                        >
                                                            <img
                                                                src={arrayData.img}
                                                                className="card-img-top"
                                                                alt="..."
                                                                style={{
                                                                    height: "120px",
                                                                    objectFit: "fill",
                                                                }}
                                                            />
                                                            <div className="card-body">
                                                                <h5 className="card-title">
                                                                    {arrayData.name}
                                                                </h5>
                                                                <div
                                                                    className="container w-100 p-0"
                                                                    style={{ height: "38px" }}
                                                                >
                                                                    <span className="m-1">
                                                                        {arrayData.qty}
                                                                    </span>
                                                                    <span className="m-1">
                                                                        {arrayData.size}
                                                                    </span>
                                                                    <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                        ₹{arrayData.price}/-
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))
                        ))
                    ) : (
                        <p>No orders found</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
