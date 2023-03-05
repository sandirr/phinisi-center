import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import {
  doc, getDoc, setDoc, updateDoc,
} from 'firebase/firestore';
import { push, ref } from 'firebase/database';
import { SendIcon } from '../../../Assets/icons/icons';
import { auth, database, firestore } from '../../../Configs/firebase';
import Images from '../../../Configs/images';

const initialMessages = [
  'Halo ! saya tertarik dengan vendor ini',
  'Berapa lama pengerjaan kapal ?',
  'Apakah saya bisa mencustom kapal pada vendor ini?',
];

export default function Component({
  handleClose, open, vendor = {}, order = {},
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const toast = useToast();
  const sendMessage = async () => {
    const newOrder = { ...order };
    delete newOrder.detailVendor;
    if (message) {
      setLoading(true);
      const body = {
        uid: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        name: auth.currentUser?.displayName,
        lastChatTime: new Date().toISOString(),
        lastChatContent: message,
        lastChatFrom: auth.currentUser?.displayName,
        vendor: doc(firestore, `vendors/${vendor.id}`),
        hasRead: false,
        order: newOrder,
      };

      const chatId = `${auth.currentUser?.uid}-${vendor.id}`;
      const chatRef = doc(firestore, `chats/${chatId}`);
      const chatSnapshot = await getDoc(chatRef);
      if (chatSnapshot.exists()) {
        await updateDoc(chatRef, body).then(() => {
          const dateChatRef = ref(database, `chats/${chatId}`);
          push(dateChatRef, {
            from: auth.currentUser?.displayName,
            fromUid: auth.currentUser?.uid,
            content: message,
            time: new Date().toISOString(),
          }).then(() => {
            setMessage('');
          });
        }).finally(() => {
          handleClose();
          setLoading(false);
          toast({
            title: 'Pesan terkirim.',
            description: 'Cek pesan secara berkala.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        });
      } else {
        await setDoc(chatRef, body).then(() => {
          setMessage('');
        }).finally(() => {
          handleClose();
          setLoading(false);
        });
      }
    }
  };
  return (
    <Modal onClose={handleClose} size={['xs', 'xl']} isOpen={open}>
      <ModalOverlay />
      <ModalContent borderRadius={24}>
        <ModalHeader px={[2, 4, 6]}>
          <Flex justify="space-between" alignItems="center" px={[2, 4, 6]} pt={4}>
            <Flex gap={['2', '4', '6']} alignItems="center">
              <Avatar
                referrerPolicy="no-referrer"
                src={vendor.cover || Images.Order1}
              />
              <Box>
                <Heading size={['sm', 'md']}>
                  {vendor.name}
                </Heading>
                <Text fontSize={['xs', 'sm', 'md']} fontWeight="400">{vendor.location}</Text>
              </Box>
            </Flex>
            <CloseButton color="blackAlpha.300" onClick={handleClose} />
          </Flex>
        </ModalHeader>
        <ModalBody px={0}>
          <Divider />
          <Box px={[4, 6]} py={4}>
            <Textarea
              placeholder="Tulis pesan..."
              variant="unstyled"
              resize="none"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              size="sm"
            />
            <Stack direction="column">
              {initialMessages.map((mssg, idx) => (
                <Box key={idx}>
                  <Box
                    cursor="pointer"
                    borderRadius="full"
                    display="inline-block"
                    py="2"
                    px="4"
                    border="1px solid #E2E8F0"
                    onClick={() => setMessage(mssg)}
                  >
                    <Text fontSize="xs" fontWeight="700">
                      {mssg}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={loading}
            onClick={sendMessage}
            ml="2"
            size={['sm', 'md']}
            colorScheme="blue"
            bg="blue.600"
            color="white"
            leftIcon={(<SendIcon />)}
          >
            Kirim
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
