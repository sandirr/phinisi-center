import React from 'react';
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
} from '@chakra-ui/react';

export default function Component({
  loading,
}) {
  return (
    <Modal size="xs" isOpen={loading} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody bg="#eee" borderRadius={16}>
          <Flex gap="4" justify="center" py="4">
            <Skeleton height="7" width="7" borderRadius="full" startColor="#EFEFEF" endColor="blue.600" />
            <Skeleton height="7" width="7" borderRadius="full" endColor="#EFEFEF" startColor="blue.600" />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
