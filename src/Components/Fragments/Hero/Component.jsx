/* eslint-disable import/no-unresolved */
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import SwiperCore, {
  Pagination, Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Component() {
  SwiperCore.use([Autoplay]);
  return (
    <Box position="relative" style={{ zIndex: 0 }} mt="0.5">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => `<span class="${className}" style="background-color:#fff; height:5px; width:28px; border-radius:24px;"></span>`,
        }}
        style={{
          '--swiper-pagination-color': '#FFF',
          '--swiper-pagination-bullet-inactive-color': '#FFF',
          '--swiper-pagination-bullet-inactive-opacity': '0.4',
          '--swiper-pagination-bullet-opacity': '0.9',
        }}
        modules={[Pagination]}
      >
        {[1, 2].map((i) => (
          <SwiperSlide key={i}>
            <Box
              style={{
                backgroundSize: 'cover',
                width: '100%',
                background: 'linear-gradient(90.14deg, rgba(9, 27, 60, 0.8) 0.11%, rgba(0, 0, 0, 0) 62.07%), url("https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80")',
              }}
              height={{ base: '40vh', md: '60vh', lg: '70vh' }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              pl={{ base: '8', md: '16', lg: '40' }}
            >
              <Heading
                fontWeight="700"
                size={{
                  base: 'xl', md: '2xl', lg: '3xl',
                }}
                color="white"
                lineHeight="100%"
              >
                Selamat datang
                <br />
                di Phinisi Center
              </Heading>
              <Text
                mt="2"
                color="white"
                size={{
                  base: 'md', md: 'xl', lg: '2xl',
                }}
                fontWeight="400"
              >
                Lorem ipsum dolor sit amet
              </Text>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
