/**
 * Part Search Screen
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSearchParts } from '../hooks/useSearchParts';
import { useTheme } from '../theme';
import {
  SearchBar,
  FilterBar,
  PartCard,
  EmptyState,
  LoadingOverlay,
} from '../components';
import { Part, SearchFilters } from '../types';
import { analytics } from '../services/analytics';

export const PartSearchScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useSearchParts(query, filters);

  const handleSearch = useCallback((text: string) => {
    if (text.length >= 2) {
      analytics.track('part_search', { query: text, filters });
    }
  }, [filters]);

  const handlePartPress = useCallback((part: Part) => {
    Keyboard.dismiss();
    navigation.navigate('PartDetails', { partId: part.id });
    analytics.track('part_viewed', { part_number: part.part_number });
  }, [navigation]);

  const handleScanPress = useCallback(() => {
    navigation.navigate('BarcodeScanner');
    analytics.track('barcode_scanner_opened');
  }, [navigation]);

  const handleVoicePress = useCallback(() => {
    navigation.navigate('VoiceSearch');
    analytics.track('voice_search_opened');
  }, [navigation]);

  const handleFilterChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    analytics.track('search_filters_changed', newFilters);
  }, []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const renderItem = useCallback(({ item }: { item: any }) => (
    <PartCard
      part={item.part}
      onPress={handlePartPress}
      testID={`part-card-${item.part.id}`}
    />
  ), [handlePartPress]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    
    if (query.length < 2) {
      return (
        <EmptyState
          icon="search"
          title={t('search.enter_query')}
          description={t('search.min_chars')}
        />
      );
    }

    return (
      <EmptyState
        icon="package"
        title={t('search.no_results')}
        description={t('search.try_different')}
      />
    );
  }, [isLoading, query, t]);

  const results = data?.pages.flatMap(page => page.data) || [];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSearch={handleSearch}
        onScanPress={handleScanPress}
        onVoicePress={handleVoicePress}
        placeholder={t('search.placeholder')}
        testID="search-bar"
      />

      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        testID="filter-bar"
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.part.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        keyboardShouldPersistTaps="handled"
        testID="search-results"
      />

      {isLoading && <LoadingOverlay />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
});

export default PartSearchScreen;
