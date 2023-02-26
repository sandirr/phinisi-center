/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Box,
  CloseButton,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import {
  Navigation,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Component({ defaultImg, images, close }) {
  // SwiperCore.use([Navigation]);
  return (
    <Modal isOpen={!!defaultImg} onClose={close} size="5xl" isCentered scrollBehavior="outside">
      <ModalOverlay />
      <ModalContent bg="transparent" position="relative">
        <CloseButton onClick={close} color="#fff" bg="blackAlpha.300" position="absolute" top={4} right={4} size="lg" zIndex={9999} />
        <Swiper
          initialSlide={images?.indexOf(defaultImg)}
          modules={[Navigation]}
          centeredSlides
          style={{
            width: '100%',
            '--swiper-navigation-color': '#FFF',
          }}
          navigation
          autoHeight
        >
          {images?.map((img) => (
            <SwiperSlide key={img} style={{ overflow: 'auto' }}>
              <Box display="flex" alignItems="center" justifyContent="center" overflowY="auto">
                <Image src={img} h="full" w="full" objectFit="cover" borderRadius={24} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </ModalContent>
    </Modal>
  );
}
