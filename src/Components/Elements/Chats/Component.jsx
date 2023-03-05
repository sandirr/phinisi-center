import React, { useEffect, useState } from 'react';
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
import {
  collection, onSnapshot, query, orderBy, where, getDoc,
} from 'firebase/firestore';
import { auth, firestore } from '../../../Configs/firebase';
import { ChatOffIcon } from '../../../Assets/icons/icons';

export default function Component() {
  const [unread, setUnread] = useState(0);
  const [allChats, setChats] = useState([]);

  const getChat = () => {
    const chatsref = query(collection(firestore, '/chats'), where('uid', '==', auth.currentUser?.uid), orderBy('lastChatTime', 'desc'));
    onSnapshot(chatsref, async (querySnapshot) => {
      const chats = [];
      let neverRead = 0;
      querySnapshot.forEach((snap) => {
        // const dateChatRef = ref(database, `chats/${snap.id}`);
        // push(dateChatRef, {
        //   from: 'test',
        //   content: 'test',
        //   time: new Date().toISOString(),
        // });
        const data = snap.data();
        if (!data.hasRead) {
          neverRead += 1;
        }
        chats.push({ ...data, id: snap.id });
      });

      const chatsWithVendor = await Promise.all(chats.map(async (chat) => {
        if (chat.vendor) {
          const detailVendorSnap = await getDoc(chat.vendor);
          return {
            ...chat,
            detailVendor: detailVendorSnap.data(),
          };
        }
        return chat;
      }));

      setUnread(neverRead);
      setChats(chatsWithVendor);
    });
  };

  useEffect(() => {
    getChat();
  }, []);

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
            <Box key={chat.id}>
              <Flex gap="2" p="10px" justifyContent="flex-start" bgColor={chat.hasRead ? 'none' : 'blue.100'} borderRadius={4}>
                <Avatar h="8" w="8" />
                <Box textAlign="left">
                  <Heading size="xs">{chat.detailVendor?.name}</Heading>
                  <Text fontSize="xs">{chat.lastChatContent}</Text>
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
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
