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
import Images from '../../../Configs/images';

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
      <Elements.Loading loading={loading} />
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box flex={1} py={['4', '6', '8', '10']}>
          {!!article.category
          && <Text size="lg" onClick={() => navigate(`${ROUTES.artikel()}?tab=${article.category}`)} cursor="pointer">{article.category}</Text>}
          <Heading size={['md', 'lg', 'xl']} mb={['3', '4', '5', '6']}>{article.title}</Heading>
          <Center>
            <Image width={460} borderRadius={16} src={article.cover || Images.Order1} />
          </Center>
          <Box mt={['3', '4', '5', '6']} dangerouslySetInnerHTML={{ __html: article.content }} />
          <Box display="flex" gap={3} color="blackAlpha.600" mt="6">
            <Text fontSize="xs">{moment(article.createdAt).startOf('minute').fromNow()}</Text>
            <Text fontSize="xs">
              {generateArticleDesc(article.content).length}
              {' '}
              Characters
            </Text>
          </Box>
        </Box>

        <Box display={{ base: 'none', md: 'inherit' }} mx={['6', '8', '10']}>
          <Center height="full">
            <Divider orientation="vertical" />
          </Center>
        </Box>

        <Box py="10" w={{ md: 'sm', base: 'xl' }}>
          <Heading size={['md', 'lg']}>Hi, temukan Artikel Menarik disini !</Heading>
          <Elements.SideNavPopular />
          <Divider mt={6} />
          {!!article.category
          && (
            <Elements.SideNavRelated category={article.category} />
          )}
        </Box>
      </Box>
    </Container>
  );
}
