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
  Grid,
  GridItem,
  Select,
  Badge,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Elements from '../../Elements';
import { callFunc } from '../../../Configs/firebase';
import { normalizeRupiah } from '../../../Utils/text';

export default function Component() {
  const { tripId } = useParams();
  const [fullImg, setFullImg] = useState('');
  const [pax, setPax] = useState(0);

  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState({ detailVendor: {}, images: [] });

  const getBook = async () => {
    const callable = callFunc('getTrip');

    setLoading(true);
    await callable(tripId).then((res) => {
      setTrip(res.data);
    }).catch(() => {
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (tripId) {
      getBook();
    }
  }, [tripId]);

  const sendWAMessage = () => {
    window.open(`https://wa.me/6282197493245?text=Halo,%0aMauka ikut ini trip ${trip.name} adakah diskonnn?%0ajumlah orang: ${pax}%0aharga: Rp${trip.price}%0atotal: Rp${normalizeRupiah(`${trip.price * pax}`)}`, '_blank');
  };

  return (
    <Container maxW="7xl" py="5">
      <Elements.Loading loading={loading} />
      <Heading size="xl">
        {trip.name}
      </Heading>
      <Text size="xl" mt="2">{trip.location}</Text>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={2} mt={6}>
        {trip.images?.slice(0, 5)?.map((image, i) => (
          <GridItem key={i} rowSpan={i === 0 ? 2 : 1} colSpan={i === 0 ? 2 : 1} height="auto">
            <Image cursor="pointer" onClick={() => setFullImg(image)} src={image} width="full" height="full" />
          </GridItem>
        ))}
      </Grid>

      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(5, 1fr)" my={[2, 4, 6]} gap={[4, 5, 6]}>
        <GridItem colSpan={[5, 2.5, 3]}>
          <Text size="lg">{trip.from}</Text>
          <Heading size="lg">{moment(trip.date).format('DD MMM YYYY')}</Heading>
          <Divider my={6} w="full" />
          <Heading size="sm">Deskripsi</Heading>
          <Text size="md" mt="4" whiteSpace="pre-line">
            {trip.description}
          </Text>
          <Divider my={6} w="full" />
        </GridItem>
        <GridItem colSpan={[5, 2.5, 2]}>
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
              {normalizeRupiah(`${trip.price}`)}
              {' '}
              /Pax
            </Heading>
            <Select placeholder="Jumlah Tamu" mt="6" value={pax} onChange={({ target }) => setPax(target.value)}>
              {new Array(trip.maxPax).fill(0).map((e, i) => (
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
              Join Sekarang
            </Button>
            {!!pax
            && (
            <>
              <Flex mt="6" justify="space-between" alignItems="center">
                <Text textDecorationLine="underline">
                  Rp
                  {' '}
                  {normalizeRupiah(`${trip.price}`)}
                  {' '}
                  x
                  {' '}
                  {pax}
                </Text>
                <Text>
                  Rp
                  {' '}
                  {normalizeRupiah(`${trip.price * pax}`)}
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
                  {normalizeRupiah(`${trip.price * pax}`)}
                </Heading>
              </Flex>
            </>
            )}
          </Box>
        </GridItem>
      </Grid>

      <Elements.ImagesModal defaultImg={fullImg} images={trip.images || []} close={() => setFullImg('')} />
    </Container>
  );
}
