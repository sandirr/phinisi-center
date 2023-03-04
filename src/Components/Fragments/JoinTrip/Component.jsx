/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  Box,
  Container,
  Flex,
  Heading,
  useMediaQuery,
  Button,
  useDimensions,
  Skeleton,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Navigation,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Images from '../../../Configs/images';
import Elements from '../../Elements';
import { callFunc } from '../../../Configs/firebase';

export default function Component() {
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const slidesPerView = isMobile ? 1.25 : 2.5;

  const [trips, setTrips] = useState([]);
  const [meta, setMeta] = useState({
    activePage: 1,
    totalPage: 1,
    total: 1,
  });
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    const callable = callFunc('getTrips');
    setLoading(true);

    await callable({
      limit: 10,
      page: meta.activePage,
      status: 'Open',
    }).then((res) => {
      const {
        data,
        activePage,
        total,
        totalPage,
      } = res.data;

      setTrips(data);
      setMeta({
        activePage,
        total,
        totalPage,
      });

      setHasMoreItems(activePage < totalPage);
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleLoadMore = () => {
    setMeta((prev) => ({
      ...prev,
      activePage: prev.activePage + 1,
    }));
  };

  useEffect(() => {
    const firstLoad = meta.activePage === 1 && !trips.length;
    if (firstLoad || hasMoreItems) {
      getOrders();
    }
  }, [meta.activePage]);

  const [activeSlide, setActiveSlide] = useState(0);
  const maxSlide = Math.ceil(trips.length - slidesPerView);

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
              borderColor={activeSlide === 0 ? 'gray.300' : 'gray.400'}
              h="22px"
              w="22px"
              borderRadius="full"
            >
              <ArrowBackIcon color={activeSlide === 0 ? 'gray.300' : 'gray.400'} />
            </Flex>
            <Flex
              className="review-swiper-button-next"
              justify="center"
              alignItems="center"
              borderWidth={2}
              borderColor={activeSlide >= maxSlide ? 'gray.300' : 'gray.400'}
              h="22px"
              w="22px"
              borderRadius="full"
            >
              <ArrowForwardIcon color={activeSlide >= maxSlide ? 'gray.300' : 'gray.400'} />
            </Flex>
          </Flex>
        </Flex>
      </Container>
      {!!dimensions
      && (
      <Box mt="4">
        <InfiniteScroll
          dataLength={trips.length}
          hasMore={hasMoreItems}
          next={handleLoadMore}
        >
          <Swiper
            spaceBetween={12}
            onSlideChange={(swiper) => swiper.on('transitionEnd', () => {
              setActiveSlide(swiper.activeIndex);
            })}
            slidesPerView={slidesPerView}
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
            {trips.map((data, i) => (
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
                  mb="2"
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
            {loading && [1, 2, 3, 4].map((data, i) => (
              <SwiperSlide key={i}>
                <Box
                  backgroundSize="cover"
                  bgRepeat="no-repeat"
                  backgroundRepeat="no-repeat"
                  w="full"
                  mb="2"
                  h={['180px', '220px', '280px', '320px']}
                  borderRadius={24}
                  px={['4', '6', '8', '10']}
                  pt={['8', '12']}
                  position="relative"
                  bg="#fff"
                  boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                >
                  <Skeleton height="80px" />
                  <Skeleton mt="2" height="20px" />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </InfiniteScroll>
      </Box>
      )}
      <Elements.Loading loading={false} />
    </Box>
  );
}
