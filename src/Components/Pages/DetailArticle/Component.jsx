import React from 'react';
import {
  Box, Center, Container, Divider, Heading, Image, Text,
} from '@chakra-ui/react';
import Elements from '../../Elements';

export default function Component() {
  return (
    <Container maxW="7xl">
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box flex={1} py="10">
          <Text size="lg">Phinisi Update</Text>
          <Heading size="xl" mb="6">Phinisi : Kapal Kayu Legendaris</Heading>
          <Center>
            <Image width={460} height={460} borderRadius={16} src="https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" />
          </Center>
          <Text size="sm" mt="6">
            Sesuatu menakjubkan dapat dilakukan dengan menikmati keindahan alam.
            Tidak hanya mendapatkan kenikmatan semata tetapi juga menawarkan pengalaman
            unik yang membawa untuk menyelami sejarah sang kapal legendaris dari
            Bulukumba, Sulawesi selatan, kapal Phinisi.
          </Text>
          <Box display="flex" gap={3} color="blackAlpha.600" mt="6">
            <Text fontSize="xs">22 Maret 2023</Text>
            <Text fontSize="xs">2349 Character</Text>
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
