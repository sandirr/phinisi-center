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
  Select,
  Stack,
  Badge,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Images from '../../../Configs/images';
import { BathIcon, BedIcon, PeopleIcon } from '../../../Assets/icons/icons';
import Elements from '../../Elements';

const images = [
  Images.Order1,
  Images.Order2,
  Images.Order3,
  Images.Order4,
  Images.Order5,
];

export default function Component() {
  const { id } = useParams();
  const [fullImg, setFullImg] = useState('');

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
          <Flex gap="2">
            <Heading size="lg" fontWeight="400">Project by</Heading>
            <Heading size="lg">Haji Awang</Heading>
          </Flex>
          <Flex mt={2} gap={4}>
            <Flex gap={1} alignItems="center">
              <BedIcon />
              <Divider orientation="vertical" />
              <Text size="lg">4 Kabin</Text>
            </Flex>
            <Flex gap={1} alignItems="center">
              <BathIcon />
              <Divider orientation="vertical" />
              <Text size="lg">2 Kamar Mandi</Text>
            </Flex>
            <Flex gap={1} alignItems="center">
              <PeopleIcon />
              <Divider orientation="vertical" />
              <Text size="lg">12 Tamu</Text>
            </Flex>
          </Flex>
          <Divider my={6} w="full" />
          <Heading size="sm">Deskripsi</Heading>
          <Text size="md" mt="4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nostrum accusantium qui reiciendis corrupti laborum facere eius quasi,
            debitis pariatur iste magni inventore praesentium voluptatibus
            explicabo dolorum totam hic dicta optio.
          </Text>
          <Divider my={6} w="full" />
          <Heading size="sm">Spesifikasi</Heading>
          <Flex mt="4">
            <Box flex={1}>
              <Stack direction="column">
                <Box>
                  <Text fontSize="xs">Tahun Pembuatan</Text>
                  <Text size="md">2016</Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Bobot</Text>
                  <Text size="md">200 Ton</Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Ukuran</Text>
                  <Text size="md">27 x 7 Meter</Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Kecepatan Max</Text>
                  <Text size="md">9 - 10 Knot</Text>
                </Box>
              </Stack>
            </Box>
            <Box flex={1}>
              <Stack direction="column">
                <Box>
                  <Text fontSize="xs">Tipe Kapal</Text>
                  <Text size="md">Phinisi</Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Kapasitas</Text>
                  <Text size="md">14 Tamu</Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Jumlah Kabin</Text>
                  <Text size="md">7 Kamar</Text>
                </Box>
                {/* <Box>
                  <Text fontSize="xs">Jumlah Kru</Text>
                  <Text size="md">18 Orang</Text>
                </Box> */}
              </Stack>
            </Box>
          </Flex>
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
            <Button w="full" mt={6} colorScheme="blue">Booking</Button>
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

      <Elements.ImagesModal defaultImg={fullImg} images={images} close={() => setFullImg('')} />
    </Container>
  );
}
