import React from 'react';
import '../styles/_defaultOpenSlider.css';

function DefaultOpenSlide({ index }) {

    return (
        <div className="default-slide">
            <p className="default-slide-content">Slide {index}</p>
        </div>
    )
}

export default DefaultOpenSlide;