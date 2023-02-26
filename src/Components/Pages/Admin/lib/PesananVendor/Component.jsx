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
import CreateOrder from '../CreateOrder';
import { ConfirmationContext } from '../../../../../Context';

export default function Component({ vendor, onClose }) {
  const [openCretaeOrder, setOpenCreateOrder] = useState('');
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({
    activePage: 1,
    totalPage: 1,
    total: 1,
  });
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const { showConfirmation, closeConfirmation } = useContext(ConfirmationContext);

  const handleOpenCreateOrder = (type, data = null) => {
    if (data) {
      setSelectedOrder(data);
    }
    setOpenCreateOrder(type);
  };

  const getOrders = async () => {
    const callable = callFunc('getOrders');
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

      setOrders(data);
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
            await getOrders();
            closeConfirmation();
          });
      },
      title: 'Yakin ingin menghapus?',
      desc: item.name,
    };

    showConfirmation(confirmationProps);
  };

  const handleCloseCreateOrder = (newData) => {
    setOpenCreateOrder('');
    setSelectedOrder(null);
    if (newData) {
      getOrders();
    }
  };

  const handleLoadMore = () => {
    setMeta((prev) => ({
      ...prev,
      activePage: prev.activePage + 1,
    }));
  };

  useEffect(() => {
    const firstLoad = meta.activePage === 1 && !orders.length;
    if ((firstLoad || hasMoreItems) && vendor && vendor.id) {
      getOrders();
    }
  }, [meta.activePage]);

  useEffect(() => {
    if (vendor && vendor.id) {
      setOrders([]);
      getOrders();
    }
  }, [vendor?.id]);

  return (
    <>
      <Drawer onClose={onClose} isOpen={!!vendor && !openCretaeOrder} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Box>
              Pesanan Vendor:
              {' '}
              {vendor?.name}
            </Box>
            <Button mt="2" onClick={() => handleOpenCreateOrder('Buat')}>Buat Pesanan Baru</Button>
          </DrawerHeader>
          <DrawerBody>
            <InfiniteScroll
              dataLength={orders.length}
              hasMore={hasMoreItems}
              next={handleLoadMore}
            >
              {orders.map((order) => (
                <Box key={order.id} border="1px solid #e5e5e5" py={2} px={4} borderRadius={5} mb={4}>
                  <Flex justify="space-between">
                    <Heading size="md">{order.name}</Heading>
                    <Flex gap={2}>
                      <Button size="xs" colorScheme="yellow" variant="outline" onClick={() => handleOpenCreateOrder('Edit', order)}>Edit</Button>
                      <Button size="xs" colorScheme="red" variant="outline" onClick={() => prepareToDelete(order)}>Hapus</Button>
                    </Flex>
                  </Flex>
                  <Flex gap={4} fontSize="xs" color="gray.600">
                    <Text>
                      Kabin:
                      {' '}
                      {order.cabin}
                    </Text>
                    <Text>
                      Jumlah Tamu:
                      {' '}
                      {order.capacity}
                    </Text>
                    <Text>
                      Kamar Mandi:
                      {' '}
                      {order.wc}
                    </Text>
                    <Text>
                      Dimensi:
                      {' '}
                      {order.long}
                      {' '}
                      x
                      {' '}
                      {order.width}
                    </Text>
                    <Text>
                      Bobot:
                      {' '}
                      {order.weight}
                      {' '}
                      ton
                    </Text>
                    <Text>
                      Kecepatan:
                      {' '}
                      {order.speed}
                      {' '}
                      knot
                    </Text>
                    <Text>
                      Dibuat:
                      {' '}
                      {order.year}
                    </Text>
                    <Text>
                      Progress:
                      {' '}
                      {Number(order.progress || 0) * 10}
                      %
                    </Text>
                  </Flex>
                  <Text size="md">{order.description}</Text>
                  <Flex gap={2} mt={2} flexWrap="wrap">
                    {order.images?.map((imgUrl) => (
                      <Box key={imgUrl} position="relative">
                        <Image src={imgUrl} h="6" />
                      </Box>
                    ))}
                  </Flex>
                </Box>
              ))}
            </InfiniteScroll>
            {loading && 'Loading...'}
            {!loading && !orders.length && 'No data...'}
          </DrawerBody>
        </DrawerContent>

      </Drawer>
      <Modal isOpen={!!openCretaeOrder} size="6xl" onClose={handleCloseCreateOrder} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent pb="4">
          <ModalHeader>
            {openCretaeOrder}
            {' '}
            Pesanan
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateOrder
              onSuccess={handleCloseCreateOrder}
              vendor={vendor}
              givenData={selectedOrder}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
