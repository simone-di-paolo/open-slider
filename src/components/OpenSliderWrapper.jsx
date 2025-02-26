import React, { useState } from 'react';
import '../styles/_openSliderWrapper.css';

const OpenSliderWrapper = ({
    startFromIndex = 0,
    oneOpenSlidePerView,
    children
}) => {
    const [currentSlide, setCurrentSlide] = useState(startFromIndex);
    const slides = React.Children.toArray(children);
    const slideCount = slides.length;

    const previousSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slideCount - 1 : prevSlide - 1
        );
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === slideCount - 1 ? 0 : prevSlide + 1
        );
    };

    const slideClassHandler = (index) => {
        let classModifier = "slide";
        if (oneOpenSlidePerView) {
            classModifier = "slide invisible-slide"
        } 
        return classModifier;
    }

    return (
        <div className="open-slider-wrapper">
            {slides.map((slide, index) => (                 
                <div
                    key={index}
                    className={`${slideClassHandler()} ${index === currentSlide ? 'active' : ''}`}                    
                >
                    {slide}
                </div>
            ))}
            <button className="prev-button" onClick={previousSlide}>Previous</button>
            <button className="next-button" onClick={nextSlide}>Next</button>
        </div>
    );
};

export default OpenSliderWrapper;
