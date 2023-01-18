/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  Box, Heading, Text, useMediaQuery,
} from '@chakra-ui/react';
import SwiperCore, {
  Pagination, Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Component() {
  SwiperCore.use([Autoplay]);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const [sf] = useState([
    {
      title: 'Sejarah Phinisi',
      desc: 'Kapal phinisi adalah salah satu sebutan bagi kapal yang menggunakan sistem tiang, tali, dan layar. kapal pinisi disinyalir pertama kali dibuat dalam perjalanan panjang Seorang pangeran kebesaran kerajaan luwu Sawerigading untuk menemui calon istrinya We Cudai ke negeri china',
    },
    {
      title: 'Filosofi Phinisi',
      desc: 'Para pengrajin kapal phinisi melihat kapal yang mereka kerjakan bukan semata mata benda mati, mereka melihat hubungan antara manusia dengan kapal ialah hubungan antara subjek dengan subjek, bukan hubungan antara subjek dengan objek, sehinga mereka memperlakukan kapal bukan sebagai alat untuk berlayar melainkan sebagai anak kandung yang dibesarkankan dan dirawat sepenuh hati sehingga ada perasaan cinta kasih dalam proses pembuatannya.',
    },
  ]);

  return (
    <Box pt="8" pb="4" bg="blue.50" position="relative" height="auto" overflow="hidden">
      <Swiper
        className="special-swiper"
        spaceBetween={isMobile ? 40 : 70}
        style={{
          overflow: 'visible',
        }}
        slidesPerView={1.5}
        centeredSlides
        grabCursor
        loop
        modules={[Pagination]}
      >
        {sf.map((text) => (
          <SwiperSlide key={text.title}>
            <Box
              style={{
                backgroundSize: 'cover',
                borderRadius: 24,
                background: 'linear-gradient(90deg, rgba(9, 27, 60, 0.7) 0%, rgba(0, 0, 0, 0) 68.79%), url("https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80")',
              }}
              display="flex"
              height={{ base: 200, md: 250, lg: 300 }}
              flexDirection="column"
              justifyContent="center"
              pl={{ base: '4', md: '12', lg: '20' }}
            >
              <Heading
                color="white"
                size={{
                  base: 'md', lg: 'xl', xl: '2xl',
                }}
                fontWeight="700"
              >
                {text.title}
              </Heading>
              <Text
                width={{
                  base: '48', sm: '56', md: 'sm', lg: 'md',
                }}
                noOfLines={3}
                color="white"
                size={{ base: 'xs', lg: 'sm' }}
                mt={{ base: 2, md: 4, lg: 5 }}
              >
                {text.desc}
              </Text>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
