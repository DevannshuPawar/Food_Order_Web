import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";

const Home = () => {

    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            response = await response.json();

            if (response) {
                setFoodItem(response[0] || []);
                setFoodCat(response[1] || []);
            }
        } catch (error) {
            console.error("Error fetching food data:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{zIndex:"10"}}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>

                        </div>

                        <div className="carousel-item active">
                            <img src="https://cdn.wallpapersafari.com/89/59/RdFisV.jpg" class="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://cdn.wallpapersafari.com/36/27/pwhy6X.jpg" class="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="http://2.bp.blogspot.com/-u5C4VtkSKZU/TYvMS1uhT-I/AAAAAAAAEnA/XBVKgfx4iOs/s1600/nature-wallpaper-1600x900-019.jpg" class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className="container">
                {foodCat.length > 0 ? (
                    foodCat.map((data) => (
                        <div className="row mb-3" key={data._id}>
                            <div className="fs-3 m-3">{data.CategoryName}</div>
                            <hr />
                            {foodItem.length > 0 ? (
                                foodItem
                                    .filter((item) => (item.CategoryName === data.CategoryName)  && (item.name.toLowerCase().includes(search.toLocaleLowerCase())) )
                                    .map((filteredItem) => (
                                        <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                                            <Card foodItem = {filteredItem}
                                                options={filteredItem.options?.[0] || {}} // Safe access
                                                
                                            />
                                        </div>
                                    ))
                            ) : (
                                <div>No Such Data Found</div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>Loading Categories...</div>
                )}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
