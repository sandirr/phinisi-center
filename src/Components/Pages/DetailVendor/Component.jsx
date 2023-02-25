import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  Box,
  Container,
  Image,
  Heading,
  Button,
  Divider,
  Flex,
  Stack,
  Tabs,
  TabList,
  Tab,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BoatIcon, LocationIcon, TimeIcon,
} from '../../../Assets/icons/icons';
import ROUTES from '../../../Configs/routes';
import { useQuery } from '../../../CustomHooks';
import { ChatModalContext, OrderModalContext } from '../../../Context';
import { callFunc } from '../../../Configs/firebase';
import Elements from '../../Elements';
import Images from '../../../Configs/images';
import Pending from './tabs/Pending';
import Done from './tabs/Done';

export default function Component() {
  const query = useQuery();
  const navigate = useNavigate();
  const { id } = useParams();
  const { showChatModal } = useContext(ChatModalContext);
  const { showOrderModal } = useContext(OrderModalContext);
  const [activeTab, setActiveTab] = useState(0);
  const [vendor, setVendor] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInterested = () => {
    showChatModal({ vendor: { name: 'Hj Awang' } });
  };

  const handleFixOrder = () => {
    showOrderModal({ vendor });
  };

  useEffect(() => {
    if (query.get('tab')) {
      setActiveTab(Number(query.get('tab')));
    } else {
      navigate(`${ROUTES.pemesanan()}/vendor/${id}?tab=0`);
    }
  }, [query]);

  const getVendor = async () => {
    const callable = callFunc('getVendor');

    setLoading(true);
    await callable(id).then((res) => {
      setVendor(res.data);
    }).catch(() => {
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (id) {
      getVendor();
    }
  }, [id]);

  return (
    <Container maxW="7xl">
      <Elements.Loading loading={loading} />
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        px={{
          base: '0', sm: '2', md: '4', lg: '6',
        }}
        py={[4, 8, 12, 16]}
        gap={{ base: '6', lg: '10' }}
      >
        <Box flex={1} p="4">
          <Box textAlign="center" display="flex" flexDir="column" alignItems="center" color="#1C51B5">
            <Image
              src={vendor.cover || Images.Order1}
              w="128px"
              h="128px"
              objectFit="cover"
              borderRadius="full"
            />
            <Heading size="md" mt={4}>{vendor.name}</Heading>
            <Text fontSize="md" mt={1}>{vendor.tagline || '-'}</Text>
          </Box>
          <Box display="flex" gap="3" mt="6">
            <Button w="full" bg="#1C51B5" color="white" colorScheme="blue" onClick={handleInterested}>Tertarik</Button>
            <Button w="full" onClick={handleFixOrder}>Fix Pesan</Button>
          </Box>

          <Divider my="4" />

          <Stack gap="2">
            <Flex justify="space-between" alignItems="center">
              <Flex alignItems="center" gap="2">
                <LocationIcon />
                <Text size="md">Lokasi</Text>
              </Flex>
              <Heading size="sm">{vendor.city || '-'}</Heading>
            </Flex>
            <Flex justify="space-between" alignItems="center">
              <Flex alignItems="center" gap="2">
                <TimeIcon />
                <Text size="md">Tahun Berdiri</Text>
              </Flex>
              <Heading size="sm">{vendor.year || '-'}</Heading>
            </Flex>
            <Flex justify="space-between" alignItems="center">
              <Flex alignItems="center" gap="2">
                <BoatIcon />
                <Text size="md">Kapal Terjual</Text>
              </Flex>
              <Heading size="sm">41</Heading>
            </Flex>
          </Stack>

          <Box mt={['4', '6', '10']}>
            <Heading size="sm">Deskripsi</Heading>
            <Text mt="4" size="md">{vendor.description || '-'}</Text>
          </Box>

          <Divider my="4" />

          {/* <Box>
            <Heading size="sm">Sertifikat</Heading>
            <Text mt="4" size="md">Vendor Phinisi Tertua</Text>
            <Text size="md" color="blackAlpha.600">Dinas Kubudayaan Sulawesi Selatan</Text>
          </Box>
          <Divider mt="4" /> */}
        </Box>

        <Box w="3xl">
          <Flex justify="space-between" wrap="wrap">
            <Flex
              overflowX="auto"
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
              wrap="wrap"
            >
              <Tabs index={activeTab} onChange={(idx) => navigate(`${ROUTES.pemesanan()}/vendor/${id}?tab=${idx}`)}>
                <TabList _focusVisible={{ boxShadow: 'none' }}>
                  <Tab
                    _selected={{ color: 'blue.600', borderColor: 'blue.600', outline: 'none' }}
                    _focusVisible={{ boxShadow: 'none' }}
                    fontWeight="medium"
                    fontSize="14px"
                  >
                    Pesanan Selesai
                  </Tab>
                  <Tab
                    _selected={{ color: 'blue.600', borderColor: 'blue.600', outline: 'none' }}
                    _focusVisible={{ boxShadow: 'none' }}
                    fontWeight="medium"
                    fontSize="14px"
                  >
                    Dalam Proses
                  </Tab>
                </TabList>
              </Tabs>
            </Flex>

            <Flex align="center" gap="2" mt={[2, 0]}>
              <Text color="blackAlpha.600" fontSize="sm">Urutkan</Text>
              <Menu isLazy>
                <MenuButton fontSize="sm" fontWeight="bold">
                  Terbaru
                  {' '}
                  <ChevronDownIcon boxSize="6" />
                </MenuButton>
                <MenuList>
                  {/* MenuItems are not rendered unless Menu is open */}
                  <MenuItem
                    _active={{
                      bg: 'transparent',
                    }}
                    _focus={{
                      bg: 'transparent',
                    }}
                  >
                    Terbaru
                  </MenuItem>
                  <MenuItem
                    _active={{
                      bg: 'transparent',
                    }}
                    _focus={{
                      bg: 'transparent',
                    }}
                  >
                    Terlama
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          {activeTab === 0 && (<Done vendor={vendor} />)}
          {activeTab === 1 && (<Pending vendor={vendor} />)}
        </Box>
      </Box>
    </Container>
  );
}
