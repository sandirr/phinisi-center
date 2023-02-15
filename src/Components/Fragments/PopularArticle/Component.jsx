import React, { useEffect, useState } from 'react';
import {
  Box, Button, Container, Grid, GridItem, Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { callFunc } from '../../../Configs/firebase';
import ROUTES from '../../../Configs/routes';

export default function Component() {
  const navigate = useNavigate();
  const [articlesList, setArticlesList] = useState([
    {
      category: 'Fun Fact',
      title: 'Phinisi sebagai warisan budaya Indonesia',
    },
    {
      category: 'Fun Fact',
      title: 'Phinisi sebagai warisan budaya Indonesia',
    },
    {
      category: 'Fun Fact',
      title: 'Phinisi sebagai warisan budaya Indonesia',
    },
  ]);

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
        if (data.length) {
          setArticlesList(normalizeData);
        }
      })
      .catch(() => {
        // console.log('anjing', err);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <Box my={10}>
      <Container maxW="3xl">
        <Heading color="blackAlpha.900" size={['sm', 'md']} ml={2.5}>Artikel Populer</Heading>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={[3, 4, 6]} mt={2}>
          {articlesList.map((article, i) => (
            <GridItem key={i} rowSpan={i === 0 ? 2 : 1} height={i === 0 ? [380, 380, 450] : [200, 200, 'auto']}>
              <Box
                style={{
                  backgroundSize: 'cover',
                  borderRadius: 24,
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 59.36%), url(${article.cover || 'https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'})`,
                }}
                height="100%"
                px={{ base: '6', md: '8', lg: '12' }}
                py="12"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
              >
                <Heading fontSize={['xs', 'sm']} color="white" fontWeight="700">{article.category}</Heading>
                <Heading size={['sm', 'md']} color="white" fontWeight="700" lineHeight="120%" mt={1}>
                  {article.title}
                </Heading>
                <Button
                  onClick={() => navigate(`${ROUTES.artikel()}/baca/${article.id}`)}
                  mt={4}
                  py="1.5"
                  px="3"
                  fontWeight="semibold"
                  bg="gray.100"
                  color="gray.800"
                  alignSelf="flex-start"
                  size="sm"
                >
                  Baca Artikel
                </Button>
              </Box>
            </GridItem>
          ))}

        </Grid>
      </Container>
    </Box>
  );
}
