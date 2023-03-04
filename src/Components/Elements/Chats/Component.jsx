import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { EmailOutlined } from '@mui/icons-material';

export default function Component() {
  const renderBadge = (val) => (
    <Badge
      bg="red.500"
      position="absolute"
      right="-2"
      top="-1"
      borderRadius="full"
      width="5"
      height="5"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      size="14px"
    >
      {val}
    </Badge>
  );

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Box cursor="pointer" bg="transparent" border="none" color="blue.600" position="relative" mt="3">
          <EmailOutlined color="inherit" />
          {renderBadge(1)}
        </Box>
      </PopoverTrigger>
      <PopoverContent alignItems="flex-start" w="sm" h="350px">
        <PopoverArrow />
        <PopoverHeader textAlign="left" width="full">
          <Flex color="blue.600" gap="2">
            <EmailOutlined color="inherit" />
            <Text size="sm" fontWeight="700">Pesan (0)</Text>
          </Flex>
        </PopoverHeader>
        <PopoverBody textAlign="left" w="full">
          <Flex gap="2" p="10px" justifyContent="flex-start">
            <Avatar h="8" w="8" />
            <Box textAlign="left">
              <Heading size="xs">Haji Awang</Heading>
              <Text fontSize="xs">Pesanan Phinisi anda sudah mencapai 90 % !</Text>
            </Box>
          </Flex>
          <Divider />
          <Flex gap="2" p="10px" justifyContent="flex-start">
            <Avatar h="8" w="8" />
            <Box textAlign="left">
              <Heading size="xs">Haji Awang</Heading>
              <Text fontSize="xs">Pesanan Phinisi anda sudah mencapai 90 % !</Text>
            </Box>
          </Flex>
          <Divider />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
