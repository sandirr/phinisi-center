/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  Text,
  Box,
  Container,
  Image,
  Heading,
  Flex,
  Button,
  Divider,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  CloseButton,
  Select,
  Badge,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import SwiperCore, {
  Navigation,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import Images from '../../../Configs/images';

const images = [
  Images.Order1,
  Images.Order2,
  Images.Order3,
  Images.Order4,
  Images.Order5,
];

export default function Component() {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const [fullImg, setFullImg] = useState('');
  const [desc] = useState(`Halo sahabat Pinisi ⛵️Persiapkan diri kamu untuk pengalaman berlayar
            dengan Kapal Pinisi mengelilingi destinasi wisata andalan Bulukumba
            dan melihat lebih dekat detail desain Kapal Pinisi, dan menikmati
            makan malam serta hiburan lainnya.

            ⛵️Jadwal Open Trip :🗓 11 dan 18 Desember 2021
            Price rate :Rp. 400k/personJadwal
            Meeting Point :📍Pelabuhan BiraTrip

            Included :
            • Welcome drink
            • Speed boat
            • Bulukumba Traditional Snacks
            • Infused water, Tea, and Coffee
            • Intimate Dinner
            • Tour guide
            • Life Jacket
            • Live Music
            • Fireworks
            • Exclusive Documentation

            Demi kenyamanan dan keselamatan kamu selama berlayar,
            kuota seats kami batasi untuk 17 orang saja per sailing trip.
            Jadi segera reservasi sebelum kehabisan seatsnya,
            terima kasih Sahabat Pinisi.`);

  const sendWAMessage = () => {
    window.open('https://wa.me/6282197493245?text=Halo, Mauka ikut ini trip sama teman2 ku adakah diskonnn', '_blank');
  };

  return (
    <Container maxW="7xl" py="5">
      <Heading size="xl">
        Augustine Phinisi
        {id}
      </Heading>
      <Text size="xl" mt="2">Labuan Bajo, Nusa Tenggara Timur, Indonesia</Text>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={2} mt={6}>
        {images.map((image, i) => (
          <GridItem key={i} rowSpan={i === 0 ? 2 : 1} colSpan={i === 0 ? 2 : 1} height="auto">
            <Image cursor="pointer" onClick={() => setFullImg(image)} src={image} width="full" height="full" />
          </GridItem>
        ))}
      </Grid>

      <Flex flexWrap="wrap" mt="6" gap="6" justify="space-between">
        <Box flex={1} minW={{ base: 'xs', md: 'lg' }}>
          <Text size="lg">Bulukumba, Sulawesi Selatan</Text>
          <Heading size="lg">11 dan 18 Desember 2023</Heading>
          <Divider my={6} w="full" />
          <Heading size="sm">Deskripsi</Heading>
          <Text size="md" mt="4" whiteSpace="pre-line">
            {desc}
          </Text>
          <Divider my={6} w="full" />
        </Box>
        <Box minW={{ base: 'xs', sm: 'sm', md: 'lg' }}>
          <Box
            borderRadius={24}
            px="6"
            py="7"
            mt="3"
            w="full"
            boxShadow="0px 20px 25px -5px rgba(0, 0, 0, 0.1), inset 0px 0px 2px rgba(0, 0, 0, 0.25)"
          >
            <Text size={['xs', 'sm', 'md']}>Mulai dari</Text>
            <Heading fontSize={['lg', 'xl', '2xl']}>Rp 999.000 /Pax</Heading>
            <Select placeholder="Jumlah Tamu" mt="6">
              {new Array(12).fill(0).map((e, i) => (
                <option key={i} value={i}>
                  {i}
                  {' '}
                  Orang
                </option>
              ))}
            </Select>
            <Button
              w="full"
              mt={6}
              colorScheme="blue"
              bg="blue.600"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={sendWAMessage}
            >
              Join Sekarang
            </Button>
            <Flex mt="6" justify="space-between" alignItems="center">
              <Text textDecorationLine="underline">Rp 999.000 x 10</Text>
              <Text>Rp 9.990.000</Text>
            </Flex>
            <Flex mt="2" justify="space-between" alignItems="center">
              <Text textDecorationLine="underline">Biaya Layanan</Text>
              <Badge colorScheme="green" textTransform="none">Gratis</Badge>
            </Flex>
            <Flex mt="6" justify="space-between" alignItems="center">
              <Heading size="md">Estimasi Total Biaya</Heading>
              <Heading size="md">Rp 9.990.000</Heading>
            </Flex>
          </Box>
        </Box>
      </Flex>

      <Modal isOpen={!!fullImg} onClose={() => setFullImg('')} size="5xl">
        <ModalOverlay />
        <ModalContent bg="transparent" position="relative">
          <CloseButton onClick={() => setFullImg('')} color="#fff" position="absolute" top={4} right={4} size="lg" zIndex={9999} />
          <Swiper
            slidesPerView={1}
            initialSlide={images.indexOf(fullImg)}
            modules={[Navigation]}
            centeredSlides
            autoplay={false}
            style={{
              width: '100%',
              '--swiper-navigation-color': '#FFF',
            }}
            loop
            navigation
          >
            {images.map((img) => (
              <SwiperSlide key={img}>
                <Image src={img} h="full" w="full" objectFit="cover" borderRadius={24} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ModalContent>
      </Modal>
    </Container>
  );
}
