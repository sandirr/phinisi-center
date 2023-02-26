import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
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
  useToast,
} from '@chakra-ui/react';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  MinusIcon, PlusIcon, SendIcon, UploadIcon,
} from '../../../Assets/icons/icons';
import { auth, callFunc, storage } from '../../../Configs/firebase';

const initialState = {
  orderedBy: '',
  name: '',
  weight: 0,
  images: [],
  location: '',
  year: '',
  description: '',
  width: 0,
  long: 0,
  capacity: '',
  cabin: '',
  speed: '',
  progress: 0,
  invoice: '',
  uid: auth.currentUser?.uid,
};

export default function Component({
  handleClose, open, vendor = {},
}) {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(initialState);
  const [imgLoading, setImgLoading] = useState(false);
  const invoiceRef = useRef(null);

  const toast = useToast();

  useEffect(() => {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    }, false);
    window.addEventListener('drop', (e) => {
      e.preventDefault();
    }, false);
  }, []);

  const handleChangeField = ({ target }) => {
    setFields({ ...fields, [target.name]: target.value });
  };

  const minusOne = (field) => {
    setFields({ ...fields, [field]: !fields[field] ? 0 : Number(fields[field] || 0) - 1 });
  };

  const addOne = (field) => {
    setFields({ ...fields, [field]: Number(fields[field] || 0) + 1 });
  };

  const triggerUpload = () => {
    invoiceRef.current?.click();
  };

  const deleteInvoice = () => {
    setFields({
      ...fields,
      invoice: '',
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const uploadImage = async (file) => {
    setImgLoading(true);
    const imageRef = storageRef(storage, `invoiceOrder/${Date.now().toString()}`);
    await uploadBytes(imageRef, file)
      .then(async () => {
        const image = await getDownloadURL(imageRef);
        setFields({ ...fields, invoice: image });
      })
      .finally(() => {
        setImgLoading(false);
      });
  };

  const handleAddImg = async ({ target }) => {
    if (target.files && target.files[0]) {
      const file = target.files[0];
      await uploadImage(file);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await uploadImage(file);
    }
  };

  const postData = async () => {
    setLoading(true);
    const callable = callFunc('createOrder');
    const body = {
      ...fields,
      createdAt: new Date().toISOString(),
      vendorId: vendor.id,
      weight: Number(fields.weight),
      width: Number(fields.width),
      long: Number(fields.long),
      speed: Number(fields.speed),
      progress: Number(fields.progress),
    };
    await callable(body).then(() => {
      setFields(() => initialState);
      toast({
        title: 'Permintaan terkirim.',
        description: 'Cek Notifikasi Secara berkala.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      handleClose();
    }).finally(() => {
      setLoading(false);
      // onFailed();
    });
  };

  return (
    <Modal onClose={handleClose} size={['xs', 'xl']} isOpen={open}>
      <ModalOverlay />
      <ModalContent borderRadius={24}>
        <ModalHeader fontSize={['md', 'lg', 'xl']} pb="0">
          Formulir Pemesanan
          {' '}
          {vendor.name}
        </ModalHeader>
        <ModalCloseButton color="blackAlpha.300" fontSize={['sm', 'md', 'lg']} />
        <ModalBody>
          <Divider />
          <Stack direction="column" spacing={[2, 4]} mt="4">
            <Box>
              <Text fontSize={['sm', 'md', 'lg']} mb="1">Nama Pemesan</Text>
              <Input
                value={fields.orderedBy}
                name="orderedBy"
                onChange={handleChangeField}
                placeholder="masukkan nama pemesan..."
                size="md"
              />
            </Box>
            <Box>
              <Text fontSize={['sm', 'md', 'lg']} mb="1">Nama Kapal</Text>
              <Input
                value={fields.name}
                name="name"
                onChange={handleChangeField}
                placeholder="masukkan nama kapal..."
                size="md"
              />
            </Box>
            <Flex gap={[2, 4, 6, 8, 10]} justify="space-between">
              <Box>
                <Text fontSize={['sm', 'md', 'lg']} mb="1">Panjang (m)</Text>
                <Flex alignItems="center" borderWidth={1} borderColor="gray.300" borderRadius={4} py="2" px="2.5">
                  <Box className="btn" onClick={() => minusOne('long')}>
                    <MinusIcon color="blue.600" />
                  </Box>
                  <Input
                    placeholder="0"
                    value={fields.long}
                    name="long"
                    onChange={handleChangeField}
                    size="md"
                    variant="unstyled"
                    textAlign="center"
                  />
                  <Box className="btn" onClick={() => addOne('long')}>
                    <PlusIcon color="blue.600" />
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Text fontSize={['sm', 'md', 'lg']} mb="1">Lebar (m)</Text>
                <Flex alignItems="center" borderWidth={1} borderColor="gray.300" borderRadius={4} py="2" px="2.5">
                  <Box className="btn" onClick={() => minusOne('width')}>
                    <MinusIcon color="blue.600" />
                  </Box>
                  <Input
                    value={fields.width}
                    name="width"
                    onChange={handleChangeField}
                    placeholder="0"
                    size="md"
                    variant="unstyled"
                    textAlign="center"
                  />
                  <Box className="btn" onClick={() => addOne('width')}>
                    <PlusIcon color="blue.600" />
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Text fontSize={['sm', 'md', 'lg']} mb="1">Bobot (t)</Text>
                <Flex alignItems="center" borderWidth={1} borderColor="gray.300" borderRadius={4} py="2" px="2.5">
                  <Box className="btn" onClick={() => minusOne('weight')}>
                    <MinusIcon color="blue.600" />
                  </Box>
                  <Input
                    value={fields.weight}
                    name="weight"
                    onChange={handleChangeField}
                    placeholder="0"
                    size="md"
                    variant="unstyled"
                    textAlign="center"
                  />
                  <Box className="btn" onClick={() => addOne('weight')}>
                    <PlusIcon color="blue.600" />
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Box>
              <Text fontSize={['sm', 'md', 'lg']} mb="1">Estimasi Selesai</Text>
              <Input
                value={fields.year}
                name="year"
                onChange={handleChangeField}
                type="number"
                placeholder="masukkan tahun"
                size="md"
              />
            </Box>
            <form onDragEnter={handleDrag} onDrop={handleDrop} onSubmit={(e) => e.preventDefault()}>
              <Text fontSize={['sm', 'md', 'lg']} mb="1">Upload Bukti Pemesanan</Text>
              {imgLoading && 'Uploading...'}
              {fields.invoice
                ? (
                  <Flex alignItems="center" position="relative" justify="center" px={[2, 4]} borderWidth={1} borderColor="blue.600" py={[4, 6, 8, 10]} borderRadius={[16, 20, 24]}>
                    <Image src={fields.invoice} w="full" />
                    <IconButton position="absolute" top={2} right={2} onClick={deleteInvoice} size={['sm', 'md']}>
                      <DeleteIcon color="red.600" />
                    </IconButton>
                  </Flex>
                )
                : (
                  <Flex alignItems="center" justify="center" gap={[4, 6, 8, 10]} px={[2, 4]} borderWidth={1} borderColor="blue.600" py={[4, 6, 8, 10]} borderRadius={[16, 20, 24]}>
                    <Input onChange={handleAddImg} ref={invoiceRef} id="invoice-input" accept="image/png, image/jpg, image/jpeg" type="file" hidden />
                    <UploadIcon color="blue.600" width={['40px', '60px', '80px']} height={['40px', '60px', '80px']} />
                    <Text fontSize={['sm', 'md', 'lg']}>
                      Drag an image here or
                      {' '}
                      <Text onClick={triggerUpload} color="blue.600" display="inline" className="btn">upload a file</Text>
                    </Text>
                  </Flex>
                )}
            </form>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={loading}
            onClick={postData}
            ml="2"
            colorScheme="blue"
            bg="blue.600"
            color="white"
            size={['sm', 'md']}
            leftIcon={(<SendIcon />)}
          >
            Kirim
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
