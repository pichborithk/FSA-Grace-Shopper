import { Swiper, SwiperSlide } from 'swiper/react';
import {
  // Navigation,
  Autoplay,
  EffectCoverflow,
  // Pagination,
} from 'swiper/modules';

import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';
import styles from './Slider.module.css';

const imagesNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const Slider = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={3}
      centeredSlides={true}
      modules={[Autoplay, EffectCoverflow]}
      // pagination
      grabCursor={true}
      effect='coverflow'
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      // effect='creative'
      // creativeEffect={{
      //   prev: {
      //     shadow: true,
      //     translate: [0, 0, -400],
      //   },
      //   next: {
      //     translate: ['100%', 0, 0],
      //   },
      // }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        // reverseDirection: true,
      }}
      className={styles.swiperWrapper}
    >
      {/* <SwiperSlide>
        <img src={slide1} alt='slide-1' className={styles.img} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide2} alt='slide-1' className={styles.img} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slide3} alt='slide-1' className={styles.img} />
      </SwiperSlide> */}
      {imagesNumber.map(num => (
        <SwiperSlide key={num}>
          <img
            src={`../../../images/slide_images/fashion-${num}.jpg`}
            className={styles.img}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
