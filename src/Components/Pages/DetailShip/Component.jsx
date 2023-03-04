/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Text,
  Box,
  Container,
  Image,
  Heading,
  Flex,
  Button,
  Divider,
  Stack,
  Grid,
  GridItem,
  Select,
  Badge,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { BathIcon, BedIcon, PeopleIcon } from '../../../Assets/icons/icons';
import Elements from '../../Elements';
import { callFunc } from '../../../Configs/firebase';

export default function Component() {
  const { bookId } = useParams();
  const [fullImg, setFullImg] = useState('');

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({ detailVendor: {}, images: [] });

  const getBook = async () => {
    const callable = callFunc('getBooking');

    setLoading(true);
    await callable(bookId).then((res) => {
      setOrder(res.data);
    }).catch(() => {
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (bookId) {
      getBook();
    }
  }, [bookId]);

  return (
    <Container maxW="7xl" py="5">
      <Elements.Loading loading={loading} />
      <Heading size="xl">
        {order.name}
      </Heading>
      <Text size="xl" mt="2">{order.location}</Text>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={2} mt={6} borderRadius={16} overflow="hidden">
        {order.images?.slice(0, 5)?.map((image, i) => (
          <GridItem key={i} rowSpan={i === 0 ? 2 : 1} colSpan={i === 0 ? 2 : 1} height="auto">
            <Image cursor="pointer" objectFit="cover" onClick={() => setFullImg(image)} src={image} w="full" h="full" />
          </GridItem>
        ))}
      </Grid>

      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(5, 1fr)" my={[2, 4, 6]} gap={[4, 5, 6]}>
        <GridItem colSpan={[5, 5, 3]}>
          <Flex gap="2">
            <Heading size="lg" fontWeight="400">Project by</Heading>
            <Heading size="lg">{order.detailVendor.name}</Heading>
          </Flex>
          <Flex mt={2} gap={4}>
            <Flex gap={1} alignItems="center">
              <BedIcon />
              <Divider orientation="vertical" />
              <Text size="lg">
                {order.cabin}
                {' '}
                Kabin
              </Text>
            </Flex>
            <Flex gap={1} alignItems="center">
              <BathIcon />
              <Divider orientation="vertical" />
              <Text size="lg">
                {order.wc}
                {' '}
                Kamar Mandi
              </Text>
            </Flex>
            <Flex gap={1} alignItems="center">
              <PeopleIcon />
              <Divider orientation="vertical" />
              <Text size="lg" whiteSpace="pre-line">
                {order.capacity}
                {' '}
                Tamu
              </Text>
            </Flex>
          </Flex>
          <Divider my={6} w="full" />
          <Heading size="sm">Deskripsi</Heading>
          <Text size="md" mt="4">
            {order.description}
          </Text>
          <Divider my={6} w="full" />
          <Heading size="sm">Spesifikasi</Heading>
          <Flex mt="4">
            <Box flex={1}>
              <Stack direction="column">
                <Box>
                  <Text fontSize="xs">Tahun Pembuatan</Text>
                  <Text size="md">{order.created}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Bobot</Text>
                  <Text size="md">
                    {order.weight}
                    {' '}
                    Ton
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Ukuran</Text>
                  <Text size="md">
                    {order.long}
                    {' '}
                    x
                    {' '}
                    {order.width}
                    {' '}
                    Meter
                  </Text>
                </Box>
              </Stack>
            </Box>
            <Box flex={1}>
              <Stack direction="column">
                <Box>
                  <Text fontSize="xs">Kecepatan Max</Text>
                  <Text size="md">
                    {order.speed}
                    {' '}
                    Knot
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Kapasitas</Text>
                  <Text size="md">
                    {order.capacity}
                    {' '}
                    Tamu
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Jumlah Kabin</Text>
                  <Text size="md">
                    {order.cabin}
                    {' '}
                    Kamar
                  </Text>
                </Box>
                {/* <Box>
                  <Text fontSize="xs">Jumlah Kru</Text>
                  <Text size="md">18 Orang</Text>
                </Box> */}
              </Stack>
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={[5, 5, 2]}>
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
        </GridItem>
      </Grid>

      <Elements.ImagesModal defaultImg={fullImg} images={order.images || []} close={() => setFullImg('')} />
    </Container>
  );
}
