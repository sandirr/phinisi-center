/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
import React, { useRef } from 'react';
import {
  Text,
  Box,
  Container,
  Flex,
  Heading,
  useMediaQuery,
  Button,
  useDimensions,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Navigation,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import Images from '../../../Configs/images';
import Elements from '../../Elements';

export default function Component() {
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const containerRef = useRef(null);
  const dimensions = useDimensions(containerRef, 'resize');

  return (
    <Box>
      <Container maxW="7xl" ref={containerRef}>
        <Flex alignItems="center" justify="space-between">
          <Heading size="lg">Join Trip</Heading>
          <Flex gap="2" alignItems="center">
            <Flex
              className="review-swiper-button-prev"
              justify="center"
              alignItems="center"
              borderWidth={2}
              borderColor="gray.400"
              h="22px"
              w="22px"
              borderRadius="full"
            >
              <ArrowBackIcon color="gray.400" />
            </Flex>
            <Flex
              className="review-swiper-button-next"
              justify="center"
              alignItems="center"
              borderWidth={2}
              borderColor="gray.400"
              h="22px"
              w="22px"
              borderRadius="full"
            >
              <ArrowForwardIcon color="gray.400" />
            </Flex>
          </Flex>
        </Flex>
      </Container>
      {!!dimensions
      && (
      <Box mt="4">
        <Swiper
          spaceBetween={12}
          slidesPerView={isMobile ? 1.25 : 2.5}
          // loop
          modules={[Navigation]}
          navigation={{
            nextEl: '.review-swiper-button-next',
            prevEl: '.review-swiper-button-prev',
          }}
          // allowTouchMove={false}
          // noSwiping
          // noSwipingClass="swiper-slide"
          style={{
            paddingLeft: (dimensions?.borderBox?.left || 0)
            + (dimensions?.padding?.left || 0),
            paddingRight: 16,
          }}
        >
          {[1, 2, 3, 4].map((data, i) => (
            <SwiperSlide key={i}>
              <Box
                backgroundSize="cover"
                bgRepeat="no-repeat"
                backgroundRepeat="no-repeat"
                w="full"
                h={['180px', '220px', '280px', '320px']}
                borderRadius={24}
                color="white"
                pl={['4', '6', '8', '10']}
                pt={['8', '12']}
                position="relative"
                bg={`linear-gradient(136.31deg, rgba(0, 0, 0, 0.6) 15.57%, rgba(0, 0, 0, 0) 50.85%), url(${Images.Order1})`}
              >
                <Heading color="white" size={['md', 'lg', 'xl']}>Sailing Trip 9 Spot</Heading>
                <Text size={['sm', 'md']} mt="1">Bulukumba, Sulawesi Selatan</Text>
                <Button
                  size={['xs', 'sm', 'md']}
                  mt="auto"
                  bg="white"
                  color="blue.600"
                  position="absolute"
                  bottom={['8', '12']}
                  onClick={() => navigate('trip/id')}
                >
                  Selengkapnya
                </Button>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      )}
      <Elements.Loading loading={false} />
    </Box>
  );
}
