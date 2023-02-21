/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Box, Heading, Text, useMediaQuery,
} from '@chakra-ui/react';
import SwiperCore, {
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import ROUTES from '../../../Configs/routes';
import { callFunc } from '../../../Configs/firebase';
import { generateArticleDesc } from '../../../Utils/text';
import Images from '../../../Configs/images';

export default function Component() {
  SwiperCore.use([Autoplay]);
  const navigate = useNavigate();
  const [articlesList, setArticlesList] = useState([]);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isPad] = useMediaQuery('(max-width: 960px)');

  const getArticles = async () => {
    const callable = callFunc('getArticles');

    await callable({
      page: 1, limit: 10, type: 'Proses Pembuatan',
    })
      .then((res) => {
        const {
          data,
        } = res.data;
        const normalizeData = data.map((item, index) => ({
          ...item,
          index: index + 1,
          createdAt: moment(item.createdAt).startOf('minute').fromNow(),
          generatedContent: `${generateArticleDesc(item.content, 50)}...`,
        }));
        setArticlesList(normalizeData);
      })
      .catch(() => {
        // console.log('err', err);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <Box bg="blue.50" py={6}>
      <Heading color="blackAlpha.900" size={['md', 'lg']} ml={2.5} textAlign="center" mb={4}>Proses Pembuatan Phinisi</Heading>
      <Swiper
        // spaceBetween={isMobile ? 12 : isPad ? 18 : 24}
        slidesPerView={isMobile ? 2.5 : isPad ? 3.5 : 5.5}
        className="proses-pembuatan"
        // centeredSlides
        // loop
      >
        {articlesList.sort((a, b) => b.index - a.index).map((article) => (
          <SwiperSlide key={article.id}>
            <Box
              onClick={() => navigate(`${ROUTES.artikel()}/baca/${article.id}`)}
              py={[4, 5, 6]}
              mx={['4px', '6px', '8px', '10px']}
              px={[2, 3, 4]}
              mb={1}
              bg="white"
              h="full"
              borderRadius={16}
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
            >
              <img
                src={article.cover || Images.Order2}
                alt="proses phinisi"
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
              <Heading mt="4" size={['xs', 'sm', 'md']} fontWeight="700" noOfLines={2}>{article.title}</Heading>
              <Text fontSize={['x-small', 'xs', 'sm', 'md']} mt={[2, 4]} lineHeight="150%" noOfLines={2}>
                {article.generatedContent}
              </Text>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
