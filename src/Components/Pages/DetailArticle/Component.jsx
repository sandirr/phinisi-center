import React, { useEffect, useState } from 'react';
import {
  Box, Center, Container, Divider, Heading, Image, Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Elements from '../../Elements';
import { callFunc } from '../../../Configs/firebase';
import { generateArticleDesc } from '../../../Utils/text';
import ROUTES from '../../../Configs/routes';

export default function Component() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState({});

  const getArticle = async () => {
    const callable = callFunc('getArticle');

    setLoading(true);
    await callable(id).then((res) => {
      setArticle(res.data);
    }).catch(() => {
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (id) {
      getArticle();
    }
  }, [id]);
  return (
    <Container maxW="7xl">
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box flex={1} py="10">
          {loading && 'Loading...'}
          <Text size="lg" onClick={() => navigate(`${ROUTES.artikel()}?tab=${article.category}`)} cursor="pointer">{article.category}</Text>
          <Heading size="xl" mb="6">{article.title}</Heading>
          <Center>
            <Image width={460} height={460} borderRadius={16} src={article.cover || 'https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'} />
          </Center>
          <Box mt="6" dangerouslySetInnerHTML={{ __html: article.content }} />
          <Box display="flex" gap={3} color="blackAlpha.600" mt="6">
            <Text fontSize="xs">{moment(article.createdAt).startOf('minute').fromNow()}</Text>
            <Text fontSize="xs">
              {generateArticleDesc(article.content).length}
              {' '}
              Characters
            </Text>
          </Box>
        </Box>

        <Box display={{ base: 'none', md: 'inherit' }} mx="10">
          <Center height="full">
            <Divider orientation="vertical" />
          </Center>
        </Box>

        <Box py="10" w={{ md: 'sm', base: 'xl' }}>
          <Heading size="lg">Hi, temukan Artikel Menarik disini !</Heading>
          <Elements.SideNavPopular />
          <Divider mt={6} />
          <Elements.SideNavRelated />
        </Box>
      </Box>
    </Container>
  );
}
