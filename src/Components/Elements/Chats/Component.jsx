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
import { Link, useNavigate } from 'react-router-dom';
import { ChatOffIcon } from '../../../Assets/icons/icons';
import ROUTES from '../../../Configs/routes';
import { useChat } from '../../../CustomHooks';

export default function Component() {
  const navigate = useNavigate();
  const { unread, allChats } = useChat();

  const renderBadge = () => (
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
      {unread}
    </Badge>
  );

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Box cursor="pointer" bg="transparent" border="none" color="blue.600" position="relative" mt="3">
          <EmailOutlined color="inherit" />
          {!!unread && renderBadge()}
        </Box>
      </PopoverTrigger>
      <PopoverContent
        alignItems="flex-start"
        w="sm"
        h="350px"
        position="relative"
        _focusVisible={{
          outline: 'none',
          boxShadow: 'none',
        }}
      >
        <PopoverArrow />
        <PopoverHeader textAlign="left" width="full">
          <Flex color="blue.600" gap="2">
            <EmailOutlined color="inherit" />
            <Text size="sm" fontWeight="700">
              Pesan (
              {unread}
              )
            </Text>
          </Flex>
        </PopoverHeader>
        <PopoverBody textAlign="left" w="full" overflow="auto">
          {allChats.map((chat) => (
            <Box
              w="full"
              key={chat.id}
              cursor="pointer"
              onClick={() => navigate(`${ROUTES.chat()}?chatId=${chat.id}`)}
            >
              <Flex gap="2" p="10px" justifyContent="flex-start" bgColor={chat.hasRead ? 'none' : 'blue.100'} borderRadius={4}>
                <Avatar h="8" w="8" referrerPolicy="no-referrer" src={chat.detailVendor?.cover} />
                <Box textAlign="left">
                  <Heading size="xs">{chat.detailVendor?.name}</Heading>
                  <Text fontSize="xs" noOfLines={1}>{chat.lastChatContent}</Text>
                </Box>
              </Flex>
              <Divider />
            </Box>
          ))}

          {!allChats.length
          && (
          <Flex flexDirection="column" alignItems="center" justifyContent="center" mt="4">
            <ChatOffIcon width="150px" height="150px" />
            <Box mt="2.5">
              <Text>Tidak Ada Pesan</Text>
            </Box>
          </Flex>
          )}

          <Box
            position="absolute"
            bottom={0}
            right={1}
            left={1}
            textAlign="right"
            px={2}
            py={1}
            borderTop="1px solid #f5f5f5"
          >
            <Text
              as={Link}
              to={ROUTES.chat()}
              fontSize={['xs']}
              fontWeight="700"
              color="blue.600"
            >
              Lihat semua pesan
            </Text>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
