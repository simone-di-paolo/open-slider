import React, { useState, useRef } from 'react';
import '../styles/_openSliderWrapper.css';
import { useEffect } from 'react';

const OpenSliderWrapper = ({
    startFromIndex = 0,
    oneOpenSlidePerView,
    children
}) => {
    const [currentSlide, setCurrentSlide] = useState(startFromIndex);
    const slideContainerRef = useRef(null);
    const activeSlideRef = useRef(null);
    
    const slides = React.Children.toArray(children);
    const slideCount = slides.length;
    

    
    const previousSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slideCount - 1 : prevSlide - 1
        );        
        if (slideContainerRef.current) {
            slideContainerRef.current.style.transition = 'transform 0.5s ease-in-out';
            const slideWidth = activeSlideRef.current.offsetWidth;
            const currentTransform = slideContainerRef.current.style.transform;
            let currentTranslateX = 0;
            if (currentTransform) {
                const match = currentTransform.match(/translate3d\((-?\d+)px/);
                if (match) {
                    currentTranslateX = parseInt(match[1], 10);
                }
            }
            slideContainerRef.current.style.transform = `translate3d(${currentTranslateX + slideWidth}px, 0, 0)`;
        }
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === slideCount - 1 ? 0 : prevSlide + 1
        );
        if (slideContainerRef.current) {
            slideContainerRef.current.style.transition = 'transform 0.5s ease-in-out';
            const slideWidth = activeSlideRef.current.offsetWidth;
            slideContainerRef.current.style.transform = `translate3d(-${slideWidth * 1}px, 0, 0)`;

        }

    };

    const slideClassHandler = () => {
        let classModifier = "slide";
        if (oneOpenSlidePerView) {
            classModifier = "slide invisible-slide"
        } 
        return classModifier;
    }

    return (
        <div className="open-slider-wrapper">
            <div className="open-slider-container" ref={slideContainerRef}>
                {slides.map((slide, index) => (                 
                    <div
                        key={index}
                        className={`${slideClassHandler()} ${index === currentSlide ? 'active' : ''}`}
                        ref={index === currentSlide ? activeSlideRef : null}>
                        {slide}
                    </div>
                ))}
            </div>
            <button className="prev-button" onClick={previousSlide}>Previous</button>
            <button className="next-button" onClick={nextSlide}>Next</button>
        </div>
    );
};
export default OpenSliderWrapper;
