/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
  Text, Box, Container, Heading, Button, Image, SimpleGrid, Skeleton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Images from '../../../Configs/images';
import { LocationIcon, PhinisiIcon } from '../../../Assets/icons/icons';
import { callFunc } from '../../../Configs/firebase';

export default function Component() {
  const videoRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(false);

  const [meta, setMeta] = useState({
    activePage: 1,
    totalPage: 1,
    total: 1,
  });

  const getVendor = async () => {
    const callable = callFunc('getVendors');
    setLoading(true);

    await callable({
      page: meta.activePage, limit: 10,
    })
      .then((res) => {
        const {
          activePage,
          totalPage,
          total,
          data,
        } = res.data;
        const normalizeData = data.map((item, index) => ({
          ...item,
          index: index + 1 + (vendors.length),
        }));
        setVendors([...vendors, ...normalizeData]);
        setHasMoreItems(activePage < totalPage);
        setMeta({
          activePage,
          totalPage,
          total,
        });
      })
      .catch((err) => {
        // console.log('anjing', err);
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
    const firstLoad = meta.activePage === 1 && !vendors.length;
    if (firstLoad || hasMoreItems) {
      getVendor();
    }
  }, [meta.activePage]);

  const handleStartVideo = async () => {
    await videoRef.current.play();
    setPlay(true);
  };

  const handlePauseVideo = async () => {
    await videoRef.current.pause();
    setPlay(false);
  };

  const handleStopVideo = async () => {
    await videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setPlay(false);
  };

  const [timer, setTimer] = useState(null);
  const handleBtnVisibility = () => {
    setShowBtn(true);
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        // do your things...
        setShowBtn(false);
      }, 2000),
    );
  };

  const handleHideBtn = () => {
    setTimeout(() => {
      // do your things...
      setShowBtn(false);
    }, 1000);
  };

  return (
    <Container maxW="7xl">
      <Box
        position="relative"
        borderRadius="3xl"
        overflow="hidden"
        mt="6"
        onMouseMove={handleBtnVisibility}
        onMouseOut={handleHideBtn}
        // onMouseUp={handleStopVideo}
      >
        <Box
          // ref={videoRef}
          // as="video"
          as="img"
          // src={ExampleVideo}
          src={Images.LabuanBajo}
          backgroundSize="cover"
          objectFit="cover"
          minW="full"
          h={[220, 420, 480, 520]}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          onEnded={handleStopVideo}
        />
        <Box
          position="absolute"
          top="0"
          bottom="0.5"
          left="0.5"
          right="0.5"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          background="linear-gradient(0deg, rgba(9, 27, 60, 0.4), rgba(9, 27, 60, 0.4))"
        >
          <Heading
            fontWeight="700"
            size={['md', 'lg', 'xl']}
            color="white"
            lineHeight="100%"
            display={play ? 'none' : 'block'}
          >
            Miliki Phinisi Impian mu
          </Heading>
          <Text
            mt={{ base: '2', md: '4' }}
            color="white"
            fontSize={['xs', 'sm', 'md']}
            fontWeight="400"
            textAlign="center"
            display={play ? 'none' : 'inline-block'}
          >
            kami membantu mewujudkan phinisi impianmu
          </Text>
          {play
            ? (
              <Button
                variant="outline"
                mt={{ base: '2', md: '4' }}
                display={showBtn ? 'inline-block' : 'none'}
                color="white"
                alignItems="center"
                // onClick={handlePauseVideo}
                colorScheme="whiteAlpha"
                fontWeight="semibold"
              >
                Pause
              </Button>
            )
            : (
              <Button
                variant="outline"
                mt={{ base: '2', md: '4' }}
                color="white"
                alignItems="center"
                // onClick={handleStartVideo}
                leftIcon={<Image src={Images.Play} />}
                colorScheme="whiteAlpha"
                fontWeight="semibold"
              >
                How it work
              </Button>
            )}
        </Box>
      </Box>
      <Box mt="6">
        <Heading size={['md', 'lg']}>Daftar Vendor</Heading>
        <InfiniteScroll
          dataLength={vendors.length}
          hasMore={hasMoreItems}
          next={handleLoadMore}
        >
          <SimpleGrid
            columns={[2, 3, 4, 5]}
            gap={[3, 4, 5, 6]}
            mt="4"
            mb="16"
          >
            {vendors.map((vendor, idx) => (
              <Box
                key={idx}
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                borderRadius="16"
                padding={[3, 4]}
                as={Link}
                to={`vendor/${vendor.id}`}
              >
                <Image
                  src={vendor.cover || Images.Order1}
                  w="100%"
                  objectFit="cover"
                  borderRadius={8}
                />
                <Heading size={['xs', 'sm', 'md']} mt={[2, 3, 4]}>{vendor.name}</Heading>
                <Box mt={[2, 4, 6, 8]}>
                  <Box display="flex" alignItems="center" gap="2">
                    <LocationIcon fontSize={['xs', 'sm', 'md']} />
                    <Text fontSize={['xs', 'sm', 'md']}>{vendor.city || 'Bulukumba'}</Text>
                  </Box>
                  <Box display="flex" alignItems="center" gap="2" mt={[1, 2]}>
                    <PhinisiIcon fontSize={['xs', 'sm', 'md']} />
                    <Text fontSize={['xs', 'sm', 'md']}>
                      {vendor.sold || 0}
                      {' '}
                      Phinisi
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
            {loading && new Array(5).fill(0).map((item, idx) => (
              <Box
                key={idx}
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                borderRadius="16"
                padding={[3, 4]}
              >
                <Skeleton height="80px" />
                <Skeleton height="20px" mt={[2, 4, 6, 8]} />
                <Skeleton height="20px" mt={[2, 4]} />
              </Box>
            ))}
          </SimpleGrid>
        </InfiniteScroll>
      </Box>
    </Container>
  );
}
