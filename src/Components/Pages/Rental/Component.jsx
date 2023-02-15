/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useRef } from 'react';
import {
  Text,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  useMediaQuery,
  Button,
  useDimensions,
  Badge,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import SwiperCore, {
  Navigation,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { useNavigate } from 'react-router-dom';
import Images from '../../../Configs/images';

export default function Component() {
  SwiperCore.use([Navigation]);
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isTab] = useMediaQuery('(max-width: 1080px)');

  const containerRef = useRef(null);
  const dimensions = useDimensions(containerRef, 'resize');

  return (
    <Box py="6">
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

      <Container maxW="7xl">
        <Flex alignItems="center" justify="space-between" mt="6">
          <Heading size="lg">Booking Phinisi</Heading>
          <Flex gap="2" alignItems="center">
            <Flex
              className="review-swiper-button-prev2"
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
              className="review-swiper-button-next2"
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
      <Box mt="2">
        <Swiper
          spaceBetween={16}
          slidesPerView={isMobile ? 1.75 : isTab ? 3.5 : 4.5}
          // loop
          modules={[Navigation]}
          navigation={{
            nextEl: '.review-swiper-button-next2',
            prevEl: '.review-swiper-button-prev2',
          }}
          style={{
            paddingLeft: (dimensions?.borderBox?.left || 0)
            + (dimensions?.padding?.left || 0),
            paddingRight: 16,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((data, i) => (
            <SwiperSlide key={i}>
              <Box
                boxShadow="0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)"
                py={['2', '4']}
                px={['4', '6']}
                bg="#fff"
                mb="7"
                borderRadius={24}
                cursor="pointer"
                onClick={() => navigate('ship/id')}
              >
                <Image src={Images.Order6} borderRadius={24} />
                <Badge variant="solid" colorScheme="blue" bg="blue.600" mt="4" fontSize="xs">
                  Recommended
                </Badge>
                <Heading fontSize="lg" mt="1">Phinisi Agustine</Heading>
                <Text mt="4" size="xl">Mulai 1 juta / Pax</Text>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      )}

    </Box>
  );
}
