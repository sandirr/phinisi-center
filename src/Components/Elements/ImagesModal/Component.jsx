/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  CloseButton,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import SwiperCore, {
  Navigation,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

export default function Component({ defaultImg, images, close }) {
  SwiperCore.use([Navigation]);
  return (
    <Modal isOpen={!!defaultImg} onClose={close} size="5xl" isCentered>
      <ModalOverlay />
      <ModalContent bg="transparent" position="relative">
        <CloseButton onClick={close} color="#fff" position="absolute" top={4} right={4} size="lg" zIndex={9999} />
        <Swiper
          slidesPerView={1}
          initialSlide={images.indexOf(defaultImg)}
          modules={[Navigation]}
          centeredSlides
          autoplay={false}
          style={{
            width: '100%',
            '--swiper-navigation-color': '#FFF',
          }}
          // loop
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
  );
}
