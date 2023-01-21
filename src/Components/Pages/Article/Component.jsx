import React, { useMemo } from 'react';
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
import { Link } from 'react-router-dom';
import Elements from '../../Elements';

export default function Component() {
  const tabs = useMemo(() => ['Semua', 'Fun Fact', 'Event', 'Phinisi Update']);

  return (
    <Container maxW="7xl">
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box flex={1} py="10">
          <Tabs variant="soft-rounded" defaultIndex={2}>
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

            <Box mt="8" display="flex" gap="10" pr={4} as={Link} to="baca/idarticle">
              <Box>
                <Heading size="md">Phinisi : Kapal Kayu Legendaris</Heading>
                <Text noOfLines={4} size="sm" mt="2">
                  Sesuatu menakjubkan dapat dilakukan dengan menikmati keindahan alam.
                  Tidak hanya mendapatkan kenikmatan semata tetapi juga menawarkan pengalaman
                  unik yang membawa untuk menyelami sejarah sang kapal legendaris dari bulukumba,
                  Sulawesi selatan, kapal Phinisi.
                </Text>
                <Box display="flex" gap={3} color="blackAlpha.600" mt="2">
                  <Text fontSize="xs">22 Maret 2023</Text>
                  <Text fontSize="xs">2349 Character</Text>
                </Box>
              </Box>
              <Image
                alt="cover"
                width={120}
                height={120}
                objectFit="cover"
                borderRadius="12"
                src="https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
              />
            </Box>
            <Divider mt="3" />

            <Box mt="8" display="flex" gap="10" pr={4} as={Link} to="baca/idarticle">
              <Box>
                <Heading size="md">Phinisi : Kapal Kayu Legendaris</Heading>
                <Text noOfLines={4} size="sm" mt="2">
                  Sesuatu menakjubkan dapat dilakukan dengan menikmati keindahan alam.
                  Tidak hanya mendapatkan kenikmatan semata tetapi juga menawarkan pengalaman
                  unik yang membawa untuk menyelami sejarah sang kapal legendaris dari bulukumba,
                  Sulawesi selatan, kapal Phinisi.
                </Text>
                <Box display="flex" gap={3} color="blackAlpha.600" mt="2">
                  <Text fontSize="xs">22 Maret 2023</Text>
                  <Text fontSize="xs">2349 Character</Text>
                </Box>
              </Box>
              <Image
                alt="cover"
                width={120}
                height={120}
                objectFit="cover"
                borderRadius="12"
                src="https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
              />
            </Box>
            <Divider mt="3" />

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
