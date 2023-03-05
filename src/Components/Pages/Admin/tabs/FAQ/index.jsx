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
import CreateFAQ from '../../lib/CreateFAQ';
import Elements from '../../../../Elements';
import { ConfirmationContext } from '../../../../../Context';

const dataFormat = [
  {
    name: 'No.',
    schema: 'i',
  },
  {
    name: 'Pertanyaan',
    schema: 'question',
  },
  {
    name: 'Jawaban',
    schema: 'answer',
  },
  {
    name: 'Index',
    schema: 'index',
  },
  {
    name: 'Aksi',
    schema: 'actions',
  },
];

export default function Component() {
  const [articlesList, setArticlesList] = useState([]);
  const [openModal, setOpenModal] = useState('');
  const [selectedArticle, setSelectedArticle] = useState({
  });
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showConfirmation, closeConfirmation } = useContext(ConfirmationContext);

  const [meta, setMeta] = useState({
    activePage: 1,
    totalPage: 1,
    total: 1,
  });

  const prepareToDelete = (item) => {
    const confirmationProps = {
      handleAgree: async () => {
        const callable = callFunc('deleteFaq');
        await callable(item.id)
          .then(async () => {
            await getFaqs();
            closeConfirmation();
          });
      },
      title: 'Yakin ingin menghapus?',
      desc: item.title,
    };

    showConfirmation(confirmationProps);
  };

  const getFaqs = async () => {
    const callable = callFunc('getFaqs');
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
          i: index + 1 + (articlesList.length),
          answer: `${generateArticleDesc(item.answer, 50)}...`,
          actions: (
            <Flex gap="2">
              <Button colorScheme="yellow" variant="outline" onClick={() => handleOpenModal('Edit', item)}>Edit</Button>
              <Button colorScheme="red" variant="outline" onClick={() => prepareToDelete(item)}>Hapus</Button>
            </Flex>
          ),
        }));
        setArticlesList([...articlesList, ...normalizeData]);
        setMeta({
          activePage,
          totalPage,
          total,
        });
        setHasMoreItems(activePage < totalPage);
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
      getFaqs();
    }
  }, [meta.activePage]);

  const handleCloseOpenModal = (getAgain = false) => {
    setOpenModal(false);
    setSelectedArticle({
    });

    if (getAgain) {
      getFaqs();
    }
  };

  const handleOpenModal = (modalType, item = selectedArticle) => {
    setSelectedArticle(item);
    setOpenModal(modalType);
  };

  return (
    <Box>
      <Flex justify="space-between">
        <Heading size="lg">Manajemen FAQ</Heading>
        <Button colorScheme="blue" onClick={() => handleOpenModal('Buat')}>Buat Pertanyaan</Button>
      </Flex>
      <Elements.Table
        hasMoreItems={hasMoreItems}
        handleLoadMore={handleLoadMore}
        listData={articlesList}
        dataFormat={dataFormat}
        isLoading={loading}
      />
      <Modal isOpen={!!openModal} size="6xl" onClose={handleCloseOpenModal}>
        <ModalOverlay />
        <ModalContent pb="4">
          <ModalHeader>
            {openModal}
            {' '}
            Artikel
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateFAQ givenData={selectedArticle} onSuccess={handleCloseOpenModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
