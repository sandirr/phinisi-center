import React from 'react';
import {
  Box,
  CloseButton,
  Container,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Images from '../../../Configs/images';

export default function Component({ open, data, onClose }) {
  return (
    <Modal isOpen={!!open} size="5xl" scrollBehavior="outside" onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={24}>
        <ModalBody
          position="relative"
          px={data.meta ? '0' : ['4', '6', '8', '10', '12']}
          pt={data.meta ? '0' : ['4', '6', '8', '10', '12']}
          pb={['4', '6', '8', '10', '12']}
        >
          <CloseButton
            position="absolute"
            right={['2', '3', '4', '5']}
            top={['2', '3', '4', '5']}
            size={['md', 'lg']}
            bg="rgba(0, 0, 0, 0.2)"
            color="white"
            borderRadius="full"
            outline="none"
            onClick={onClose}
          />
          <Image mb={['4', '5', '6', '7', '8']} src={data.cover || Images.Order4} w="full" h="full" borderRadius="24px 24px 0px 0px" />
          <Box as={data.meta ? Container : Box} maxW={data.meta ? '4xl' : 'full'}>
            {!!data.meta
          && <Heading size={['sm', 'md', 'lg']}>{data.meta}</Heading>}
            <Heading fontSize={data.meta ? ['3xl', '4xl', '5xl', '6xl'] : ['xl', '2xl', '3xl', '4xl']}>{data.meta ? data.category : data.title}</Heading>
            {!!data.category && !data.meta
          && <Text fontSize={['md', 'xl', '2xl']} mt={['1', '2']}>{data.category}</Text>}
            <Text fontSize={['md', 'lg', 'xl']} whiteSpace="pre-line" mt={['4', '5', '6', '7', '8']} textAlign="justify">
              <Box dangerouslySetInnerHTML={{ __html: data.content }} />
            </Text>
            <Box textAlign="center">
              <Text
                as={Link}
                display="inline-block"
                to="/"
                color="blue.700"
                mt="4"
                cursor="pointer"
                fontSize={['md', 'lg', 'xl']}
              >
                Kembali ke beranda
              </Text>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
