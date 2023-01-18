import React, { useState } from 'react';
import {
  Box, Button, Container, Menu, MenuButton, MenuItem, MenuList, Tab, TabList, Tabs,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Images from '../../../Configs/images';

export default function Component() {
  const [openSF, setOpenSF] = useState(false);
  return (
    <Box bg="white" boxShadow="md" pt="6">
      <Container maxW="7xl">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display={{ base: 'none', md: 'flex' }} gap="4" flex={1}>
            <Link to="/">
              <img src={Images.Instagram} alt="ig" />
            </Link>
            <Link to="/">
              <img src={Images.Tiktok} alt="tt" />
            </Link>
            <Link to="/">
              <img src={Images.Youtube} alt="yt" />
            </Link>
          </Box>
          <Box>
            <img src={Images.Logo} alt="Phinisi Center" width="120" />
          </Box>
          <Box flex={1} textAlign="right">
            <Button colorScheme="blue" color="blue.500" variant="outline">
              Login
            </Button>
          </Box>
        </Box>
        <Box
          mt="6"
          overflowX="auto"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Tabs>
            <TabList>
              <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }} fontWeight="medium">Beranda</Tab>
              <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }} fontWeight="medium" onMouseEnter={() => setOpenSF(true)} onMouseLeave={() => setOpenSF(false)}>
                <Menu isOpen={openSF}>
                  <MenuButton fontWeight="medium" whiteSpace="nowrap">
                    Sejarah & Filosofi
                  </MenuButton>
                  <MenuList mt="0.5" ml="-4" minWidth="160px" borderTopRightRadius="0" borderTopLeftRadius="0">
                    <MenuItem>Sejarah</MenuItem>
                    <MenuItem>Filosofi</MenuItem>
                  </MenuList>
                </Menu>
              </Tab>
              <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }} fontWeight="medium">Pemesanan</Tab>
              <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }} fontWeight="medium">Penyewaan</Tab>
              <Tab _selected={{ color: 'blue.500', borderColor: 'blue.500' }} fontWeight="medium">Artikel</Tab>
            </TabList>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
}
