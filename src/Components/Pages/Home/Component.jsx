/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  Tabs,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
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
  const [openSF, setOpenSF] = useState(false);
  const [sf] = useState([
    {
      title: 'Sejarah Phinisi',
      desc: 'Kapal phinisi adalah salah satu sebutan bagi kapal yang menggunakan sistem tiang, tali, dan layar. kapal pinisi disinyalir pertama kali dibuat dalam perjalanan panjang Seorang pangeran kebesaran kerajaan luwu Sawerigading untuk menemui calon istrinya We Cudai ke negeri china',
    },
    {
      title: 'Filosofi Phinisi',
      desc: 'Para pengrajin kapal phinisi melihat kapal yang mereka kerjakan bukan semata mata benda mati, mereka melihat hubungan antara manusia dengan kapal ialah hubungan antara subjek dengan subjek, bukan hubungan antara subjek dengan objek, sehinga mereka memperlakukan kapal bukan sebagai alat untuk berlayar melainkan sebagai anak kandung yang dibesarkankan dan dirawat sepenuh hati sehingga ada perasaan cinta kasih dalam proses pembuatannya.',
    },
  ]);

  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isPad] = useMediaQuery('(max-width: 960px)');

  return (
    <>
      <Box bg="white" boxShadow="md" pt="6">
        <Container maxW="7xl">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display={{ base: 'none', md: 'flex' }} gap="4" flex={1}>
              <Link to="/">
                <img src={Images.Instagram} alt="ig" />
              </Link>
              <Link to="/">
                <img src={Images.Tiktok} alt="tt" />
              </Link>
              <Link to="/">
                <img src={Images.Youtube} alt="yt" />
              </Link>
            </Box>
            <Box>
              <img src={Images.Logo} alt="Phinisi Center" width="120" />
            </Box>
            <Box flex={1} textAlign="right">
              <Button colorScheme="blue" color="blue.500" variant="outline">
                Login
              </Button>
            </Box>
          </Box>
          <Box
            mt="6"
            overflowX="auto"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <Tabs>
              <TabList>
                <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }} fontWeight="medium">Beranda</Tab>
                <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }} fontWeight="medium" onMouseEnter={() => setOpenSF(true)} onMouseLeave={() => setOpenSF(false)}>
                  <Menu isOpen={openSF}>
                    <MenuButton fontWeight="medium" whiteSpace="nowrap">
                      Sejarah & Filosofi
                    </MenuButton>
                    <MenuList mt="0.5" ml="-4" minWidth="160px" borderTopRightRadius="0" borderTopLeftRadius="0">
                      <MenuItem>Sejarah</MenuItem>
                      <MenuItem>Filosofi</MenuItem>
                    </MenuList>
                  </Menu>
                </Tab>
                <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }} fontWeight="medium">Pemesanan</Tab>
                <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }} fontWeight="medium">Penyewaan</Tab>
                <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }} fontWeight="medium">Artikel</Tab>
              </TabList>
            </Tabs>
          </Box>
        </Container>
      </Box>
      <Box position="relative" style={{ zIndex: 0 }} mt="0.5">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => `<span class="${className}" style="background-color:#fff; height:5px; width:28px; border-radius:24px;"></span>`,
          }}
          style={{
            '--swiper-pagination-color': '#FFF',
            '--swiper-pagination-bullet-inactive-color': '#FFF',
            '--swiper-pagination-bullet-inactive-opacity': '0.4',
            '--swiper-pagination-bullet-opacity': '0.9',
          }}
          modules={[Pagination]}
        >
          {[1, 2].map((i) => (
            <SwiperSlide key={i}>
              <Box
                style={{
                  backgroundSize: 'cover',
                  width: '100%',
                  background: 'linear-gradient(90.14deg, rgba(9, 27, 60, 0.8) 0.11%, rgba(0, 0, 0, 0) 62.07%), url("https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80")',
                }}
                height={{ base: '40vh', md: '60vh', lg: '70vh' }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                pl={{ base: '8', md: '16', lg: '40' }}
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
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

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
          // effect="coverflow"
          // coverflowEffect={{
          //   rotate: 50,
          //   stretch: 0,
          //   depth: 100,
          //   modifier: 1,
          //   slideShadows: true,
          // }}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {sf.map((text) => (
            <SwiperSlide key={text.title}>
              <Box
                style={{
                  backgroundSize: 'cover',
                  borderRadius: 24,
                  background: 'linear-gradient(90deg, rgba(9, 27, 60, 0.7) 0%, rgba(0, 0, 0, 0) 68.79%), url("https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80")',
                }}
                display="flex"
                height={{ base: 200, md: 250, lg: 300 }}
                flexDirection="column"
                justifyContent="center"
                pl={{ base: '4', md: '12', lg: '20' }}
              >
                <Heading
                  color="white"
                  size={{
                    base: 'md', lg: 'xl', xl: '2xl',
                  }}
                  fontWeight="700"
                >
                  {text.title}
                </Heading>
                <Text
                  width={{
                    base: '48', sm: '56', md: 'sm', lg: 'md',
                  }}
                  noOfLines={3}
                  color="white"
                  size={{ base: 'xs', lg: 'sm' }}
                  mt={{ base: 2, md: 4, lg: 5 }}
                >
                  {text.desc}
                </Text>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box my={10}>
        <Container maxW="3xl">
          <Heading color="blackAlpha.900" size="md" ml={2.5}>Artikel Populer</Heading>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6} mt={2}>
            {[1, 2, 3].map((i) => (
              <GridItem key={i} rowSpan={i === 1 ? 2 : 1} height={i === 1 ? 450 : 'auto'}>
                <Box
                  style={{
                    backgroundSize: 'cover',
                    borderRadius: 24,
                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 59.36%), url("https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80")',
                  }}
                  height="100%"
                  pl={{ base: '6', md: '8', lg: '12' }}
                  py="12"
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                >
                  <Heading size="xs" color="white" fontWeight="700">FUN FACT</Heading>
                  <Heading size={{ base: 'xs', lg: 'md' }} color="white" fontWeight="700" width={175} lineHeight="120%" mt={1}>
                    5 Phinisi termahal
                    Sepanjang Masa
                  </Heading>
                  <Button mt={4} py="1.5" px="3" fontWeight="semibold" bg="gray.100" color="gray.800" alignSelf="flex-start" size="sm">Baca Artikel</Button>
                </Box>
              </GridItem>
            ))}

          </Grid>
        </Container>
      </Box>

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

      <Box bg="#2263DD" color="white" py="6" overflow="hidden">
        <Container minW="7xl">
          <Box display="flex" justifyContent="space-between" gap={{ base: '20px', md: '60px' }} flexDirection={{ base: 'column', xl: 'row' }}>
            <Box>
              <Image src={Images.LogoWhite} alt="phinisi center" />
              <Text maxWidth={314} size="xs" my={4}>Lorem ipsum dolor sit amet consectetur. Ultrices sit vel integer arcu. </Text>
              <Box display="flex" gap="2">
                <Link to="/">
                  <img src={Images.InstagramWhite} alt="ig" />
                </Link>
                <Link to="/">
                  <img src={Images.TiktokWhite} alt="tt" />
                </Link>
                <Link to="/">
                  <img src={Images.YoutubeWhite} alt="yt" />
                </Link>
              </Box>
            </Box>
            <Box display="flex" gap={{ base: '20px', md: '60px' }} flexDirection={{ base: 'column', md: 'row' }}>
              <Box>
                <Heading size="xs" fontWeight="700">Produk</Heading>
                <Link to="/">
                  <Text mt={3} fontSize="xs">Sejarah & Filosofi</Text>
                </Link>
                <Link to="/">
                  <Text mt={3} fontSize="xs">Pemesanan</Text>
                </Link>
                <Link to="/">
                  <Text mt={3} fontSize="xs">Penyewaan</Text>
                </Link>
                <Link to="/">
                  <Text mt={3} fontSize="xs">Artikel</Text>
                </Link>
              </Box>
              <Box>
                <Heading size="xs" fontWeight="700">Dukungan</Heading>
                <Link to="/">
                  <Text mt={3} fontSize="xs">FAQ</Text>
                </Link>
                <Link to="/">
                  <Text mt={3} fontSize="xs">Privacy Policy</Text>
                </Link>
                <Link to="/">
                  <Text mt={3} fontSize="xs">Syarat & Ketentuan</Text>
                </Link>
                <Link to="/">
                  <Text mt={3} fontSize="xs">Tentang Kami</Text>
                </Link>
              </Box>
              <Box>
                <Heading size="xs" fontWeight="700">Sponsor</Heading>
                <Link to="/">
                  <Text mt={3} fontSize="xs">Dana Indonesiana</Text>
                </Link>
                <Link to="/">
                  <Text mt={3} fontSize="xs">Kemenparekraf</Text>
                </Link>
                <Link to="/">
                  <Text mt={3} fontSize="xs">Kemendikbud</Text>
                </Link>
              </Box>
              <Box>
                <Heading size="xs" fontWeight="700">Contact</Heading>
                <Link to="/">
                  <Text mt={3} fontSize="xs">phinisicenterid@gmail.com</Text>
                </Link>
                <Link to="/">
                  <Text mt={3} fontSize="xs" maxWidth="160px" lineHeight="150%">
                    Jl. Pembuatan Perahu Pinisi,
                    Bulukumba, Sulawesi Selatan
                  </Text>
                </Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
