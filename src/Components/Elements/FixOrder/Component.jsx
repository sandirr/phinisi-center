import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  MinusIcon, PlusIcon, SendIcon, UploadIcon,
} from '../../../Assets/icons/icons';

export default function Component({
  handleClose, open, vendor = {},
}) {
  const [loading] = useState(false);
  console.log(vendor);
  const sendMessage = async () => {
  };
  return (
    <Modal onClose={handleClose} size="xl" isOpen={open}>
      <ModalOverlay />
      <ModalContent borderRadius={24}>
        <ModalHeader pb="0">
          Formulir Pemesanan
        </ModalHeader>
        <ModalCloseButton color="blackAlpha.300" size="lg" />
        <ModalBody>
          <Divider />
          <Stack direction="column" gap="8px" mt="4">
            <Box>
              <Text size="md" mb="1">Nama Pemesan</Text>
              <Input
                placeholder="masukkan nama pemesanan..."
                size="md"
              />
            </Box>
            <Box>
              <Text size="md" mb="1">Nama Pemesan</Text>
              <Input
                placeholder="masukkan nama kapal..."
                size="md"
              />
            </Box>
            <Flex gap="40px" justify="space-between">
              <Box>
                <Text size="md" mb="1">Panjang Kapal (m)</Text>
                <Flex alignItems="center" borderWidth={1} borderColor="gray.300" borderRadius={4} py="2" px="2.5">
                  <MinusIcon color="blue.600" cursor="pointer" />
                  <Input
                    placeholder="0"
                    size="md"
                    variant="unstyled"
                    textAlign="center"
                  />
                  <PlusIcon color="blue.600" cursor="pointer" />
                </Flex>
              </Box>
              <Box>
                <Text size="md" mb="1">Lebar Kapal (m)</Text>
                <Flex alignItems="center" borderWidth={1} borderColor="gray.300" borderRadius={4} py="2" px="2.5">
                  <MinusIcon color="blue.600" cursor="pointer" />
                  <Input
                    placeholder="0"
                    size="md"
                    variant="unstyled"
                    textAlign="center"
                  />
                  <PlusIcon color="blue.600" cursor="pointer" />
                </Flex>
              </Box>
              <Box>
                <Text size="md" mb="1">Bobot (t)</Text>
                <Flex alignItems="center" borderWidth={1} borderColor="gray.300" borderRadius={4} py="2" px="2.5">
                  <MinusIcon color="blue.600" cursor="pointer" />
                  <Input
                    placeholder="0"
                    size="md"
                    variant="unstyled"
                    textAlign="center"
                  />
                  <PlusIcon color="blue.600" cursor="pointer" />
                </Flex>
              </Box>
            </Flex>
            <Box>
              <Text size="md" mb="1">Durasi Pengerjaan</Text>
              <Input
                placeholder="masukkan tanggal"
                size="md"
                type="date"
              />
            </Box>
            <Box>
              <Text size="md" mb="1">Upload Bukti Pemesanan</Text>
              <Flex alignItems="center" justify="center" gap="40px" borderWidth={1} borderColor="blue.600" py="10" borderRadius={24}>
                <UploadIcon color="blue.600" width="80px" height="80px" />
                <Text size="md">
                  Drag an image here or
                  {' '}
                  <Text color="blue.600" display="inline" cursor="pointer">upload a file</Text>
                </Text>
              </Flex>
            </Box>
          </Stack>
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
