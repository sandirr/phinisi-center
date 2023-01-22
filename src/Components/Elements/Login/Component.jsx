import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  Close, Facebook, Google,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Images from '../../../Configs/images';
import { auth } from '../../../Configs/firebase';

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export default function Component({ open, handleClose }) {
  const signinWithGoogle = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    if (data.user) {
      // window.location.reload();
      handleClose();
    }
  };

  const signinWithFB = async () => {
    const data = await signInWithPopup(auth, fbProvider);
    if (data.user) {
      // window.location.reload();
      handleClose();
    }
  };

  return (
    <Modal isOpen={open} onClose={() => null} size="2xl">
      <ModalOverlay />
      <ModalContent borderRadius="2xl">
        <ModalBody pb="20" px={0}>
          <IconButton bg="transparent" color="blackAlpha.300" ml="2" onClick={handleClose}>
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
  );
}
