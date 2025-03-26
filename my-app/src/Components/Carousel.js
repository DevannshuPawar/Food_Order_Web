import React from "react";

const Carousel = () => {
    return (
        <div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{zIndex:"10"}}>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                            </form>

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
        </div>
    )
}

export default Carousel;