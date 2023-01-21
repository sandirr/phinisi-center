/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import SwiperCore, {
  Pagination, Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ExampleVideo from '../../../Assets/videoplayback.mp4';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

SwiperCore.use([Autoplay, Pagination]);

export default function Component() {
  const defaultAutoplay = {
    delay: 5000,
    disableOnInteraction: false,
  };

  const [swiperRef, setSwiperRef] = useState(null);

  const stopAutoSwipe = async () => {
    await swiperRef.autoplay.pause();
  };

  const startAutoSwipe = async () => {
    await swiperRef.autoplay.start();
  };

  return (
    <Box position="relative" zIndex={0} mt="0.5">
      <Swiper
        autoplay={defaultAutoplay}
        spaceBetween={0}
        slidesPerView={1}
        loop
        onSwiper={(swiper) => setSwiperRef(swiper)}
        // allowTouchMove={false}
        // noSwiping
        // noSwipingClass="swiper-slide"
        pagination={{
          clickable: true,
          renderBullet: (index, className) => `<span key=${index} class="${className}" style="background-color:#fff; height:5px; width:28px; border-radius:24px;"></span>`,
        }}
        style={{
          '--swiper-pagination-color': '#FFF',
          '--swiper-pagination-bullet-inactive-color': '#FFF',
          '--swiper-pagination-bullet-inactive-opacity': '0.4',
          '--swiper-pagination-bullet-opacity': '0.9',
        }}
        // modules={[Pagination, Autoplay]}
      >
        {[1, 2].map((i) => (
          <SwiperSlide key={i}>
            <VideoContainer
              swiperRef={swiperRef}
              stopAutoSwipe={stopAutoSwipe}
              startAutoSwipe={startAutoSwipe}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export function VideoContainer({ swiperRef }) {
  const videoRef = useRef(null);
  const [play, setPlay] = useState(false);

  const togglePlay = () => {
    if (swiperRef) {
      setPlay(((prev) => !prev));
    }
  };

  const handleStartVideo = async () => {
    await swiperRef.autoplay.stop();
    await videoRef.current.play();
  };

  const handleStopVideo = async () => {
    await videoRef.current.pause();
    await swiperRef.autoplay.start();
  };

  useEffect(() => {
    if (swiperRef) {
      if (play) {
        handleStartVideo();
      } else {
        handleStopVideo();
      }
    }
  }, [play]);

  return (
    <Box
      position="relative"
      onClick={togglePlay}
      // onMouseUp={handleStopVideo}
      zIndex={1}
    >
      <Box
        ref={videoRef}
        as="video"
        src={ExampleVideo}
        backgroundSize="cover"
        minW="full"
        minH="full"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      />
      <Box
        position="absolute"
        px={{ base: '8', md: '16', lg: '40' }}
        top="0"
        bottom="0.5"
        left="0.5"
        right="0.5"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        background="linear-gradient(90.14deg, rgba(9, 27, 60, 0.8) 0.11%, rgba(0, 0, 0, 0) 62.07%)"
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
    </Box>
  );
}
