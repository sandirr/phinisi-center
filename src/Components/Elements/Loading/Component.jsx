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
      <ModalContent bg="transparent" boxShadow="none">
        <ModalBody borderRadius={16} boxShadow="none">
          <Flex gap={['2', '3', '4']} justify="center" py={['2', '3', '4']}>
            <Skeleton height={['4', '5', '6', '7']} width={['4', '5', '6', '7']} borderRadius="full" startColor="#EFEFEF" endColor="blue.600" />
            <Skeleton height={['4', '5', '6', '7']} width={['4', '5', '6', '7']} borderRadius="full" endColor="#EFEFEF" startColor="blue.600" />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
