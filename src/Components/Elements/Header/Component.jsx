import React, { useState } from 'react';
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
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  Tabs,
  Text,
  Image,
  Flex,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Search2Icon } from '@chakra-ui/icons';
import { Close, Facebook, Google } from '@mui/icons-material';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import Images from '../../../Configs/images';
import { auth } from '../../../Configs/firebase';
import ROUTES from '../../../Configs/routes';

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export default function Component() {
  const [openSF, setOpenSF] = useState(false);
  const [popLogin, setPopLogin] = useState(false);

  const signinWithGoogle = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    if (data.user) {
      // window.location.reload();
    }
  };

  const signinWithFB = async () => {
    const data = await signInWithPopup(auth, fbProvider);
    if (data.user) {
      // window.location.reload();
    }
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
            <Button colorScheme="blue" color="blue.500" variant="outline" onClick={() => setPopLogin(true)}>
              Login
            </Button>
          </Box>
        </Box>
        <Box
          mt="6"
          display="flex"
          // css={{
          //   flexWrap: 'wrap',
          // }}
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
          >
            <Tabs>
              <TabList _selected={{ color: 'blue.500', borderColor: 'blue.500', outline: 'none' }} _focusVisible={{ boxShadow: 'none' }}>
                <Tab as={Link} to={ROUTES.home()} fontWeight="medium">Beranda</Tab>
                <Tab fontWeight="medium" onMouseEnter={() => setOpenSF(true)} onMouseLeave={() => setOpenSF(false)}>
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
                <Tab as={Link} to={ROUTES.pemesanan()} fontWeight="medium">Pemesanan</Tab>
                <Tab as={Link} to={ROUTES.penyewaan()} fontWeight="medium">Penyewaan</Tab>
                <Tab as={Link} to={ROUTES.artikel()} fontWeight="medium">Artikel</Tab>
              </TabList>
            </Tabs>
          </Box>

          <Box flex={{ base: 'auto', md: 'inherit' }}>
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

      <Modal isOpen={popLogin} onClose={() => null} size="2xl">
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalBody pb="20" px={0}>
            <IconButton bg="transparent" color="blackAlpha.300" ml="2" onClick={() => setPopLogin(false)}>
              <Close />
            </IconButton>

            <Divider mb="66px" />

            <Container maxW="xs">
              <Flex justify="center">
                <Image src={Images.Logo} width="100%" />
              </Flex>

              <Stack direction="column" spacing={4} mt="66px" color="#2263DD">
                <Button leftIcon={<Google />} colorScheme="#2263DD" variant="outline" borderRadius="3xl" onClick={signinWithGoogle}>
                  Login dengan Google
                </Button>
                <Button leftIcon={<Facebook />} colorScheme="#2263DD" variant="outline" borderRadius="3xl" onClick={signinWithFB}>
                  Login dengan Facebook
                </Button>
              </Stack>
            </Container>

            <Box justifyContent="center" display="flex">
              <Text fontSize={12} textAlign="center" maxW="md" mt="60px" color="black">
                Click “Login” to agree to Phinisi Center
                {' '}
                <Link style={{ textDecoration: 'underline' }} to="/">Terms of Service</Link>
                {' '}
                and acknowledge that Phinisi Center
                {' '}
                <Link style={{ textDecoration: 'underline' }} to="/">Privacy Policy</Link>
                {' '}
                applies to you.
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
