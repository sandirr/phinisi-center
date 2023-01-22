import React, { useEffect, useState } from 'react';
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
  SimpleGrid,
  Progress,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import {
  BoatIcon, LocationIcon, StatIcon, TimeIcon,
} from '../../../Assets/icons/icons';
import ROUTES from '../../../Configs/routes';
import { useQuery } from '../../../CustomHooks';

export default function Component() {
  const query = useQuery();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (query.get('tab')) {
      setActiveTab(Number(query.get('tab')));
    } else {
      navigate(`${ROUTES.pemesanan()}/vendor/contoh?tab=0`);
    }
  }, [query]);

  return (
    <Container maxW="7xl">
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        px={{
          base: '0', sm: '2', md: '4', lg: '6',
        }}
        py={{ base: '10', lg: '16' }}
        gap={{ base: '6', lg: '10' }}
      >
        <Box flex={1} p="4">
          <Box textAlign="center" display="flex" flexDir="column" alignItems="center" color="#1C51B5">
            <Image
              src="https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
              w="128px"
              h="128px"
              objectFit="cover"
              borderRadius="full"
            />
            <Heading size="md" mt={4}>Haji Awang</Heading>
            <Text fontSize="md" mt={1}>Vendor Pembuat perahu phinisi tertua di bulukumba, Sulawesi selatan</Text>
          </Box>
          <Box display="flex" gap="3" mt="6">
            <Button w="full" bg="#1C51B5" color="white" colorScheme="blue">Tertarik</Button>
            <Button w="full">Fix Pesan</Button>
          </Box>

          <Divider my="4" />

          <Stack gap="2">
            <Flex justify="space-between" alignItems="center">
              <Flex alignItems="center" gap="2">
                <LocationIcon />
                <Text size="md">Lokasi</Text>
              </Flex>
              <Heading size="sm">Tanaberu</Heading>
            </Flex>
            <Flex justify="space-between" alignItems="center">
              <Flex alignItems="center" gap="2">
                <TimeIcon />
                <Text size="md">Tahun Berdiri</Text>
              </Flex>
              <Heading size="sm">1989</Heading>
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
            <Text mt="4" size="md">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo assumenda rerum velit dolores, non ratione eligendi explicabo doloribus ipsa inventore facilis necessitatibus officia est cum? Dignissimos facilis tempore impedit perferendis!</Text>
          </Box>

          <Divider my="4" />

          <Box>
            <Heading size="sm">Sertifikat</Heading>
            <Text mt="4" size="md">Vendor Phinisi Tertua</Text>
            <Text size="md" color="blackAlpha.600">Dinas Kubudayaan Sulawesi Selatan</Text>
          </Box>
          <Divider mt="4" />
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
              <Tabs index={activeTab} onChange={(idx) => navigate(`${ROUTES.pemesanan()}/vendor/contoh?tab=${idx}`)}>
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

          {activeTab === 0
          && (
          <SimpleGrid columns={[1, 2, 3]} gap={[2, 4, 6]} mt="4">
            {new Array(4).fill(0).map((e, idx) => (
              <Box
                key={idx}
                borderRadius="16px"
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                p="4"
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
          </SimpleGrid>
          )}

          {activeTab === 1
          && (
          <SimpleGrid columns={1} gap={[2, 4]} mt="4">
            {new Array(4).fill(0).map((e, idx) => (
              <Box
                key={idx}
                borderRadius="16px"
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                p="4"
              >
                <Image
                  src="https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                  w="full"
                  height={['180px', '240px']}
                  objectFit="cover"
                  borderRadius={8}
                />
                <Flex gap="1" mt="4">
                  <Box bg="blue.50" color="blackAlpha.900" fontSize="12px" px={1} borderRadius="2px" fontWeight="bold">45x10 m</Box>
                  <Box bg="blue.50" color="blackAlpha.900" fontSize="12px" px={1} borderRadius="2px" fontWeight="bold">500 TON</Box>
                </Flex>
                <Heading size={['xs', 'sm', 'md']} mt={2}>
                  Phinisi Nusantara Dunia Baru
                </Heading>
                <Progress hasStripe value={64} mt="6" mb="4" />
                <Flex gap="2" align="center" fontSize={['xs', 'sm', 'md']}>
                  <StatIcon height="24px" width="24px" />
                  <Text>Progres Pengerjaan</Text>
                  <Text fontWeight="bold">60%</Text>
                </Flex>
                <Flex gap="2" align="center" fontSize={['xs', 'sm', 'md']} mt="2">
                  <TimeIcon height="24px" width="24px" />
                  <Text>Estimasi Selesai</Text>
                  <Text fontWeight="bold">2024</Text>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
          )}
        </Box>
      </Box>
    </Container>
  );
}
