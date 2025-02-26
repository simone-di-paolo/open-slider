import React from 'react';
import OpenSliderWrapper from './OpenSliderWrapper';
import OpenSlide from './OpenSlide';
import DefaultOpenSlide from './DefaultOpenSlide';
import '../styles/_slider.css';

function OpenSlider({ 
  openSlides,
  startFromIndex = 0,
  useDefaulSlidesAsExample = true
}) {
  
  if ((!openSlides || openSlides.length === 0) && useDefaulSlidesAsExample) {
    openSlides = [
      <DefaultOpenSlide index={1}/>,
      <DefaultOpenSlide index={2}/>,
      <DefaultOpenSlide index={3}/>,
      <DefaultOpenSlide index={4}/>,
      <DefaultOpenSlide index={5}/>,
    ];
  }

  return (
    <OpenSliderWrapper 
      startFromIndex={startFromIndex}>
      {
        openSlides.map((slide, index) => (
          <OpenSlide
            key={`open-slide-${index}`}>
              {slide}
          </OpenSlide>
        ))
      }
    </OpenSliderWrapper>
  );
}

export default OpenSlider;
