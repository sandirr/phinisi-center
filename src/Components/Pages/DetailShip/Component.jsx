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
import { normalizeRupiah } from '../../../Utils/text';

export default function Component() {
  const { bookId } = useParams();
  const [fullImg, setFullImg] = useState('');
  const [pax, setPax] = useState(0);

  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({ detailVendor: {}, images: [] });

  const getBook = async () => {
    const callable = callFunc('getBooking');

    setLoading(true);
    await callable(bookId).then((res) => {
      setBook(res.data);
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

  const sendWAMessage = () => {
    window.open(`https://wa.me/6282197493245?text=Halo,
    Mauka ikut ini trip ${book.name} adakah diskonnn?
    jumlah orang: ${pax}
    harga: Rp${book.price}
    total: Rp${normalizeRupiah(`${book.price * pax}`)}`, '_blank');
  };

  return (
    <Container maxW="7xl" py="5">
      <Elements.Loading loading={loading} />
      <Heading size="xl">
        {book.name}
      </Heading>
      <Text size="xl" mt="2">{book.location}</Text>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={2} mt={6} borderRadius={16} overflow="hidden">
        {book.images?.slice(0, 5)?.map((image, i) => (
          <GridItem key={i} rowSpan={i === 0 ? 2 : 1} colSpan={i === 0 ? 2 : 1} height="auto">
            <Image cursor="pointer" objectFit="cover" onClick={() => setFullImg(image)} src={image} w="full" h="full" />
          </GridItem>
        ))}
      </Grid>

      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(5, 1fr)" my={[2, 4, 6]} gap={[4, 5, 6]}>
        <GridItem colSpan={[5, 5, 3]}>
          <Flex gap="2">
            <Heading size="lg" fontWeight="400">Project by</Heading>
            <Heading size="lg">{book.detailVendor.name}</Heading>
          </Flex>
          <Flex mt={2} gap={4}>
            <Flex gap={1} alignItems="center">
              <BedIcon />
              <Divider orientation="vertical" />
              <Text size="lg">
                {book.cabin}
                {' '}
                Kabin
              </Text>
            </Flex>
            <Flex gap={1} alignItems="center">
              <BathIcon />
              <Divider orientation="vertical" />
              <Text size="lg">
                {book.wc}
                {' '}
                Kamar Mandi
              </Text>
            </Flex>
            <Flex gap={1} alignItems="center">
              <PeopleIcon />
              <Divider orientation="vertical" />
              <Text size="lg" whiteSpace="pre-line">
                {book.capacity}
                {' '}
                Tamu
              </Text>
            </Flex>
          </Flex>
          <Divider my={6} w="full" />
          <Heading size="sm">Deskripsi</Heading>
          <Text size="md" mt="4">
            {book.description}
          </Text>
          <Divider my={6} w="full" />
          <Heading size="sm">Spesifikasi</Heading>
          <Flex mt="4">
            <Box flex={1}>
              <Stack direction="column">
                <Box>
                  <Text fontSize="xs">Tahun Pembuatan</Text>
                  <Text size="md">{book.created}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Bobot</Text>
                  <Text size="md">
                    {book.weight}
                    {' '}
                    Ton
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Ukuran</Text>
                  <Text size="md">
                    {book.long}
                    {' '}
                    x
                    {' '}
                    {book.width}
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
                    {book.speed}
                    {' '}
                    Knot
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Kapasitas</Text>
                  <Text size="md">
                    {book.capacity}
                    {' '}
                    Tamu
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs">Jumlah Kabin</Text>
                  <Text size="md">
                    {book.cabin}
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
            <Heading fontSize={['lg', 'xl', '2xl']}>
              Rp
              {' '}
              {normalizeRupiah(`${book.price}`)}
              {' '}
              /Pax
            </Heading>
            <Select placeholder="Jumlah Tamu" mt="6" value={pax} onChange={({ target }) => setPax(target.value)}>
              {new Array(book.maxPax).fill(0).map((e, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                  {' '}
                  Orang
                </option>
              ))}
            </Select>
            <Button
              disabled={!pax}
              w="full"
              mt={6}
              colorScheme="blue"
              bg="blue.600"
              _hover={{
                bg: 'blue.500',
              }}
              // _disabled={{
              //   bg: 'blue.500',
              // }}
              onClick={sendWAMessage}
            >
              Sewa Sekarang
            </Button>
            {!!pax
            && (
            <>
              <Flex mt="6" justify="space-between" alignItems="center">
                <Text textDecorationLine="underline">
                  Rp
                  {' '}
                  {normalizeRupiah(`${book.price}`)}
                  {' '}
                  x
                  {' '}
                  {pax}
                </Text>
                <Text>
                  Rp
                  {' '}
                  {normalizeRupiah(`${book.price * pax}`)}
                </Text>
              </Flex>
              <Flex mt="2" justify="space-between" alignItems="center">
                <Text textDecorationLine="underline">Biaya Layanan</Text>
                <Badge colorScheme="green" textTransform="none">Gratis</Badge>
              </Flex>
              <Flex mt="6" justify="space-between" alignItems="center">
                <Heading size="md">Estimasi Total Biaya</Heading>
                <Heading size="md">
                  Rp
                  {' '}
                  {normalizeRupiah(`${book.price * pax}`)}
                </Heading>
              </Flex>
            </>
            )}
          </Box>
        </GridItem>
      </Grid>

      <Elements.ImagesModal defaultImg={fullImg} images={book.images || []} close={() => setFullImg('')} />
    </Container>
  );
}
