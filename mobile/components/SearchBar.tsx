/**
 * Search Bar Component
 */

import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Keyboard,
  Platform,
} from 'react-native';
import { useTheme } from '../theme';
import { Icon } from './Icon';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: (text: string) => void;
  onScanPress: () => void;
  onVoicePress?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  testID?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  onScanPress,
  onVoicePress,
  placeholder = 'Search parts...',
  autoFocus = false,
  testID,
}) => {
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const debouncedSearch = useDebounce((text: string) => {
    if (text.length >= 2) {
      onSearch(text);
    }
  }, 300);

  const handleChangeText = useCallback((text: string) => {
    onChangeText(text);
    debouncedSearch(text);
  }, [onChangeText, debouncedSearch]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focusAnim]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focusAnim]);

  const handleClear = useCallback(() => {
    onChangeText('');
    inputRef.current?.focus();
  }, [onChangeText]);

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.primary],
  });

  return (
    <View style={styles.container} testID={testID}>
      <Animated.View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.backgroundSecondary,
            borderColor,
          },
        ]}
      >
        <Icon name="search" size={20} color={colors.textSecondary} />
        
        <TextInput
          ref={inputRef}
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          autoFocus={autoFocus}
          returnKeyType="search"
          onSubmitEditing={() => onSearch(value)}
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Search input"
          testID={`${testID}-input`}
        />

        {value.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Clear search"
          >
            <Icon name="x-circle" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}

        {onVoicePress && (
          <TouchableOpacity
            onPress={onVoicePress}
            style={styles.iconButton}
            accessibilityLabel="Voice search"
          >
            <Icon name="mic" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </Animated.View>

      <TouchableOpacity
        style={[styles.scanButton, { backgroundColor: colors.primary }]}
        onPress={onScanPress}
        accessibilityLabel="Scan barcode"
        accessibilityHint="Opens camera to scan part barcode"
        testID={`${testID}-scan`}
      >
        <Icon name="camera" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  iconButton: {
    padding: 4,
  },
  scanButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
