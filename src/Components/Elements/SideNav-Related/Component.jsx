import React from 'react';
import {
  Box, Heading, Image, Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Component() {
  return (
    <Box mt="8">
      <Heading size="xs">Artikel Terkait</Heading>
      <Box mt="4" as={Link} to="/" display="flex" justifyContent="space-between" alignItems="center" gap={4}>
        <Box>
          <Text size="sm">Fun Fact</Text>
          <Heading noOfLines={2} mt="1" size="md">Phinisi : Kapal Kayu Legendaris</Heading>
        </Box>
        <Image width={100} height={100} borderRadius={16} src="https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" />
      </Box>
      <Box mt="4" as={Link} to="/" display="flex" justifyContent="space-between" alignItems="center" gap={4}>
        <Box>
          <Text size="sm">Fun Fact</Text>
          <Heading noOfLines={2} mt="1" size="md">Phinisi : Kapal Kayu Legendaris</Heading>
        </Box>
        <Image width={100} height={100} borderRadius={16} src="https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" />
      </Box>
    </Box>
  );
}
