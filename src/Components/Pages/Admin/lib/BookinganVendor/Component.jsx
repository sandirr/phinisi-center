import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
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
import { callFunc } from '../../../../../Configs/firebase';
import CreateBook from '../CreateBook';
import { ConfirmationContext } from '../../../../../Context';
import { normalizeRupiah } from '../../../../../Utils/text';

export default function Component({ vendor, onClose }) {
  const [openCreateBooking, setOpenCreateBooking] = useState('');
  const [books, setBooks] = useState([]);
  const [meta, setMeta] = useState({
    activePage: 1,
    totalPage: 1,
    total: 1,
  });
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const { showConfirmation, closeConfirmation } = useContext(ConfirmationContext);

  const handleOpenCreateBook = (type, data = null) => {
    if (data) {
      setSelectedBook(data);
    }
    setOpenCreateBooking(type);
  };

  const getBookings = async () => {
    const callable = callFunc('getBookings');
    setLoading(true);

    await callable({
      vendorId: vendor?.id,
      limit: 10,
      page: meta.activePage,
    }).then((res) => {
      const {
        data,
        activePage,
        total,
        totalPage,
      } = res.data;

      setBooks(data);
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
        const callable = callFunc('deleteOrder');
        await callable(item.id)
          .then(async () => {
            await getBookings();
            closeConfirmation();
          });
      },
      title: 'Yakin ingin menghapus?',
      desc: item.name,
    };

    showConfirmation(confirmationProps);
  };

  const handleCloseCreateBooking = (newData) => {
    setOpenCreateBooking('');
    setSelectedBook(null);
    if (newData) {
      getBookings();
    }
  };

  const handleLoadMore = () => {
    setMeta((prev) => ({
      ...prev,
      activePage: prev.activePage + 1,
    }));
  };

  useEffect(() => {
    const firstLoad = meta.activePage === 1 && !books.length;
    if ((firstLoad || hasMoreItems) && vendor && vendor.id) {
      getBookings();
    }
  }, [meta.activePage]);

  useEffect(() => {
    if (vendor && vendor.id) {
      setBooks([]);
      getBookings();
    }
  }, [vendor?.id]);

  return (
    <>
      <Drawer onClose={onClose} isOpen={!!vendor && !openCreateBooking} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Box>
              Bookingan Vendor:
              {' '}
              {vendor?.name}
            </Box>
            <Button mt="2" onClick={() => handleOpenCreateBook('Buat')}>Buat Bookingan Baru</Button>
          </DrawerHeader>
          <DrawerBody>
            <InfiniteScroll
              dataLength={books.length}
              hasMore={hasMoreItems}
              next={handleLoadMore}
            >
              {books.map((book) => (
                <Box key={book.id} border="1px solid #e5e5e5" py={2} px={4} borderRadius={5} mb={4}>
                  <Flex justify="space-between">
                    <Heading size="md">{book.name}</Heading>
                    <Flex gap={2}>
                      <Button size="xs" colorScheme="yellow" variant="outline" onClick={() => handleOpenCreateBook('Edit', book)}>Edit</Button>
                      <Button size="xs" colorScheme="red" variant="outline" onClick={() => prepareToDelete(book)}>Hapus</Button>
                    </Flex>
                  </Flex>
                  <Flex gap={4} fontSize="xs" color="gray.600">
                    <Text>
                      Kabin:
                      {' '}
                      {book.cabin}
                    </Text>
                    <Text>
                      Jumlah Tamu:
                      {' '}
                      {book.capacity}
                    </Text>
                    <Text>
                      Kamar Mandi:
                      {' '}
                      {book.wc}
                    </Text>
                    <Text>
                      Dimensi:
                      {' '}
                      {book.long}
                      {' '}
                      x
                      {' '}
                      {book.width}
                    </Text>
                    <Text>
                      Bobot:
                      {' '}
                      {book.weight}
                      {' '}
                      ton
                    </Text>
                    <Text>
                      Kecepatan:
                      {' '}
                      {book.speed}
                      {' '}
                      knot
                    </Text>
                    <Text>
                      Dibuat:
                      {' '}
                      {book.created}
                    </Text>
                    <Text>
                      Status:
                      {' '}
                      {book.status || 'Closed/Draft'}
                    </Text>
                    <Text>
                      Harga:
                      {' '}
                      Rp
                      {normalizeRupiah(`${book.price}`) || 0}
                    </Text>
                  </Flex>
                  <Text size="md">{book.description}</Text>
                  <Flex gap={2} mt={2} flexWrap="wrap">
                    {book.images?.map((imgUrl) => (
                      <Box key={imgUrl} position="relative">
                        <Image src={imgUrl} h="6" />
                      </Box>
                    ))}
                  </Flex>
                </Box>
              ))}
            </InfiniteScroll>
            {loading && 'Loading...'}
            {!loading && !books.length && 'No data...'}
          </DrawerBody>
        </DrawerContent>

      </Drawer>
      <Modal isOpen={!!openCreateBooking} size="6xl" onClose={handleCloseCreateBooking} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent pb="4">
          <ModalHeader>
            {openCreateBooking}
            {' '}
            Bookingan
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateBook
              onSuccess={handleCloseCreateBooking}
              vendor={vendor}
              givenData={selectedBook}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
