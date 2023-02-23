import React, { useEffect, useState } from 'react';
import {
  Text,
  Box,
  Heading,
  Container,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import moment from 'moment';
import Images from '../../../Configs/images';
import Elements from '../../Elements';
import { callFunc } from '../../../Configs/firebase';
import { generateArticleDesc } from '../../../Utils/text';

export default function Component() {
  const [showMore, setShowMore] = useState(false);
  const [dataToShow, setDataToShow] = useState({});
  const [articleList, setArticlesList] = useState([]);
  const [primaryArticle, setPrimaryArticle] = useState({});
  const [loading, setLoading] = useState(false);
  // const [featuredArticles, setFeaturedArticles] = useState([]);

  const getArticles = async () => {
    const callable = callFunc('getArticles');
    setLoading(true);

    await callable({
      page: 1, limit: 10, type: 'Filosofi',
    })
      .then((res) => {
        const {
          data,
        } = res.data;
        const normalizeData = data.map((item, index) => ({
          ...item,
          index: index + 1,
          createdAt: moment(item.createdAt).startOf('minute').fromNow(),
          generatedContent: `${generateArticleDesc(item.content)}...`,
        }));

        const primary = normalizeData.filter((item) => item.priority === 'Primary') || [];
        // const featured = normalizeData.filter((item) => item.priority === 'Featured') || [];
        const common = normalizeData.filter((item) => item.priority === 'Common') || [];
        if (primary.length) {
          setPrimaryArticle(primary[0]);
        }
        // if (featured.length) {
        //   setFeaturedArticles(featured);
        // }
        setArticlesList(common);
      })
      .catch(() => {
        // console.log('anjing', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  const openMore = (meta = '', data = {}) => {
    setShowMore(true);
    setDataToShow({
      content: data.content,
      title: data.title,
      category: data.alias,
      cover: data.cover,
      meta,
    });
  };

  const closeOpenMore = () => {
    setShowMore(false);
    setDataToShow({});
  };

  return (
    <Box>
      <Box
        bg={`radial-gradient(15.16% 64.64% at 48.47% 50.07%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), url(${primaryArticle.cover || Images.Hero1})`}
        h={['30vh', '45vh', '60vh', '80vh']}
        w="full"
        bgSize="cover"
        bgRepeat="no-repeat"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="5xl" textAlign="center">
          <Heading size={['lg', 'xl', '2xl', '3xl']}>Filosofi Phinisi</Heading>
          <Text fontSize={['lg', '2xl', '4xl', '6xl']} fontStyle="italic">
            &quot;
            {primaryArticle.title}
            &quot;
          </Text>
          <Text fontSize={['xx-small', 'sm', 'md', '2xl']} mt={2}>
            &quot;
            {primaryArticle.alias}
            &quot;
          </Text>
        </Container>
      </Box>

      <Container textAlign="center" maxW="6xl" py={['8', '10', '12']}>
        <Text fontSize={['md', 'lg', 'xl', '3xl']} noOfLines={5}>
          {primaryArticle.generatedContent}
        </Text>
        <Text cursor="pointer" color="blue.700" mt="4" fontSize={['md', 'lg', 'xl', '3xl']} fontWeight="400" onClick={() => openMore('Filosofi Phinisi', primaryArticle)}>Lebih lanjut &gt;</Text>
      </Container>

      <Box bg="blue.50" py={['10', '12', '14']}>
        <Container maxW="6xl" textAlign="center">
          <Heading size={['md', 'lg']}>Filosofi</Heading>
          <Heading size={['xl', '2xl', '3xl', '4xl']} mt="2">Ritual-Ritual</Heading>
          <Text fontSize={['lg', 'xl', '2xl', '3xl']} mt={['4', '6', '8']}>
            Pada proses pembuatan kapal Phinisi, punggawa beserta
            para pekerjanya melakukan beberapa ritual adat yang telah
            diwariskan sejak dahulu kala, ritual itu masih terjaga
            sampai sekarang, dan merupakan suatu kewajiban yang harus
            dilaksanakan ketika membuat phinisi.
          </Text>
        </Container>
        <Container maxW="7xl">
          <SimpleGrid mt={['8', '10', '12']} columns={[2, 3, 5]} gap={[4, 5, 6]}>
            {articleList.map((article, i) => (
              <Box
                key={i}
                borderRadius={24}
                bg="white"
                overflow="hidden"
                textAlign="center"
                pb={['10', '12', '14']}
                position="relative"
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
              >
                <Image src={article.cover || Images.Hero2} w="full" height={[160, 180, 225, 225]} objectFit="cover" />
                <Box px={2} mt={4}>
                  <Heading fontSize={['lg', 'xl', '2xl']}>
                    Ritual
                    <i style={{ display: 'block' }}>{article.title}</i>
                  </Heading>
                  <Text fontSize={['sm', 'md', 'lg']}>
                    (
                    {article.alias}
                    )
                  </Text>
                  <Box
                    position="absolute"
                    textAlign="center"
                    left={0}
                    right={0}
                    bottom={4}
                  >
                    <Text
                      cursor="pointer"
                      color="blue.700"
                      fontSize={['sm', 'md', 'lg', 'xl']}
                      mt={[4, 5, 6]}
                      onClick={() => openMore('', article)}
                    >
                      Lebih lanjut &gt;
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Elements.ContentModal
        open={!!showMore}
        data={dataToShow}
        onClose={closeOpenMore}
      />
      <Elements.Loading loading={loading} />
    </Box>
  );
}
