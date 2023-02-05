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
} from '@chakra-ui/react';
import { SendIcon } from '../../../Assets/icons/icons';

const initialMessages = [
  'Halo ! saya tertarik dengan vendor ini',
  'Berapa lama pengerjaan kapal ?',
  'Apakah saya bisa mencustom kapal pada vendor ini?',
];

export default function Component({
  handleClose, open, vendor = {},
}) {
  const [loading] = useState(false);
  const [message, setMessage] = useState('');
  const sendMessage = async () => {
  };
  return (
    <Modal onClose={handleClose} size="xl" isOpen={open}>
      <ModalOverlay />
      <ModalContent borderRadius={24}>
        <ModalHeader px={6}>
          <Flex justify="space-between" alignItems="center" px={6} pt={4}>
            <Flex gap="6">
              <Avatar
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
              />
              <Box>
                <Heading size="md">
                  {vendor.name}
                </Heading>
                <Text fontSize="lg" fontWeight="400">Phinisi Center</Text>
              </Box>
            </Flex>
            <CloseButton color="blackAlpha.300" onClick={handleClose} />
          </Flex>
        </ModalHeader>
        <ModalBody px={0}>
          <Divider />
          <Box px={6} py={4}>
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
