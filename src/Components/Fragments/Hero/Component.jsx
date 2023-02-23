/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react';
import {
  Box, Heading, Image, Text,
} from '@chakra-ui/react';
import SwiperCore, {
  Pagination, Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import ExampleVideo from '../../../Assets/videoplayback.mp4';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import Images from '../../../Configs/images';

SwiperCore.use([Autoplay, Pagination]);
const listData = [
  {
    title: 'Selamat datang\ndi Phinisi Center',
    desc: 'Exploring the oceans with pride and\nhistory, Phinisi Center inspires adventure',
    imgLink: Images.Hero1,
  },
  {
    title: '"Menjelajahi panorama laut\ndengan keanggunan dan warisan\nbudaya bersama Phinisi”',
    imgLink: Images.Hero2,
  },
  {
    title: '"Temukan berita-\nberita menarik\nseputar Phinisi”',
    imgLink: Images.Hero3,
  },
];

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
        {listData.map((data, i) => (
          <SwiperSlide key={i}>
            <VideoContainer
              swiperRef={swiperRef}
              data={data}
              index={i}
              stopAutoSwipe={stopAutoSwipe}
              startAutoSwipe={startAutoSwipe}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export function VideoContainer({ swiperRef, data, index }) {
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
    >
      <Image
        // ref={videoRef}
        // as="video"
        src={data.imgLink}
        backgroundSize="cover"
        minW="full"
        minH={['240px', '280px', 'full']}
        display="flex"
        flexDirection="column"
        objectFit="cover"
        justifyContent="center"
        // onEnded={() => setPlay(false)}
      />
      {/* <Box
        ref={videoRef}
        as="video"
        src={ExampleVideo}
        backgroundSize="cover"
        minW="full"
        minH="full"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        onEnded={() => setPlay(false)}
      /> */}
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
          size={index === 0 ? ['lg', 'xl', '2xl', '3xl'] : ['md', 'lg', 'xl', '2xl']}
          color="white"
          lineHeight="100%"
          whiteSpace="pre-line"
        >
          {data.title}
        </Heading>
        <Text
          mt="2"
          color="white"
          fontSize={['xs', 'md', 'lg', '2xl']}
          fontWeight="400"
          whiteSpace="pre-line"
        >
          {data.desc}
        </Text>
      </Box>
    </Box>
  );
}
