/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  Tabs,
  Image,
  Avatar,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { Search2Icon } from '@chakra-ui/icons';
import {
  EmailOutlined, NotificationsOutlined,
} from '@mui/icons-material';
import {
  signOut,
} from 'firebase/auth';
import Images from '../../../Configs/images';
import { auth } from '../../../Configs/firebase';
import ROUTES from '../../../Configs/routes';
import { LoginContext } from '../../../Context';
import { admins } from '../../../Configs/constants';

export default function Component() {
  const [openSF, setOpenSF] = useState(false);
  const { showPopUpLogin, loggedin } = useContext(LoginContext);

  const [indexes] = useState({
    '': 0,
    sejarah: 1,
    filosofi: 1,
    pemesanan: 2,
    penyewaan: 3,
    artikel: 4,
    admin: 5,
  });
  const activeTab = useLocation().pathname.split('/')[1];

  const handleLogout = async () => {
    await signOut(auth);
  };

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
            {loggedin
              ? (
                <Box display="flex" justifyContent="flex-end" gap="5" alignItems="center">
                  <Box color="#1C51B5" as={Link} to="/">
                    <NotificationsOutlined color="inherit" />
                  </Box>
                  <Box color="#1C51B5" as={Link} to="/">
                    <EmailOutlined color="inherit" />
                  </Box>
                  <Menu>
                    <MenuButton>
                      {loggedin?.photoURL
                        ? (
                          <Image
                            src={loggedin.photoURL}
                            h="42px"
                            w="42px"
                            objectFit="cover"
                            borderRadius="3xl"
                            referrerPolicy="no-referrer"
                          />
                        )
                        : <Avatar name={loggedin.displayName} />}
                    </MenuButton>
                    <MenuList minWidth="160px">
                      <MenuItem
                        autoFocus={false}
                        onClick={handleLogout}
                        _active={{
                          bg: 'transparent',
                        }}
                        _focus={{
                          bg: 'transparent',
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              )
              : (
                <Button colorScheme="blue" color="blue.500" variant="outline" onClick={() => showPopUpLogin()}>
                  Login
                </Button>
              )}
          </Box>
        </Box>
        <Box
          mt="6"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          gap="4"
        >
          <Box
            overflowX="auto"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            display="flex"
            flexWrap="wrap"
          >
            <Tabs index={indexes[activeTab]}>
              <TabList _selected={{ color: 'blue.600', borderColor: 'blue.600', outline: 'none' }} _focusVisible={{ boxShadow: 'none' }}>
                <Tab _focusVisible={{ boxShadow: 'none' }} as={Link} to={ROUTES.home()} fontWeight="medium">Beranda</Tab>
                <Tab _focusVisible={{ boxShadow: 'none' }} fontWeight="medium" onMouseEnter={() => setOpenSF(true)} onMouseLeave={() => setOpenSF(false)}>
                  <Menu isOpen={openSF}>
                    <MenuButton fontWeight="medium" whiteSpace="nowrap">
                      Sejarah & Filosofi
                    </MenuButton>
                    <MenuList mt="0.5" ml="-4" minWidth="160px" borderTopRightRadius="0" borderTopLeftRadius="0">
                      <MenuItem as={Link} to={ROUTES.sejarah()}>Sejarah</MenuItem>
                      <MenuItem as={Link} to={ROUTES.filosofi()}>Filosofi</MenuItem>
                    </MenuList>
                  </Menu>
                </Tab>
                <Tab _focusVisible={{ boxShadow: 'none' }} as={Link} to={ROUTES.pemesanan()} fontWeight="medium">Pemesanan</Tab>
                <Tab _focusVisible={{ boxShadow: 'none' }} as={Link} to={ROUTES.penyewaan()} fontWeight="medium">Penyewaan</Tab>
                <Tab _focusVisible={{ boxShadow: 'none' }} as={Link} to={ROUTES.artikel()} fontWeight="medium">Artikel</Tab>
                {(!!loggedin && admins.includes(loggedin.email?.toLowerCase()))
                  && <Tab _focusVisible={{ boxShadow: 'none' }} as={Link} to={ROUTES.admin()} fontWeight="medium">Admin</Tab>}
              </TabList>
            </Tabs>
          </Box>

          <Box flex={{ base: 'auto', md: 'inherit' }} mb={{ base: 1, md: 0 }}>
            <InputGroup>
              <Input placeholder="Search" size="md" borderRadius="3xl" />
              <InputRightElement>
                <IconButton
                  colorScheme="blue"
                  aria-label="Search database"
                  size="sm"
                  borderRadius="3xl"
                  icon={<Search2Icon />}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
      </Container>

    </Box>
  );
}
