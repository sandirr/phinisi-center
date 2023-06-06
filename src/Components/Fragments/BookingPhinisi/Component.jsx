/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  useMediaQuery,
  useDimensions,
  Badge,
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
import { callFunc } from '../../../Configs/firebase';

export default function Component() {
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isTab] = useMediaQuery('(max-width: 1080px)');
  const slidesPerView = isMobile ? 1.75 : isTab ? 3.5 : 4.5;
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({
    activePage: 1,
    totalPage: 1,
    total: 1,
  });
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const maxSlide = Math.ceil(orders.length - slidesPerView);

  const containerRef = useRef(null);
  const dimensions = useDimensions(containerRef, 'resize');

  const getOrders = async () => {
    const callable = callFunc('getBookings');
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

      setOrders(data);
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
    const firstLoad = meta.activePage === 1 && !orders.length;
    if (firstLoad || hasMoreItems) {
      getOrders();
    }
  }, [meta.activePage]);

  return (
    <Box>
      <Container maxW="7xl" ref={containerRef}>
        <Flex alignItems="center" justify="space-between" mt="6">
          <Heading size="lg">Booking Phinisi</Heading>
          <Flex gap="2" alignItems="center">
            <Flex
              className="review-swiper-button-prev2"
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
              className="review-swiper-button-next2"
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
      <Box mt="2">
        <InfiniteScroll
          dataLength={orders.length}
          hasMore={hasMoreItems}
          next={handleLoadMore}
        >
          <Swiper
            spaceBetween={16}
            slidesPerView={slidesPerView}
            // loop
            onSlideChange={(swiper) => swiper.on('transitionEnd', () => {
              setActiveSlide(swiper.activeIndex);
            })}
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
            {orders.map((order, i) => (
              <SwiperSlide key={i}>
                <Box
                  boxShadow="0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  py={['2', '4']}
                  px={['4', '6']}
                  bg="#fff"
                  mb="7"
                  borderRadius={24}
                  cursor="pointer"
                  onClick={() => navigate(`ship/${order.id}`)}
                >
                  <Image h={['140px', '160px']} w="full" objectFit="cover" src={order.images ? order.images[0] : Images.Order6} borderRadius={24} />
                  <Badge variant="solid" colorScheme="blue" bg="blue.600" mt="4" fontSize="xs">
                    Recommended
                  </Badge>
                  <Heading fontSize="lg" mt="1">{order?.name}</Heading>
                  <Text mt="4" size="xl">Mulai 1 juta / Pax</Text>
                </Box>
              </SwiperSlide>
            ))}
            {loading && new Array(5).fill(0).map((item, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  py={['2', '4']}
                  px={['4', '6']}
                  bg="#fff"
                  mb="7"
                  borderRadius={24}
                >
                  <Skeleton height="80px" />
                  <Skeleton height="20px" mt={[2, 4, 6, 8]} />
                  <Skeleton height="20px" mt={[2, 4]} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </InfiniteScroll>
        {!orders.length && !loading && (
        <Box style={{
          paddingLeft: (dimensions?.borderBox?.left || 0)
            + (dimensions?.padding?.left || 0),
          paddingRight: 16,
        }}
        >
          Belum ada kapal bookingan yang tersedia
        </Box>
        )}
      </Box>
      )}
    </Box>
  );
}
