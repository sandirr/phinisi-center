/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  Box, Heading, Image, Text, useMediaQuery,
} from '@chakra-ui/react';
import SwiperCore, {
  Pagination, Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { useNavigate } from 'react-router-dom';
import Images from '../../../Configs/images';
import ROUTES from '../../../Configs/routes';

export default function Component() {
  SwiperCore.use([Autoplay]);
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const [sf] = useState([
    {
      link: ROUTES.sejarah(),
      title: 'Sejarah Phinisi',
      desc: 'Para pengrajin kapal phinisi melihat kapal sebagai hubungan antara manusia dengan kapal ialah hubungan antara subjek dengan subjek, sehingga perlakuan kepada kapal bukan sebagai alat untuk berlayar melainkan sebagai anak kandung yang dibesarkan dan dirawat sepenuh hati sehingga ada perasaan cinta kasih dalam proses pembuatannya.',
      img: Images.SejarahPhinisi,
    },
    {
      link: ROUTES.filosofi(),
      title: 'Filosofi Phinisi',
      desc: 'Phinisi adalah bentuk perkembangan kapal melalui akulturasi, secara definitif phinisi adalah kapal yang memiliki sistem tiang, tali dan layar. Diperkenalkan sebagai “peeneeseek” pertama dibuat pada 1840-an oleh beberapa orang Prancis dan Jerman yang terdampar di Trengganu Malaysia. Kapal layar ini menjadi gambaran asal bagi kapal layar baru yang disebut Pinas.',
      img: Images.FilosofiPhinisi,
    },
  ]);

  return (
    <Box py={['8', '10', '12']} bg="blue.50" position="relative" height="auto" overflow="hidden">
      <Swiper
        className="special-swiper"
        // spaceBetween={isMobile ? 40 : 70}
        style={{
          overflow: 'visible',
        }}
        slidesPerView={1.5}
        centeredSlides
        loop
        modules={[Pagination]}
      >
        {sf.map((item) => (
          <SwiperSlide key={item.title}>
            <Box
              onClick={() => navigate(item.link)}
              style={{
                backgroundSize: 'cover',
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'linear-gradient(90deg, rgba(9, 27, 60, 0.7) 0%, rgba(0, 0, 0, 0) 68.79%)',
              }}
              mx={[3, 6, 8, 10]}
              position="relative"
            >
              <Image
                src={item.img}
                w="full"
                height={[150, 200, 250, 290]}
                objectFit="cover"
              />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                px={{ base: '4', md: '12', lg: '20' }}
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                right={0}
              >
                <Heading
                  color="white"
                  size={['md', 'lg', 'xl']}
                  fontWeight="700"
                >
                  {item.title}
                </Heading>
                <Text
                  // width={{
                  //   base: '48', sm: '56', md: 'sm', lg: '2xl',
                  // }}
                  noOfLines={4}
                  color="white"
                  fontSize={['x-small', 'xs', 'sm']}
                  mt={{ base: 1, md: 3, lg: 5 }}
                >
                  {item.desc}
                </Text>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
