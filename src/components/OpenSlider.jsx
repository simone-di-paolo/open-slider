import React from 'react';
import OpenSliderWrapper from './OpenSliderWrapper';
import OpenSlide from './OpenSlide';
import DefaultOpenSlide from './DefaultOpenSlide';
import '../styles/_slider.css';

/**
 * OpenSlider is a React Open Source component that creates a slider and relatives slides in an easy way.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.openSlides - An array of React elements representing the slides. If not provided and `useDefaulSlidesAsExample` is true, default slides will be used.
 * @param {number} props.startFromIndex - The index of the slide to start from. Defaults to 0.
 * @param {boolean} props.useDefaulSlidesAsExample - Whether to use default slides if `openSlides` is not provided. Defaults to true.
 * @param {number} props.currentSlide - Not used in the current implementation.
 * @param {boolean} props.oneOpenSlidePerView - Whether to allow only one open slide per view. Defaults to false.
 *
 * @returns {JSX.Element} The OpenSlider component.
 *
 * @example
 * <OpenSlider openSlides={[<MyCustomSlide />, <MySecondCustomSlide />]} startFromIndex={1} />
 * <OpenSlider useDefaulSlidesAsExample={true} />
 */
function OpenSlider({ 
  openSlides,
  startFromIndex = 0,
  useDefaulSlidesAsExample = true,
  currentSlide,
  oneOpenSlidePerView = false
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
      startFromIndex = {startFromIndex}
      oneOpenSlidePerView = {oneOpenSlidePerView}>
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
