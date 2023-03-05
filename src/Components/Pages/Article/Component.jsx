import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Link, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import Elements from '../../Elements';
import { callFunc } from '../../../Configs/firebase';
import { generateArticleDesc } from '../../../Utils/text';
import Images from '../../../Configs/images';

export default function Component() {
  const tabs = useMemo(() => ['Semua', 'Fun Fact', 'Event', 'Phinisi Update']);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [articlesList, setArticlesList] = useState([]);
  const [meta, setMeta] = useState({
    activePage: 1,
    totalPage: 1,
    total: 1,
  });
  const [loading, setLoading] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const activeTab = searchQuery.get('tab') || 'Semua';
  const search = searchQuery.get('search') || '';

  const getArticles = async () => {
    const callable = callFunc('getArticles');

    setLoading(true);
    await callable({
      page: meta.activePage, limit: 8, type: 'Artikel', category: activeTab === tabs[0] ? '' : activeTab, search,
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
          index: index + 1,
          createdAt: moment(item.createdAt).startOf('minute').fromNow(),
          generatedContent: `${generateArticleDesc(item.content)}`,
        }));
        setArticlesList([...articlesList, ...normalizeData]);
        setMeta({
          activePage,
          totalPage,
          total,
        });
        setHasMoreItems(activePage < totalPage);
      })
      .catch(() => {
        // console.log('anjing', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    setMeta((prev) => ({
      ...prev,
      activePage: prev.activePage + 1,
    }));
  };

  const handleChangeTab = (index) => {
    setArticlesList([]);
    setSearchQuery({ tab: tabs[index] });
    setMeta({
      ...meta,
      activePage: 1,
    });
  };

  useEffect(() => {
    const firstLoad = meta.activePage === 1 && !articlesList.length;
    if (firstLoad || hasMoreItems) {
      getArticles();
    }
  }, [meta.activePage, activeTab, search]);

  useEffect(() => {
    if (search) {
      setArticlesList([]);
      setMeta((prev) => ({
        ...prev,
        activePage: 1,
      }));
    }
  }, [search]);

  const renderLoading = () => [1, 2, 3].map((i) => (
    <Box mt={['3', '4', '6', '8']} pr={4} key={i}>
      <Flex justify="space-between" gap={['2', '4', '6', '8', '10']}>
        <Stack direction="column" w="full" gap="4px">
          <Skeleton w="full" height="20px" />
          <Skeleton w="full" height="12px" mt={2} />
          <Skeleton w="full" height="12px" />
          <Skeleton w="full" height="12px" />
        </Stack>
        <Skeleton width="120px" height="120px" borderRadius="12px" />
      </Flex>
      <Skeleton w={['70%', '50%']} height="8px" />
      <Divider mt={['1', '2', '3']} />
    </Box>
  ));

  const renderArticles = () => {
    if (!loading && !articlesList.length) {
      return 'No data...';
    }
    if (articlesList.length) {
      return articlesList.map(((article, idx) => (
        <Box key={idx}>
          <Box
            mt={['3', '4', '6', '8']}
            display="flex"
            justifyContent="space-between"
            gap={['2', '4', '6', '8', '10']}
            pr={4}
            as={Link}
            to={`baca/${article.id}`}
          >
            <Box>
              <Heading size={['xs', 'sm', 'md']}>{article.title}</Heading>
              <Text noOfLines={4} fontSize={['xs', 'sm', 'md']} mt="2">
                {article.generatedContent}
              </Text>
            </Box>
            <Image
              alt="cover"
              width={120}
              height={120}
              objectFit="cover"
              borderRadius="12"
              src={article.cover || Images.Order1}
            />
          </Box>
          <Box display="flex" gap={3} color="blackAlpha.600" mt="2">
            <Text fontSize="xs">{article.createdAt}</Text>
            <Text fontSize="xs">
              {article.generatedContent?.length}
              {' '}
              Characters
            </Text>
          </Box>
          <Divider mt={['1', '2', '3']} />
        </Box>
      )));
    }
    return null;
  };

  return (
    <Container maxW="7xl">
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box flex={1} py={['4', '6', '8', '10']}>
          <Tabs variant="soft-rounded" index={tabs.indexOf(activeTab)} onChange={handleChangeTab}>
            <TabList whiteSpace="nowrap" lineHeight="20px">
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  fontWeight="medium"
                  _selected={{
                    bg: '#C3D5F6',
                    color: '#163F8D',
                    fontWeight: 'semibold',
                  }}
                  fontSize="14px"
                  py="0.5"
                  px="4"
                >
                  {tab}
                </Tab>
              ))}
            </TabList>
          </Tabs>
          <Divider mb={['2', '4', '6']} mt="2" />
          <Box>
            <InfiniteScroll
              dataLength={articlesList.length}
              hasMore={hasMoreItems}
              next={handleLoadMore}
              loader={renderLoading()}
            >
              {renderArticles()}
            </InfiniteScroll>
            {loading && renderLoading()}
          </Box>
        </Box>

        <Box display={['none', 'none', 'inherit']} mx={['6', '8', '10']}>
          <Center height="full">
            <Divider orientation="vertical" />
          </Center>
        </Box>

        <Box py={['6', '8', '10']} maxW="md">
          <Heading size={['md', 'lg']}>Hi, temukan Artikel Menarik disini !</Heading>
          <Elements.SideNavPopular />
        </Box>
      </Box>
    </Container>
  );
}
