/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  Box,
  Container,
  Flex,
  Divider,
  Avatar,
  Heading,
  Input,
  Button,
} from '@chakra-ui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';
import { onValue, push, ref } from 'firebase/database';
import moment from 'moment';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { ChatOffIcon, SendIcon } from '../../../Assets/icons/icons';
import { auth, database, firestore } from '../../../Configs/firebase';
import Elements from '../../Elements';
import { useChat } from '../../../CustomHooks';

export function ChatContentSection({ contents }) {
  const endChat = useRef(null);

  useEffect(() => {
    endChat.current?.scroll({ top: endChat.current?.scrollHeight, behavior: 'smooth' });
    // endChat.current?.scrollIntoView({ behavior: 'smooth' });
  }, [contents]);

  return (
    <Box
      flex={1}
      h="full"
      overflow="auto"
      pb="4"
      display="flex"
      flexDirection="column"
      ref={endChat}
      className="no-scrollbar"
    >
      {contents.map((content) => {
        const myMssg = content.fromUid === auth.currentUser?.uid;
        return (
          <Box
            key={content.time}
            pt={[1, 2, 3]}
            pb={[4]}
            px={[2, 3, 4]}
            borderRadius={[8, 12, 16]}
            border="1px solid"
            mb="1"
            alignSelf={myMssg ? 'flex-end' : 'flex-start'}
            bg={myMssg ? 'gray.100' : 'white'}
            borderColor={myMssg ? 'gray.100' : 'gray.200'}
            maxW="80%"
            position="relative"
            minW="32"
            overflowWrap="break-word"
          >
            <Text overflowWrap="break-word" fontSize={['xs', 'sm']} whiteSpace="pre-line" textAlign={myMssg ? 'right' : 'left'}>
              {content.content}
            </Text>
            <Text fontSize="xx-small" position="absolute" bottom={1} right={2}>
              {moment(content.time).fromNow()}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}

export default function Component() {
  const { unread, allChats } = useChat(false);
  const [param, setParam] = useSearchParams();
  const [selectedChat, setSelectedChat] = useState({});
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [contents, setContents] = useState([]);

  const chatId = param.get('chatId');

  const getChats = () => {
    const chatRef = doc(firestore, `chats/${chatId}`);
    updateDoc(chatRef, {
      hasRead: true,
    }).then(() => {
      // realtime DB here : start (GET)
      const realtimeChatRef = ref(database, `chats/${chatId}`);
      onValue(realtimeChatRef, (snap) => {
        const contentChat = [];
        snap.forEach((chatSnap) => {
          contentChat.push(chatSnap.val());
        });
        setContents(contentChat);
      });
      // realtime DB here : end (GET)
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (chatId) {
      setLoading(true);
      setContents([]);
      getChats();
    }
  }, [chatId]);

  useEffect(() => {
    if (chatId && allChats.length) {
      setSelectedChat(allChats.filter((chat) => chat.id === chatId)[0]);
    }
  }, [chatId, allChats]);

  const sendMessage = async () => {
    if (message) {
      setSendLoading(true);
      const body = {
        lastChatTime: new Date().toISOString(),
        lastChatContent: message,
        lastChatFrom: auth.currentUser?.displayName,
        lastChatCover: auth.currentUser?.photoURL,
        hasRead: true,
        hasReadAdmin: false,
      };

      const chatRef = doc(firestore, `chats/${chatId}`);
      await updateDoc(chatRef, body).then(() => {
        const realtimeChatRef = ref(database, `chats/${chatId}`);
        push(realtimeChatRef, {
          from: auth.currentUser?.displayName,
          fromUid: auth.currentUser?.uid,
          content: message,
          time: new Date().toISOString(),
        }).then(() => {
          setMessage('');
        });
      }).finally(() => {
        setSendLoading(false);
      });
    }
  };

  return (
    <Container maxW="7xl" h="max-content">
      <Elements.Loading loading={loading} />
      <Flex gap="4" mt={['4', '5', '7', '9']} h="78vh">
        <Box
          h="full"
          boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
          borderRadius={24}
          flex={1}
          pt="2.5"
          pb="12"
          px="2"
          display={{ base: chatId ? 'none' : 'block', md: 'block' }}
          overflow="hidden"
        >
          <Flex color="blue.600" gap="2">
            <Text size="sm" fontWeight="700">
              Semua Pesan (
              {unread}
              )
            </Text>
          </Flex>
          <Divider my="2" borderWidth={1} borderColor="blackAlpha.300" />
          <Box overflow="auto" h="full">
            {allChats.map((chat) => (
              <Box key={chat.id} cursor="pointer" onClick={() => setParam({ chatId: chat.id })}>
                <Flex gap="2" p="10px" justifyContent="flex-start" borderRadius={4}>
                  <Avatar h="8" w="8" src={chat.detailVendor?.cover} referrerPolicy="no-referrer" />
                  <Box textAlign="left">
                    <Heading size="xs">{chat.detailVendor?.name}</Heading>
                    <Text fontSize="xs" noOfLines={1}>{chat.lastChatContent}</Text>
                  </Box>

                  {!chat.hasRead
                && <Box ml="auto" bg="red.600" h="2" w="2" borderRadius="full" />}
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
          </Box>
        </Box>
        <Box
          h="full"
          flex={2}
          boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
          borderRadius={24}
          py={['3', '4', '5']}
          px={['2', '3', '4']}
          overflow="hidden"
          display={{ base: chatId ? 'block' : 'none', md: 'block' }}
        >
          {!chatId
            ? <Box flex={1}>Phinisi Center</Box>
            : (
              <Flex h="full" flexDirection="column">
                <Box>
                  <Flex alignItems="center" gap={2}>
                    <ArrowBackIcon display={{ base: chatId ? 'block' : 'none', md: 'none' }} w="6" h="6" cursor="pointer" onClick={() => setParam({ chatId: '' })} />
                    <Flex gap="2" justifyContent="flex-start" borderRadius={4}>
                      <Avatar h="8" w="8" src={selectedChat.detailVendor?.cover} referrerPolicy="no-referrer" />
                      <Box textAlign="left">
                        <Heading size="xs">{selectedChat.detailVendor?.name}</Heading>
                        <Text fontSize="xs" noOfLines={1}>Phinisi Center</Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Divider my="2.5" />
                </Box>
                <ChatContentSection contents={contents} />
                <Box>
                  <Flex gap={['2', '2.5']}>
                    <Input
                      value={message}
                      onChange={({ target }) => setMessage(target.value)}
                      w="full"
                      borderRadius={16}
                      h={['30px', '36px', '42px', '48px']}
                      placeholder="Tulis Pesan"
                    />
                    <Button
                      isLoading={sendLoading}
                      onClick={sendMessage}
                      ml="2"
                      h={['30px', '36px', '42px', '48px']}
                      colorScheme="blue"
                      bg="blue.600"
                      px={['4', '5', '6']}
                      fontSize={['xs', 'sm', 'md']}
                      color="white"
                      leftIcon={(<SendIcon />)}
                      borderRadius={16}
                    >
                      Kirim
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            )}
        </Box>
      </Flex>
    </Container>
  );
}
