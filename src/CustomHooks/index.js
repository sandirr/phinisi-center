import {
  collection, getDoc, onSnapshot, orderBy, query, where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth, firestore } from '../Configs/firebase';

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function useChat(admin = false) {
  const [unread, setUnread] = useState(0);
  const [adminUnread, setAdminUnread] = useState(0);
  const [allChats, setChats] = useState([]);

  const getChat = () => {
    let chatsref = query(collection(firestore, '/chats'), where('uid', '==', auth.currentUser.uid), orderBy('lastChatTime', 'desc'));
    if (admin) {
      chatsref = query(collection(firestore, '/chats'), orderBy('lastChatTime', 'desc'));
    }
    onSnapshot(chatsref, async (querySnapshot) => {
      const chats = [];
      let neverRead = 0;
      let neverReadAdmin = 0;
      querySnapshot.forEach((snap) => {
        const data = snap.data();
        if (!data.hasRead) {
          neverRead += 1;
        }
        if (!data.hasReadAdmin) {
          neverReadAdmin += 1;
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
      setAdminUnread(neverReadAdmin);
      setChats(chatsWithVendor);
    });
  };

  useEffect(() => {
    getChat();
  }, []);

  return { unread, allChats, adminUnread };
}
