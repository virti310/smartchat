import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, IMessage, Bubble } from 'react-native-gifted-chat';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const apiKey = "AIzaSyAhtaJKOtHWgjBOmkE27ItF_kRiMmL6r6w";

const genAI = new GoogleGenerativeAI(apiKey);

// System prompt giving Cyber Security context
const SYSTEM_PROMPT = `You are a world-class expert AI assistant specializing in cybersecurity. 
Your goal is to provide accurate, clear, and actionable advice on cyber threats, protecting personal information, and best practices in information security. 
Maintain a professional, helpful, and concise tone.`;

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: SYSTEM_PROMPT,
});

export default function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! I am your Cyber Information Assistant. How can I help you secure your digital life today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'CyberBot',
          avatar: 'https://ui-avatars.com/api/?name=Cyber+Bot&background=0D1117&color=00FF41',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    const userMessage = newMessages[0].text;
    handleGeminiResponse(userMessage, newMessages[0].createdAt);
  }, []);

  const handleGeminiResponse = async (prompt: string, userMessageTime: Date | number) => {
    setIsTyping(true);
    try {
      if (!apiKey) {
        throw new Error("API Key is missing. Please add your Gemini API key.");
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const botMessage: IMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'CyberBot',
          avatar: 'https://ui-avatars.com/api/?name=Cyber+Bot&background=0D1117&color=00FF41',
        },
      };

      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    } catch (error: any) {
      console.error(error);
      const errorMessage: IMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: `Sorry, I encountered an error: ${error.message}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'System Error',
          avatar: 'https://ui-avatars.com/api/?name=Error&background=0D1117&color=FF0000',
        },
      };
      setMessages(previousMessages => GiftedChat.append(previousMessages, [errorMessage]));
    } finally {
      setIsTyping(false);
    }
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#00FF41', // Matrix green for user
          },
          left: {
            backgroundColor: '#1E232E', // Dark grey for bot
          },
        }}
        textStyle={{
          right: {
            color: '#0D1117', // Dark text on green background
            fontWeight: '600'
          },
          left: {
            color: '#E6EDF3', // Light text for bot
          },
        }}
      />
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
        <KeyboardAvoidingView
          style={styles.keyContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <GiftedChat
            messages={messages}
            onSend={msgs => onSend(msgs)}
            user={{
              _id: 1,
            }}
            isTyping={isTyping}
            renderBubble={renderBubble}
            textInputProps={{ placeholder: "Ask about cybersecurity..." }}
            renderAvatar={() => null}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  keyContainer: {
    flex: 1,
  }
});
