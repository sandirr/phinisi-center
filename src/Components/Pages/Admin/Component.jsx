/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Heading,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import ManageSejarah from './tabs/Sejarah';
import ManageFilosofi from './tabs/Filosofi';
import ManageArtikel from './tabs/Artikel';
import ProsesPembuatan from './tabs/ProsesPembuatan';
import ManageVendor from './tabs/Vendor';
import ManagePesanan from './tabs/Pesanan';

export default function Component() {
  const [menuList] = useState([
    { name: 'Sejarah' },
    { name: 'Filosofi' },
    { name: 'Artikel' },
    { name: 'Proses Pembuatan' },
    { name: 'Vendor' },
    { name: 'Pesanan' },
    { name: 'Chat' },
  ]);

  return (
    <Container maxW="7xl" py="6">
      <Flex
        overflowX="hidden"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        wrap="wrap"
      >
        <Tabs overflowX="auto">
          <TabList _focusVisible={{ boxShadow: 'none' }}>
            {menuList.map((menu) => (
              <Tab
                key={menu.name}
                _selected={{ color: 'blue.600', borderColor: 'blue.600', outline: 'none' }}
                _focusVisible={{ boxShadow: 'none' }}
                fontWeight="medium"
                fontSize="14px"
              >
                {menu.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel pb="6">
              <ManageSejarah />
            </TabPanel>
            <TabPanel pb="6">
              <ManageFilosofi />
            </TabPanel>
            <TabPanel pb="6">
              <ManageArtikel />
            </TabPanel>
            <TabPanel pb="6">
              <ProsesPembuatan />
            </TabPanel>
            <TabPanel pb="6">
              <ManageVendor />
            </TabPanel>
            <TabPanel pb="6">
              <ManagePesanan />
            </TabPanel>
            <TabPanel pb="6">
              <Heading size="lg">Chat Area</Heading>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  );
}
