/**
 * AI Advisor Chat Screen
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAIAdvisor } from '../hooks/useAIAdvisor';
import { useTheme } from '../theme';
import {
  ChatMessage,
  ChatInput,
  SuggestedActions,
  LoadingIndicator,
} from '../components';
import { Message } from '../types';

export const AIAdvisorScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const flatListRef = useRef<FlatList>(null);

  const [inputText, setInputText] = useState('');
  
  const {
    messages,
    isLoading,
    sendMessage,
    suggestedActions,
    handleAction,
  } = useAIAdvisor();

  const handleSend = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;
    
    const text = inputText;
    setInputText('');
    await sendMessage(text);
  }, [inputText, isLoading, sendMessage]);

  const handleVoiceInput = useCallback(async (transcript: string) => {
    await sendMessage(transcript);
  }, [sendMessage]);

  const scrollToBottom = useCallback(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const renderMessage = useCallback(({ item }: { item: Message }) => (
    <ChatMessage
      message={item}
      testID={`chat-message-${item.id}`}
    />
  ), []);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={scrollToBottom}
        testID="chat-messages"
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <LoadingIndicator size="small" />
        </View>
      )}

      {suggestedActions.length > 0 && !isLoading && (
        <SuggestedActions
          actions={suggestedActions}
          onPress={handleAction}
          testID="suggested-actions"
        />
      )}

      <ChatInput
        value={inputText}
        onChangeText={setInputText}
        onSend={handleSend}
        onVoiceInput={handleVoiceInput}
        placeholder={t('ai.input_placeholder')}
        disabled={isLoading}
        testID="chat-input"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loadingContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
});

export default AIAdvisorScreen;
