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
import CreateArticle from '../../lib/CreateArticle';
import Elements from '../../../../Elements';
import { ConfirmationContext } from '../../../../../Context';

const dataFormat = [
  {
    name: 'No.',
    schema: 'index',
  },
  {
    name: 'Judul',
    schema: 'title',
  },
  {
    name: 'Penulis',
    schema: 'author',
  },
  {
    name: 'Dibuat',
    schema: 'createdAt',
  },
  {
    name: 'Kategori',
    schema: 'category',
  },
  {
    name: 'Konten',
    schema: 'generatedContent',
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
    type: 'Artikel',
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
        const callable = callFunc('deleteArticle');
        await callable(item.id)
          .then(async () => {
            await getArticles();
            closeConfirmation();
          });
      },
      title: 'Yakin ingin menghapus?',
      desc: item.title,
    };

    showConfirmation(confirmationProps);
  };

  const getArticles = async () => {
    const callable = callFunc('getArticles');
    setLoading(true);

    await callable({
      page: meta.activePage, limit: 10, type: 'Artikel',
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
          generatedContent: `${generateArticleDesc(item.content, 50)}...`,
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
      getArticles();
    }
  }, [meta.activePage]);

  const handleCloseOpenModal = (getAgain = false) => {
    setOpenModal(false);
    setSelectedArticle({
      type: 'Artikel',
    });

    if (getAgain) {
      getArticles();
    }
  };

  const handleOpenModal = (modalType, item = selectedArticle) => {
    setSelectedArticle(item);
    setOpenModal(modalType);
  };

  return (
    <Box>
      <Flex justify="space-between">
        <Heading size="lg">Manajemen Artikel</Heading>
        <Button colorScheme="blue" onClick={() => handleOpenModal('Buat')}>Buat Artikel</Button>
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
            <CreateArticle givenData={selectedArticle} onSuccess={handleCloseOpenModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
