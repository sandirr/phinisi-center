import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { callFunc } from '../../../Configs/firebase';

export default function Component() {
  const [articlesList, setArticlesList] = useState([]);

  const getArticles = async () => {
    const callable = callFunc('getArticlePopulars');
    await callable({
      page: 1, limit: 3, type: 'Artikel',
    })
      .then((res) => {
        const {
          data,
        } = res.data;
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
    getArticles();
  }, []);

  return (
    <Box mt="8">
      <Heading size="xs">Artikel Populer</Heading>
      {articlesList.map((article, idx) => (
        <Box mt="4" as={Link} to="/" display="block" key={idx}>
          <Text size="sm">{article.category}</Text>
          <Heading noOfLines={2} mt="1" size="md">{article.title}</Heading>
        </Box>
      ))}
    </Box>
  );
}
