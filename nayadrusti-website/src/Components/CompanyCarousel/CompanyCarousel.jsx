import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { aboutCompany } from "../../data";

import styles from "./CompanyCarousel.module.css";

const CompanyCarousel = () => {
  const { companies } = aboutCompany;

  return (
    <div className={styles.carouselWrapper}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={1} //{ 👈 Show 1 on mobile by default }
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          600: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        loop={true}
      >
        {companies.map((company, index) => (
          <SwiperSlide key={index}>
            <div className={styles.companyCard}>
              <img
                src={company?.logo ?? "/Images/default-logo.png"}
                alt={company?.name ?? "Company"}
                className={styles.logoImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CompanyCarousel;
