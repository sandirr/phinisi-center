import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export default function Component({
  handleClose, open, title, desc, handleAgree,
}) {
  const [loading, setLoading] = useState(false);
  const ctaAgree = async () => {
    setLoading(true);
    await handleAgree();
    setLoading(false);
  };
  return (
    <Modal onClose={handleClose} size="md" isOpen={open}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {desc}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Batal</Button>
          <Button isLoading={loading} onClick={ctaAgree} ml="2">Yakin</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
