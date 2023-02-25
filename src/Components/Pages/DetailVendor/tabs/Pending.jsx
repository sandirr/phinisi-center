import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Image,
  Progress,
  SimpleGrid,
  Skeleton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Step, Steps } from 'chakra-ui-steps';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  CheckIcon, CircleIcon, StatIcon, TimeIcon,
} from '../../../../Assets/icons/icons';
import { callFunc } from '../../../../Configs/firebase';
import Images from '../../../../Configs/images';
import { progressLabel } from '../../../../Configs/constants';

export default function Pending({ vendor }) {
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
      type: 'pending',
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
        <SimpleGrid columns={1} mt="4">
          {orders.map((order, idx) => (
            <Box
              key={idx}
              borderRadius="16px"
              boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
              p="4"
              m={[2, 3, 4]}
            >
              <Image
                src={order?.images[0] || Images.Order1}
                w="full"
                height={['180px', '240px']}
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
              <Heading size={['xs', 'sm', 'md']} mt={2}>
                {order.name}
              </Heading>
              <Steps colorScheme="blue" activeStep={order.progress} mt={6} size="sm" orientation="horizontal" display={['none', 'none', 'inline-flex']}>
                {new Array(10).fill(0).map((item, index) => (
                  <Step
                    label=""
                    key={index}
                    description=""
                    icon={() => CircleIcon({ color: index === order.progress ? 'blue.600' : 'white', label: index === order.progress ? progressLabel[index] : '' })}
                    checkIcon={() => CheckIcon({ color: 'white', label: progressLabel[index] })}
                  >
                    {null}
                  </Step>
                ))}
              </Steps>
              <Tooltip hasArrow label="Pemasangan Papan Penguat" bg="white" color="blue.600" placement="top">
                <Progress hasStripe value={64} my="4" borderRadius="full" />
              </Tooltip>
              <Flex gap="2" align="center" fontSize={['xs', 'sm', 'md']}>
                <StatIcon height="24px" width="24px" />
                <Text>Progres Pengerjaan</Text>
                <Text fontWeight="bold">
                  {order.progress * 10}
                  %
                </Text>
              </Flex>
              <Flex gap="2" align="center" fontSize={['xs', 'sm', 'md']} mt="2">
                <TimeIcon height="24px" width="24px" />
                <Text>Estimasi Selesai</Text>
                <Text fontWeight="bold">{order.year}</Text>
              </Flex>
            </Box>
          ))}
          {loading && new Array(3).fill(0).map((item, idx) => (
            <Box
              key={idx}
              boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
              borderRadius="16"
              padding={[3, 4]}
              m={[2, 3, 4]}
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
