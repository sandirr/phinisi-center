import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Image, Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../Configs/routes';
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
    <Box mt={['4', '6', '8']}>
      <Heading size={['xs', 'sm']}>Artikel Terkait</Heading>
      {articlesList.map((article) => (
        <Box
          key={article.id}
          mt={['2', '3', '4']}
          as={Link}
          to={`${ROUTES.artikel()}/baca/${article.id}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={[2, 3, 4]}
        >
          <Box>
            <Text fontSize={['sm', 'sm', 'md']}>{article.category}</Text>
            <Heading noOfLines={2} mt="1" size={['sm', 'sm', 'md']}>{article.title}</Heading>
          </Box>
          <Image width={['70px', '80px', '90px', '100px']} height={['70px', '80px', '90px', '100px']} borderRadius={16} src={article.cover || 'https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'} />
        </Box>
      ))}
    </Box>
  );
}
