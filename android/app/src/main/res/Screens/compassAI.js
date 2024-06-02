import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CompassAIScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [chatMode, setChatMode] = useState(null); // null, 'data', or 'cloud'

  const handleSend = async () => {

    if (inputText.trim()) {
      const newMessage = { text: inputText, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Send message to backend
      const response = await fetch('https://frozen-reaches-78866-065338a00b00.herokuapp.com/api/compassAi/general-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText, mode: chatMode }),
      });
      const result = await response.json();
      const aiMessage = { text: result.reply, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  if (chatMode === null) {
    return (
      <View style={styles.choiceContainer}>
        <Text style={styles.title}>Choose Chat Mode</Text>
        <TouchableOpacity style={styles.choiceButton} onPress={() => setChatMode('data')}>
          <Text style={styles.choiceText}>Chat about my data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choiceButton} onPress={() => setChatMode('cloud')}>
          <Text style={styles.choiceText}>Ask cloud-related questions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleSend} style={styles.sendButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  choiceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  choiceButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  choiceText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  chatList: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6200EE',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    color: '#021D46',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#E0F7FA',
    borderRadius: '10px'
  },
});

export default CompassAIScreen;
