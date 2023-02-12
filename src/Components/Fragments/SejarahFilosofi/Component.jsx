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
import Images from '../../../Configs/images';

export default function Component() {
  SwiperCore.use([Autoplay]);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const [sf] = useState([
    {
      title: 'Sejarah Phinisi',
      desc: 'Para pengrajin kapal phinisi melihat kapal sebagai hubungan antara manusia dengan kapal ialah hubungan antara subjek dengan subjek, sehingga perlakuan kepada kapal bukan sebagai alat untuk berlayar melainkan sebagai anak kandung yang dibesarkan dan dirawat sepenuh hati sehingga ada perasaan cinta kasih dalam proses pembuatannya.',
      img: Images.SejarahPhinisi,
    },
    {
      title: 'Filosofi Phinisi',
      desc: 'Phinisi adalah bentuk perkembangan kapal melalui akulturasi, secara definitif phinisi adalah kapal yang memiliki sistem tiang, tali dan layar. Diperkenalkan sebagai “peeneeseek” pertama dibuat pada 1840-an oleh beberapa orang Prancis dan Jerman yang terdampar di Trengganu Malaysia. Kapal layar ini menjadi gambaran asal bagi kapal layar baru yang disebut Pinas.',
      img: Images.FilosofiPhinisi,
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
                borderRadius: '24px',
                background: `linear-gradient(90deg, rgba(9, 27, 60, 0.7) 0%, rgba(0, 0, 0, 0) 68.79%), url(${text.img})`,
                backgroundRepeat: 'no-repeat',
              }}
              display="flex"
              height={[160, 200, 250, 290]}
              flexDirection="column"
              justifyContent="center"
              pl={{ base: '4', md: '12', lg: '20' }}
            >
              <Heading
                color="white"
                size={{
                  base: 'lg', lg: 'xl',
                }}
                fontWeight="700"
              >
                {text.title}
              </Heading>
              <Text
                width={{
                  base: '48', sm: '56', md: 'sm', lg: '2xl',
                }}
                noOfLines={4}
                color="white"
                fontSize={['xx-small', 'xs', 'sm']}
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
