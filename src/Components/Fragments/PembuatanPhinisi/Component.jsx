/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Box, Heading, Text, useMediaQuery,
} from '@chakra-ui/react';
import SwiperCore, {
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Component() {
  SwiperCore.use([Autoplay]);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isPad] = useMediaQuery('(max-width: 960px)');

  return (
    <Box bg="blue.50" py={6}>
      <Heading color="blackAlpha.900" size="lg" ml={2.5} textAlign="center" mb={4}>Proses Pembuatan Phinisi</Heading>
      <Swiper
        spaceBetween={isMobile ? 16 : 24}
        slidesPerView={isMobile ? 1.5 : isPad ? 3.5 : 5.9}
        centeredSlides
        loop
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <SwiperSlide key={i}>
            <Box py={6} px={4} mb={1} bg="white" borderRadius={16} boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)">
              <img
                src="https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                alt="proses phinisi"
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
              <Heading my="4" size={{ base: 'xs', md: 'sm', lg: 'md' }} fontWeight="700">Proses Rangka</Heading>
              <Text size={{ base: 'xs', md: 'sm', lg: 'md' }} lineHeight="150%">
                Lorem ipsum dolor sit
                amet consectetur.
              </Text>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
