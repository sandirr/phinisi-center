import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Center,
  Container,
  Divider,
  Heading,
  Image,
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

  const getArticles = async () => {
    const callable = callFunc('getArticles');

    setLoading(true);
    await callable({
      page: meta.activePage, limit: 5, type: 'Artikel', category: activeTab === tabs[0] ? '' : activeTab,
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
  }, [meta.activePage, activeTab]);

  const renderArticles = () => {
    if (loading) return 'Loading...';
    if (articlesList.length) {
      return articlesList.map(((article, idx) => (
        <Box key={idx}>
          <Box mt="8" display="flex" gap="10" pr={4} as={Link} to={`baca/${article.id}`}>
            <Box>
              <Heading size="md">{article.title}</Heading>
              <Text noOfLines={4} size="sm" mt="2">
                {article.generatedContent}
              </Text>
              <Box display="flex" gap={3} color="blackAlpha.600" mt="2">
                <Text fontSize="xs">{article.createdAt}</Text>
                <Text fontSize="xs">
                  {article.generatedContent?.length}
                  {' '}
                  Characters
                </Text>
              </Box>
            </Box>
            <Image
              alt="cover"
              width={120}
              height={120}
              objectFit="cover"
              borderRadius="12"
              src={article.cover || 'https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'}
            />
          </Box>
          <Divider mt="3" />
        </Box>
      )));
    }
    return 'No data...';
  };

  return (
    <Container maxW="7xl">
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box flex={1} py="10">
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
          <Divider mb="6" mt="2" />
          <Box>
            <InfiniteScroll
              dataLength={articlesList.length}
              hasMore={hasMoreItems}
              next={handleLoadMore}
            >
              {renderArticles()}
            </InfiniteScroll>
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
        </Box>
      </Box>
    </Container>
  );
}
