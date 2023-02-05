import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Image, Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { callFunc } from '../../../Configs/firebase';

export default function Component({ category }) {
  const [articlesList, setArticlesList] = useState([]);

  const getArticles = async () => {
    const callable = callFunc('getArticlePopulars');
    await callable({
      page: 1, limit: 4, category,
    })
      .then((res) => {
        const {
          data,
        } = res;
        const normalizeData = data.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        setArticlesList(normalizeData);
      })
      .catch(() => {
        // console.log('anjing', err);
      });
  };

  useEffect(() => {
    if (category) {
      getArticles();
    }
  }, [category]);
  return (
    <Box mt="8">
      <Heading size="xs">Artikel Terkait</Heading>
      {articlesList.map((article) => (
        <Box
          key={article.id}
          mt="4"
          as={Link}
          to="/"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={4}
        >
          <Box>
            <Text size="sm">{article.category}</Text>
            <Heading noOfLines={2} mt="1" size="md">{article.title}</Heading>
          </Box>
          <Image width={100} height={100} borderRadius={16} src={article.cover || 'https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'} />
        </Box>
      ))}
    </Box>
  );
}
