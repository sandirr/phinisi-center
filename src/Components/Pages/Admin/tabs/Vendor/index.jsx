/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import moment from 'moment';
import { callFunc } from '../../../../../Configs/firebase';
import { generateArticleDesc } from '../../../../../Utils/text';
import CreateVendor from '../../lib/CreateVendor';
import PesananVendor from '../../lib/PesananVendor';
import BookinganVendor from '../../lib/BookinganVendor';
import Elements from '../../../../Elements';
import { ConfirmationContext } from '../../../../../Context';

const dataFormat = [
  {
    name: 'No.',
    schema: 'index',
  },
  {
    name: 'Nama',
    schema: 'name',
  },
  {
    name: 'Tagline',
    schema: 'tagline',
  },
  {
    name: 'Lokasi',
    schema: 'location',
  },
  {
    name: 'Tahun',
    schema: 'year',
  },
  {
    name: 'Deskripsi',
    schema: 'description',
  },
  {
    name: 'Aksi',
    schema: 'actions',
  },
];

export default function Component() {
  const [loading, setLoading] = useState(false);
  const [articlesList, setArticlesList] = useState([]);
  const [openModal, setOpenModal] = useState('');
  const [openPesanan, setOpenPesanan] = useState(null);
  const [openBookingan, setOpenBookingan] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [hasMoreItems, setHasMoreItems] = useState(false);

  const { showConfirmation, closeConfirmation } = useContext(ConfirmationContext);

  const [meta, setMeta] = useState({
    activePage: 1,
    totalPage: 1,
    total: 1,
  });

  const prepareToDelete = (item) => {
    const confirmationProps = {
      handleAgree: async () => {
        const callable = callFunc('deleteVendor');
        await callable(item.id)
          .then(async () => {
            await getVendor();
            closeConfirmation();
          });
      },
      title: 'Yakin ingin menghapus?',
      desc: item.name,
    };

    showConfirmation(confirmationProps);
  };

  const getVendor = async () => {
    const callable = callFunc('getVendors');
    setLoading(true);

    await callable({
      page: meta.activePage, limit: 10,
    })
      .then((res) => {
        const {
          activePage,
          totalPage,
          total,
          data,
        } = res.data;
        const normalizeData = data.map((item, index) => ({
          ...item,
          index: index + 1 + (articlesList.length),
          createdAt: moment(item.createdAt).startOf('minute').fromNow(),
          description: `${generateArticleDesc(item.description, 50)}...`,
          actions: (
            <Flex gap="2">
              <Button colorScheme="messenger" variant="outline" onClick={() => setOpenPesanan(item)}>Pesanan</Button>
              <Button colorScheme="messenger" variant="outline" onClick={() => setOpenBookingan(item)}>Bookingan</Button>
              <Button colorScheme="yellow" variant="outline" onClick={() => handleOpenModal('Edit', item)}>Edit</Button>
              <Button colorScheme="red" variant="outline" onClick={() => prepareToDelete(item)}>Hapus</Button>
            </Flex>
          ),
        }));
        setArticlesList([...articlesList, ...normalizeData]);
        setHasMoreItems(activePage < totalPage);
        setMeta({
          activePage,
          totalPage,
          total,
        });
      })
      .catch((err) => {
        // console.log('anjing', err);
      }).finally(() => {
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    setMeta((prev) => ({
      ...prev,
      activePage: prev.activePage + 1,
    }));
  };

  useEffect(() => {
    const firstLoad = meta.activePage === 1 && !articlesList.length;
    if (firstLoad || hasMoreItems) {
      getVendor();
    }
  }, [meta.activePage]);

  const handleCloseOpenModal = (getAgain = false) => {
    setOpenModal(false);
    setSelectedArticle(null);

    if (getAgain) {
      getVendor();
    }
  };

  const handleOpenModal = (modalType, item = null) => {
    setSelectedArticle(item);
    setOpenModal(modalType);
  };

  const handleClosePesanan = () => {
    setOpenPesanan(null);
  };

  const handleCloseBookingan = () => {
    setOpenBookingan(null);
  };

  return (
    <Box>
      <Flex justify="space-between">
        <Heading size="lg">Manajemen Vendor</Heading>
        <Button colorScheme="blue" onClick={() => handleOpenModal('Buat')}>Buat Vendor</Button>
      </Flex>
      <Elements.Table
        isLoading={loading}
        hasMoreItems={hasMoreItems}
        handleLoadMore={handleLoadMore}
        listData={articlesList}
        dataFormat={dataFormat}
      />
      <Modal isOpen={!!openModal} size="6xl" onClose={handleCloseOpenModal}>
        <ModalOverlay />
        <ModalContent pb="4">
          <ModalHeader>
            {openModal}
            {' '}
            Vendor
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateVendor givenData={selectedArticle} onSuccess={handleCloseOpenModal} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <PesananVendor vendor={openPesanan} onClose={handleClosePesanan} />
      <BookinganVendor vendor={openBookingan} onClose={handleCloseBookingan} />
    </Box>
  );
}
