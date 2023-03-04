import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { NotificationsOutlined } from '@mui/icons-material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { callFunc } from '../../../Configs/firebase';
import { NotifOffIcon } from '../../../Assets/icons/icons';
import ROUTES from '../../../Configs/routes';

export default function Component() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState([]);
  const [meta, setMeta] = useState({
    activePage: 1,
    totalPage: 1,
    total: 1,
  });
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(false);

  const getNotifications = async () => {
    const callable = callFunc('getNotifications');

    setLoading(true);
    await callable({
      page: meta.activePage,
      limit: 10,
    })
      .then((res) => {
        const {
          activePage,
          totalPage,
          total,
          data,
          unreadCount,
        } = res.data;
        const normalizeData = data.map((item) => ({
          ...item,
        }));
        setNotifs([...notifs, ...normalizeData]);
        setMeta({
          activePage,
          totalPage,
          total,
        });
        setHasMoreItems(activePage < totalPage);
        setUnread(unreadCount);
      })
      .catch(() => {
        // console.log('anjing', err);
      })
      .finally(() => {
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
    const firstLoad = meta.activePage === 1 && !notifs.length;
    if (firstLoad || hasMoreItems) {
      getNotifications();
    }
  }, [meta.activePage]);

  const renderBadge = (val) => (
    <Badge
      bg="red.500"
      position="absolute"
      right="-2"
      top="-1"
      borderRadius="full"
      width="5"
      height="5"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      size="14px"
    >
      {val || 0}
    </Badge>
  );

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Box cursor="pointer" bg="transparent" border="none" color="blue.600" position="relative" mt="3">
          <NotificationsOutlined color="inherit" />
          {!!unread && renderBadge(unread)}
        </Box>
      </PopoverTrigger>
      <PopoverContent alignItems="flex-start" w="sm" h="350px">
        <PopoverArrow />
        <PopoverHeader textAlign="left" width="full">
          <Flex color="blue.600" gap="2">
            <NotificationsOutlined color="inherit" />
            <Text size="sm" fontWeight="700">
              Notifikasi (
              {unread}
              )
            </Text>
          </Flex>
        </PopoverHeader>
        <PopoverBody textAlign="left" w="full" overflow="auto">
          <InfiniteScroll
            dataLength={notifs.length}
            hasMore={hasMoreItems}
            next={handleLoadMore}
          >
            {notifs.map((notif, idx) => (
              <Box
                key={notif.id || idx}
                w="full"
                cursor="pointer"
                onClick={() => {
                  if (notif.detailOrder && notif.detailvendor) {
                    navigate(
                      `${ROUTES.pemesanan()}/vendor/${notif.detailvendor?.id}/order/${notif.detailOrder?.id}`,
                      { state: notif.id },
                    );
                  }
                }}
              >
                <Flex gap="2" p={[1.5, 2, 2.5]} justifyContent="flex-start" bgColor={notif.hasRead ? 'none' : 'blue.100'} borderRadius={4}>
                  <Avatar h="8" w="8" src={notif.detailvendor?.cover || 'https://phinisicenter.id/logo64.png'} />
                  <Box textAlign="left">
                    <Heading size="xs">{notif.detailvendor?.name || 'Phinisi Center'}</Heading>
                    <Text fontSize="xs">
                      Pesanan
                      {' '}
                      {notif.detailOrder?.name || 'Phinisi'}
                      {' '}
                      Anda sudah pada tahap
                      {' '}
                      &apos;
                      {notif.desc}
                      &apos;
                    </Text>
                  </Box>
                </Flex>
                <Divider />
              </Box>
            ))}
            {loading && new Array(5).fill(0).map((e, idx) => (
              <Box key={idx} w="full">
                <Flex gap="2" p={[1.5, 2, 2.5]} justifyContent="flex-start" w="full">
                  <Skeleton h="8" w="8" borderRadius={4} />
                  <Box textAlign="left">
                    <Skeleton w="20" h="4" />
                    <Skeleton w="full" h="2" mt="2" />
                  </Box>
                </Flex>
                <Divider />
              </Box>
            ))}
          </InfiniteScroll>
          {!loading && !notifs.length
            && (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" mt="4">
              <NotifOffIcon width="150px" height="150px" />
              <Box mt="2.5">
                <Text>Tidak Ada Notifikasi</Text>
              </Box>
            </Flex>
            )}

        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
