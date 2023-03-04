import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';
import { callFunc } from '../../../../../Configs/firebase';
import CreateTrip from '../../lib/CreateTrip';
import { ConfirmationContext } from '../../../../../Context';
import { normalizeRupiah } from '../../../../../Utils/text';

export default function Component() {
  const [openCreateTrip, setOpenCreateTrip] = useState('');
  const [trips, setTrips] = useState([]);
  const [meta, setMeta] = useState({
    activePage: 1,
    totalPage: 1,
    total: 1,
  });
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  const { showConfirmation, closeConfirmation } = useContext(ConfirmationContext);

  const handleOpenCreateTrip = (type, data = null) => {
    if (data) {
      setSelectedTrip(data);
    }
    setOpenCreateTrip(type);
  };

  const getTrips = async () => {
    const callable = callFunc('getTrips');
    setLoading(true);

    await callable({
      limit: 10,
      page: meta.activePage,
    }).then((res) => {
      const {
        data,
        activePage,
        total,
        totalPage,
      } = res.data;

      setTrips(data);
      setMeta({
        activePage,
        total,
        totalPage,
      });

      setHasMoreItems(activePage < totalPage);
    }).finally(() => {
      setLoading(false);
    });
  };

  const prepareToDelete = (item) => {
    const confirmationProps = {
      handleAgree: async () => {
        const callable = callFunc('deleteTrip');
        await callable(item.id)
          .then(async () => {
            await getTrips();
            closeConfirmation();
          });
      },
      title: 'Yakin ingin menghapus?',
      desc: item.name,
    };

    showConfirmation(confirmationProps);
  };

  const handleCloseCreateTrip = (newData) => {
    setOpenCreateTrip('');
    setSelectedTrip(null);
    if (newData) {
      getTrips();
    }
  };

  const handleLoadMore = () => {
    setMeta((prev) => ({
      ...prev,
      activePage: prev.activePage + 1,
    }));
  };

  useEffect(() => {
    const firstLoad = meta.activePage === 1 && !trips.length;
    if (firstLoad || hasMoreItems) {
      getTrips();
    }
  }, [meta.activePage]);

  return (
    <>
      <Box>
        <Flex justify="space-between">
          <Heading size="lg">Manajemen Trip</Heading>
          <Button colorScheme="blue" onClick={() => handleOpenCreateTrip('Buat')}>Buat Trip</Button>
        </Flex>
        <Box mt="2">
          <InfiniteScroll
            dataLength={trips.length}
            hasMore={hasMoreItems}
            next={handleLoadMore}
          >
            {trips.map((trip) => (
              <Box key={trip.id} border="1px solid #e5e5e5" py={2} px={4} borderRadius={5} mb={4}>
                <Flex justify="space-between">
                  <Heading size="md">{trip.name}</Heading>
                  <Flex gap={2}>
                    <Button size="xs" colorScheme="yellow" variant="outline" onClick={() => handleOpenCreateTrip('Edit', trip)}>Edit</Button>
                    <Button size="xs" colorScheme="red" variant="outline" onClick={() => prepareToDelete(trip)}>Hapus</Button>
                  </Flex>
                </Flex>
                <Flex gap={4} fontSize="xs" color="gray.600">
                  <Text>
                    Kabin:
                    {' '}
                    {trip.cabin}
                  </Text>
                  <Text>
                    Jumlah Tamu:
                    {' '}
                    {trip.capacity}
                  </Text>
                  <Text>
                    Kamar Mandi:
                    {' '}
                    {trip.wc}
                  </Text>
                  <Text>
                    Dimensi:
                    {' '}
                    {trip.long}
                    {' '}
                    x
                    {' '}
                    {trip.width}
                  </Text>
                  <Text>
                    Bobot:
                    {' '}
                    {trip.weight}
                    {' '}
                    ton
                  </Text>
                  <Text>
                    Kecepatan:
                    {' '}
                    {trip.speed}
                    {' '}
                    knot
                  </Text>
                  <Text>
                    Harga:
                    {' '}
                    Rp
                    {normalizeRupiah(`${trip.price}`) || 0}
                  </Text>
                  <Text>
                    Berangkat:
                    {' '}
                    {moment(trip.date).format('DD-MM-YYYY')}
                  </Text>
                  <Text>
                    Status:
                    {' '}
                    {trip.status}
                  </Text>
                </Flex>
                <Text size="md" whiteSpace="pre-line">{trip.description}</Text>
                <Flex gap={2} mt={2} flexWrap="wrap">
                  {trip.images?.map((imgUrl) => (
                    <Box key={imgUrl} position="relative">
                      <Image src={imgUrl} h="6" />
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </InfiniteScroll>
          {loading && 'Loading...'}
          {!loading && !trips.length && 'No data...'}
        </Box>

      </Box>
      <Modal isOpen={!!openCreateTrip} size="6xl" onClose={handleCloseCreateTrip} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent pb="4">
          <ModalHeader>
            {openCreateTrip}
            {' '}
            Trip
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateTrip
              onSuccess={handleCloseCreateTrip}
              givenData={selectedTrip}
              vendor={{ id: selectedTrip?.vendorId }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
