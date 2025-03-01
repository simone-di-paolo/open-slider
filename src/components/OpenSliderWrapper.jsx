import React, { useState, useRef } from 'react';
import '../styles/_openSliderWrapper.css';
import { useEffect } from 'react';

const OpenSliderWrapper = ({
    startFromIndex = 0,
    oneOpenSlidePerView,
    loopSlides,
    hidePagination,
    children
}) => {
    const [currentSlide, setCurrentSlide] = useState(startFromIndex);
    const slideContainerRef = useRef(null);
    const activeSlideRef = useRef(null);
    
    const slides = React.Children.toArray(children);
    const slideCount = slides.length;
    

    
      const previousSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 && !loopSlides ? prevSlide : prevSlide === 0 && loopSlides ? slideCount - 1 : prevSlide - 1
        );

        if (currentSlide === 0 && loopSlides) {
            const totalWidth = slides.reduce((sum, slide) => {
                return sum + activeSlideRef.current.offsetWidth
            }, 0)
            if (slideContainerRef.current && !oneOpenSlidePerView) {
                slideContainerRef.current.style.transition = 'transform 0.5s ease-in-out';
                const slideWidth = activeSlideRef.current.offsetWidth;
                slideContainerRef.current.style.transform = `translate3d(-${totalWidth - slideWidth}px, 0, 0)`;   
            }
        } else if (currentSlide !== 0 && !oneOpenSlidePerView){
            if (slideContainerRef.current && !oneOpenSlidePerView) {
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
        }
    };

    const nextSlide = () => {        
        setCurrentSlide((prevSlide) => {
            if (prevSlide === slideCount - 1 && !loopSlides) {
                return prevSlide;
            } else if (prevSlide === slideCount - 1 && loopSlides) {
                return 0;
            } else {
                return prevSlide + 1;
            }
        });

        if (currentSlide === slideCount - 1 && loopSlides) {
            if (slideContainerRef.current && !oneOpenSlidePerView) {
                slideContainerRef.current.style.transition = 'transform 0.5s ease-in-out';
                slideContainerRef.current.style.transform = `translate3d(0px, 0, 0)`;
            }
        } else if (currentSlide !== slideCount - 1 && !oneOpenSlidePerView) {
            if (slideContainerRef.current && !oneOpenSlidePerView) {
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
                slideContainerRef.current.style.transform = `translate3d(${currentTranslateX - slideWidth}px, 0, 0)`;
            }

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
            <div className={`open-slider-container ${oneOpenSlidePerView ? 'slide-centered' : ''}`} ref={slideContainerRef}>
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
        {
            hidePagination ? (
                <div className="open-slider-pagination-wrapper">
                    {
                        slides.map((slides, index) => (
                            <button 
                                key={`pagination-${index}`}
                                className={`open-slider-pagination-button ${index === currentSlide ? 'active' : ''}`}
                                //onClick={() => setCurrentSlide(index)}
                            />
                        ))
                    }
                </div>
            ) : null
        }
        </div>
    );
};
export default OpenSliderWrapper;
