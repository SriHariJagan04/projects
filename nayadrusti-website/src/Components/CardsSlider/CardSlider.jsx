import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import { aboutCompany } from '../../data'

import styles from './CardSlider.module.css'

const CardSlider = () => {

  const { cards } = aboutCompany

  // const cards = [
  //   {
  //     value: '35',
  //     name: 'years of expertise'
  //   },
  //   {
  //     value: "750+",
  //     name: "IT professionals"
  //   },
  //   {
  //     value: "4K",
  //     name: "success stories"
  //   },
  //   {
  //     value: "30+",
  //     name: "industries covered"
  //   }
  // ]
  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          600: {
            slidesPerView: 4,
          },
        }}
      >
        {cards.map((data, index) => (
          <SwiperSlide key={index}>
            <div className={styles.card}>
              <b>{data.value}</b>
              <span>{data.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CardSlider
