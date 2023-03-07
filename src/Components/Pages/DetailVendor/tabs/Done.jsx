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
import Images from '../../../../Configs/images';

export default function Done({ vendor, sort }) {
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
      type: 'done',
      sort,
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
      setOrders([]);
      getOrders();
    }
  }, [vendor?.id, sort]);

  return (
    <>
      <InfiniteScroll
        dataLength={orders.length}
        hasMore={hasMoreItems}
        next={handleLoadMore}
      >
        <SimpleGrid columns={[1, 2, 2, 3]} py={['2', '4']}>
          {orders.map((order, idx) => (
            <Box
              m={[1, 2, 3]}
              key={idx}
              borderRadius="16px"
              boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
              padding={[3, 4]}
              cursor="pointer"
              onClick={() => navigate(`order/${order.id}`)}
            >
              <Image
                src={order?.images[0] || Images.Order1}
                h={['140px', '160px']}
                w="100%"
                objectFit="cover"
                borderRadius={8}
              />
              <Flex gap="1" mt="4">
                <Box bg="blue.50" color="blackAlpha.900" fontSize="12px" px={1} borderRadius="2px" fontWeight="bold">
                  {order.long}
                  x
                  {order.width}
                  {' '}
                  m
                </Box>
                <Box bg="blue.50" color="blackAlpha.900" fontSize="12px" px={1} borderRadius="2px" fontWeight="bold">
                  {order.weight}
                  {' '}
                  TON
                </Box>
              </Flex>
              <Heading size={['xs', 'sm', 'md']} mt={1}>
                {order.name}
              </Heading>
              <Divider my="4" />
              <Flex gap="2" align="center">
                <TimeIcon height="24px" width="24px" />
                <Text fontSize="lg">
                  {order.created || new Date().getFullYear()}
                  {' '}
                  -
                  {' '}
                  {order.year}
                </Text>
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
