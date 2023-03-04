import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search2Icon } from '@chakra-ui/icons';
import {
  signOut,
} from 'firebase/auth';
import Images from '../../../Configs/images';
import { auth } from '../../../Configs/firebase';
import ROUTES from '../../../Configs/routes';
import { ConfirmationContext, LoginContext } from '../../../Context';
import { admins } from '../../../Configs/constants';
import Notifications from '../Notifications';
import Chats from '../Chats';

export default function Component() {
  const headerRef = useRef(null);
  const [openSF, setOpenSF] = useState(false);
  const navigate = useNavigate();
  const { showPopUpLogin, loggedin } = useContext(LoginContext);
  const { showConfirmation, closeConfirmation } = useContext(ConfirmationContext);

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

  const { pathname } = useLocation();

  useEffect(() => {
    setOpenSF(false);
  }, [pathname]);

  const handleLogout = () => {
    showConfirmation({
      handleAgree: async () => {
        await signOut(auth);
        navigate('/');
        closeConfirmation();
      },
      title: 'Yakin ingin logout?',
    });
  };

  useEffect(() => {
    let lastScroll = 0;
    let loaded;

    window.onscroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const header = headerRef.current;
      const height = -header.clientHeight;

      if (scrollY <= Math.max(lastScroll, Number(header.clientHeight) / 1.5)
      || loaded === undefined) {
        header.style.transition = 'transform 0.5s';
        header.style.transform = 'translateY(0px)';
      } else {
        header.style.transition = 'transform 1s';
        header.style.transform = `translateY(${height}px)`;
      }
      // (scrollY <= Math.max(lastScroll, 50) || window.innerWidth <= 1200 || loaded === undefined)

      lastScroll = scrollY;
      loaded = true;
    };
  }, []);

  return (
    <Box bg="white" boxShadow="md" pt="6" position="sticky" top={0} zIndex="sticky" ref={headerRef}>
      <Container maxW="7xl">
        <Box display={{ base: 'flex', md: 'none' }} gap="2" mb="4">
          <a href="https://www.kemdikbud.go.id/" target="_blank" rel="noreferrer">
            <Image height="18px" src={Images.Kemdikbud} alt="kemdikbud" />
          </a>
          <a href="https://danaindonesiana.kemdikbud.go.id/" target="_blank" rel="noreferrer">
            <Image height="16px" src={Images.DanaIndonesiana} alt="Dana Indonesiana" />
          </a>
          <a href="https://lpdp.kemenkeu.go.id/" target="_blank" rel="noreferrer">
            <Image height="16px" src={Images.LPDP} alt="LPDP" />
          </a>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display={{ base: 'none', md: 'flex' }} gap="2" flex={1}>
            <a href="https://www.kemdikbud.go.id/" target="_blank" rel="noreferrer">
              <Image height="26px" src={Images.Kemdikbud} alt="kemdikbud" />
            </a>
            <a href="https://danaindonesiana.kemdikbud.go.id/" target="_blank" rel="noreferrer">
              <Image height="24px" src={Images.DanaIndonesiana} alt="Dana Indonesiana" />
            </a>
            <a href="https://lpdp.kemenkeu.go.id/" target="_blank" rel="noreferrer">
              <Image height="24px" src={Images.LPDP} alt="LPDP" />
            </a>
          </Box>
          <Box cursor="pointer">
            <h1 onClick={() => navigate('/')}>
              <Image src={Images.Logo} alt="Phinisi Center" width={[20, 100, 120]} />
            </h1>
          </Box>
          <Box flex={1} textAlign="right">
            {loggedin
              ? (
                <Box display="flex" justifyContent="flex-end" alignItems="center" gap="5">
                  <Notifications />
                  <Chats />
                  <Menu>
                    <MenuButton>
                      {loggedin?.photoURL
                        ? (
                          <Image
                            src={loggedin.photoURL}
                            h="32px"
                            w="32px"
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
                <Button colorScheme="blue" color="blue.600" variant="outline" onClick={() => showPopUpLogin()}>
                  Login
                </Button>
              )}
          </Box>
        </Box>
        <Box
          mt={['2', '4', '6']}
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          gap={['2', '4']}
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
            <Tabs index={indexes[activeTab]} size={['sm', 'md', 'lg']}>
              <TabList _selected={{ color: 'blue.600', borderColor: 'blue.600', outline: 'none' }} _focusVisible={{ boxShadow: 'none' }}>
                <Tab _focusVisible={{ boxShadow: 'none' }} as={Link} to={ROUTES.home()} fontWeight="medium">Beranda</Tab>
                <Tab
                  _focusVisible={{ boxShadow: 'none' }}
                  fontWeight="medium"
                  onClick={() => setOpenSF(true)}
                  onMouseEnter={() => setOpenSF(true)}
                  onMouseLeave={() => setOpenSF(false)}
                >
                  <Menu isOpen={openSF}>
                    <MenuButton fontWeight="medium" whiteSpace="nowrap">
                      Sejarah & Filosofi
                    </MenuButton>
                    <MenuList mt="0.5" ml="-4" minWidth="160px" borderTopRightRadius="0" borderTopLeftRadius="0">
                      <MenuItem _focusVisible={{ bg: 'none' }} _hover={{ bg: 'none' }} as={Link} to={ROUTES.sejarah()}>Sejarah</MenuItem>
                      <MenuItem _focusVisible={{ bg: 'none' }} _hover={{ bg: 'none' }} as={Link} to={ROUTES.filosofi()}>Filosofi</MenuItem>
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
                  bg="blue.600"
                  _hover={{
                    bg: 'blue.500',
                  }}
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
