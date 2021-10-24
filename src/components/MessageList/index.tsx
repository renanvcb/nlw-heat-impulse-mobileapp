import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { io } from 'socket.io-client';

import { api } from '../../services/api';
import { Message, MessageProps } from '../Message';

let messagensQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));

socket.on('new_message', (newMessage) => {
  messagensQueue.push(newMessage);

});

import { styles } from './styles';

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function fecthMessages() {
      const messagesResponse = await api.get<MessageProps[]>('messages/recent');

      setCurrentMessages(messagesResponse.data);
    }

    fecthMessages();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagensQueue.length > 0) {
        setCurrentMessages(prevState => [
          messagensQueue[0],
          prevState[0],
          prevState[1],
        ]);
        messagensQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) =>
        <Message
          key={message.id}
          data={message}
        />
      )}
    </ScrollView>
  );
}