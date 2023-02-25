import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  TimeIcon,
} from '../../../../Assets/icons/icons';
import { callFunc } from '../../../../Configs/firebase';

export default function Done({ vendor }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({
    activePage: 1,
    totalPage: 1,
    total: 1,
  });
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [loading, setLoading] = useState(true);

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
      getOrders();
    }
  }, [vendor?.id]);

  return (
    <>
      <InfiniteScroll
        dataLength={orders.length}
        hasMore={hasMoreItems}
        next={handleLoadMore}
      >
        <SimpleGrid columns={[1, 2, 3]} py={['2', '4']}>
          {orders.map((e, idx) => (
            <Box
              m={[1, 2, 3]}
              key={idx}
              borderRadius="16px"
              boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
              p="4"
              cursor="pointer"
              onClick={() => navigate('order/orderId')}
            >
              <Image
                src="https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                w="100%"
                objectFit="cover"
                borderRadius={8}
              />
              <Flex gap="1" mt="4">
                <Box bg="blue.50" color="blackAlpha.900" fontSize="12px" px={1} borderRadius="2px" fontWeight="bold">45x10 m</Box>
                <Box bg="blue.50" color="blackAlpha.900" fontSize="12px" px={1} borderRadius="2px" fontWeight="bold">500 TON</Box>
              </Flex>
              <Heading size={['xs', 'sm', 'md']} mt={1}>
                Phinisi Nusantara Dunia Baru
              </Heading>
              <Divider my="4" />
              <Flex gap="2" align="center">
                <TimeIcon height="24px" width="24px" />
                <Text fontSize="lg">2017 - 2018</Text>
              </Flex>
            </Box>
          ))}
          {loading && new Array(6).fill(0).map((item, idx) => (
            <Box
              key={idx}
              boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
              borderRadius="16"
              padding={[3, 4]}
              m={[1, 2, 3]}
            >
              <Skeleton height="80px" />
              <Skeleton height="20px" mt={[2, 4, 6, 8]} />
              <Skeleton height="20px" mt={[2, 4]} />
            </Box>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
      {!loading && !orders.length && <Box>Belum ada pesanan</Box>}
    </>
  );
}
