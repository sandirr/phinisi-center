import React from 'react';
import {
  Box, Container, Heading, Image, Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Images from '../../../Configs/images';

export default function Component() {
  return (
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
  );
}
