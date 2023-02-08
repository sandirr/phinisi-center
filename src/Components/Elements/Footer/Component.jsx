import React from 'react';
import {
  Box, Container, Heading, Image, Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Images from '../../../Configs/images';
import ROUTES from '../../../Configs/routes';

export default function Component() {
  return (
    <Box
      bg="#2263DD"
      color="white"
      py="6"
      overflow="hidden"
    >
      <Container minW="7xl">
        <Box display="flex" justifyContent="space-between" gap={{ base: '20px', md: '60px' }} flexDirection={{ base: 'column', xl: 'row' }}>
          <Box>
            <Image src={Images.LogoWhite} alt="phinisi center" />
            <Text maxWidth={314} size="xs" my={4}>
              Exploring the oceans with pride and history,
              Phinisi Center inspires adventure
            </Text>
            <Box display="flex" gap="2">
              <a href="https://instagram.com/phinisicenter.id?igshid=ZDdkNTZiNTM=" target="_blank" rel="noreferrer">
                <img src={Images.InstagramWhite} alt="ig" />
              </a>
              <a href="https://www.tiktok.com/@phinisicenter.id?_t=8ZZ6Cgqxjft&_r=1" target="_blank" rel="noreferrer">
                <img src={Images.TiktokWhite} alt="tt" />
              </a>
              <a href="https://youtube.com/@phinisicenter" target="_blank" rel="noreferrer">
                <img src={Images.YoutubeWhite} alt="yt" />
              </a>
            </Box>
          </Box>
          <Box display="flex" gap={{ base: '20px', md: '60px' }} flexDirection={{ base: 'column', md: 'row' }}>
            <Box>
              <Heading size="xs" fontWeight="700">Produk</Heading>
              <Link to={ROUTES.sejarah()}>
                <Text mt={3} fontSize="xs">Sejarah & Filosofi</Text>
              </Link>
              <Link to={ROUTES.pemesanan()}>
                <Text mt={3} fontSize="xs">Pemesanan</Text>
              </Link>
              <Link to={ROUTES.penyewaan()}>
                <Text mt={3} fontSize="xs">Penyewaan</Text>
              </Link>
              <Link to={ROUTES.artikel()}>
                <Text mt={3} fontSize="xs">Artikel</Text>
              </Link>
            </Box>
            <Box>
              <Heading size="xs" fontWeight="700">Dukungan</Heading>
              <Link to={ROUTES.faq()}>
                <Text mt={3} fontSize="xs">FAQ</Text>
              </Link>
              <Link to={ROUTES.privacy()}>
                <Text mt={3} fontSize="xs">Privacy Policy</Text>
              </Link>
              <Link to={ROUTES.terms()}>
                <Text mt={3} fontSize="xs">Syarat & Ketentuan</Text>
              </Link>
              <Link to={ROUTES.about()}>
                <Text mt={3} fontSize="xs">Tentang Kami</Text>
              </Link>
            </Box>
            <Box>
              <Heading size="xs" fontWeight="700">Sponsor</Heading>
              <a href="https://www.kemdikbud.go.id/" target="_blank" rel="noreferrer">
                <Text mt={3} fontSize="xs">Kemendikbud</Text>
              </a>
              <a href="https://danaindonesiana.kemdikbud.go.id/" target="_blank" rel="noreferrer">
                <Text mt={3} fontSize="xs">Dana Indonesiana</Text>
              </a>
              <a href="https://lpdp.kemenkeu.go.id/" target="_blank" rel="noreferrer">
                <Text mt={3} fontSize="xs">LPDP</Text>
              </a>
            </Box>
            <Box>
              <Heading size="xs" fontWeight="700">Contact</Heading>
              <Link to="/">
                <Text mt={3} fontSize="xs">phinisicenterid@gmail.com</Text>
              </Link>
              <Text mt={3} fontSize="xs" maxWidth="160px" lineHeight="150%">
                Jl. Pembuatan Perahu Pinisi,
                Bulukumba, Sulawesi Selatan
              </Text>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
