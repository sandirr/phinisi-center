import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Component() {
  return (
    <Box mt="8">
      <Heading size="xs">Artikel Populer</Heading>
      <Box mt="4" as={Link} to="/" display="block">
        <Text size="sm">Fun Fact</Text>
        <Heading noOfLines={2} mt="1" size="md">Phinisi : Kapal Kayu Legendaris</Heading>
      </Box>
      <Box mt="4" as={Link} to="/" display="block">
        <Text size="sm">Phinisi Update</Text>
        <Heading noOfLines={2} mt="1" size="md">Phinisi Menjadi Warisan Budaya UNESCO</Heading>
      </Box>
    </Box>
  );
}
