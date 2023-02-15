import React, { useState } from 'react';
import {
  Text,
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  Collapse,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Images from '../../../Configs/images';

const prosesAdaptasiContent = `Karena pertumbuhan dan perkembangan kebutuhan manusia, alat transportasi perairan seperti yang diuraikan sebelumnya tidak mampu lagi memenuhi kebutuhan dan mobilitas penduduk. Untuk memenuhi kebutuhan dimaksud, manusia kemudian menciptakan perahu yang lebih besar. Perahu yang lebih besar ini tidak lagi terbuat dari batang kayu yang dikeruk tetapi sudah mulai menggunakan balok dasar yang disebut Lunas (kalabiseang, konjo).
Dindingnya terbuat dari kepingan—kepingan papan yang tentu Saja pada awal terciptanya dibuat dengan teknik yang sederhana, Tidak diketahui dengan pasti kapan jenis perahu ini tercipta di Sulawesi Selatan, namun diperkirakan mulai dibuat sekitar abad ke-16. Seperti telah dijelaskan sebelumnya bahwa kepandaian orang Ara dan Lemo-lemo membuat perahu yang disusun dari kepingan papan berawal dari ditemukannya kepingan perahu Sawerigading yang terdampar di sekitar perairan Tanjung Bira.
Dari ciptaan awal inilah selanjutnya perahu dikembangkan terus dari waktu ke waktu sesuai dengan tuntutan kebutuhan, baik mengenai teknik pembuatannya maupun kapasitas angkutnya. Pengembangan teknik serta kapasitas perahu yang dimaksud berlangsung selama ratusan tahun (secara evolusi) dan diperkirakan pada akhir abad ke-19 atau sekitar 1900 terciptalah Kapal Phinisi`;

export default function Component() {
  const [fullContent, setFullContent] = useState(false);

  return (
    <>
      <Box bg="blue.50" py={['10', '12', '14']}>
        <Container maxW="4xl" textAlign="center">
          <Heading size="lg">Sejarah Phinisi</Heading>
          <Heading size="4xl">Lorem ipsum dolor sit amet consectetur.</Heading>
          <Text fontSize="3xl" mt="14" noOfLines={5}>
            Masyarakat Bugis-Makassar dikenal sebagai masyarakat
            yang memiliki kemampuan yang sangat luar biasa dalam
            dunia kemaritiman. Tak hanya pandai dalam berhadapan
            dengan segala macam mara bahaya yang membentang di laut,
            masyarakat Bugis-Makassar juga pandai dalam pembuatan
            perahu, salah satunya adalah Phinisi.
          </Text>
          <Text cursor="pointer" color="blue.700" mt="4" fontSize="3xl" fontWeight="400">Lebih lanjut &gt;</Text>
        </Container>
        <Container maxW="5xl">
          <SimpleGrid mt="12" columns={[2, 2, 4]} gap={6}>
            {new Array(4).fill(0).map((k, i) => (
              <Box
                key={i}
                borderRadius={24}
                bg="white"
                overflow="hidden"
                textAlign="center"
                pb="8"
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
              >
                <Image src={Images.Order6} w="full" height={230} objectFit="cover" />
                <Heading fontSize="2xl" mt="4">Sampan</Heading>
                <Text mt="4" fontSize="xl">Lorem ipsum dolor sit amet consectetur.</Text>
                <Text cursor="pointer" color="blue.700" mt="4" fontSize="xl">Lebih lanjut &gt;</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Container maxW="5xl" py={['5', '7', '9']} textAlign="center">
        <Heading size="2xl">Proses Adaptasi</Heading>
        <Collapse startingHeight={340} in={fullContent}>
          <Text whiteSpace="pre-line" fontSize="3xl" mt="4">
            {prosesAdaptasiContent}
          </Text>
        </Collapse>
        <Box cursor="pointer" display="inline">
          {fullContent
            ? <ChevronUpIcon boxSize="42px" onClick={() => setFullContent(false)} />
            : <ChevronDownIcon boxSize="42px" onClick={() => setFullContent(true)} />}
        </Box>
      </Container>

      <Box bg="blue.50" py={['10', '12', '14']}>
        <Container maxW="5xl">
          <Box textAlign="center">
            <Heading size="lg">Perkembangan</Heading>
            <Heading size="4xl">Perahu Berlunas</Heading>
          </Box>
          <Stack direction="column" mt="12" spacing="12">
            {new Array(7).fill(0).map((k, i) => (
              <Flex
                key={i}
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                borderRadius={25}
                overflow="hidden"
                gap="10"
                alignItems="center"
                bg="white"
              >
                <Box flex={2}>
                  <Image src={Images.Order6} w="full" objectFit="cover" h="295" />
                </Box>
                <Box flex={3} textAlign="center">
                  <Heading size="xl">Perahu Pa’dewakang</Heading>
                  <Text noOfLines={3} mt="6" fontSize="xl">
                    Pa’dewakang merupakan perahu kuno pertama tercipta yang memakai lunas
                    dan dindingnya terdiri dari kepingan-kepingan papan yang disusun.
                  </Text>
                  <Text cursor="pointer" color="blue.700" mt="4" fontSize="xl">Lebih lanjut &gt;</Text>
                </Box>
              </Flex>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
