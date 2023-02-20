import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { callFunc } from '../../../Configs/firebase';
import ROUTES from '../../../Configs/routes';

export default function Component() {
  const [articlesList, setArticlesList] = useState([]);

  const getArticles = async () => {
    const callable = callFunc('getArticlePopulars');
    await callable({
      page: 1, limit: 3,
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
    getArticles();
  }, []);

  return (
    <Box mt={['4', '6', '8']}>
      <Heading size={['xs', 'sm']}>Artikel Populer</Heading>
      {articlesList.map((article, idx) => (
        <Box mt="4" as={Link} to={`${ROUTES.artikel()}/baca/${article.id}`} display="block" key={idx}>
          <Text fontSize={['sm', 'sm', 'md']}>{article.category}</Text>
          <Heading noOfLines={2} mt="1" size={['sm', 'sm', 'md']}>{article.title}</Heading>
        </Box>
      ))}
    </Box>
  );
}
