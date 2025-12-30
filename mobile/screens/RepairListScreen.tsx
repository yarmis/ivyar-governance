/**
 * Repair List Screen
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useRepairs } from '../hooks/useRepairs';
import { useTheme } from '../theme';
import {
  FilterBar,
  RepairCard,
  EmptyState,
  FAB,
  SegmentedControl,
} from '../components';
import { Repair, RepairStatus } from '../types';

const STATUS_TABS: RepairStatus[] = ['active', 'waiting', 'completed'];

export const RepairListScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState<RepairStatus>('active');
  const [filters, setFilters] = useState({});

  const { data, isLoading, refetch, isFetching } = useRepairs({
    status: selectedTab,
    ...filters,
  });

  const handleRepairPress = useCallback((repair: Repair) => {
    navigation.navigate('RepairDetails', { repairId: repair.id });
  }, [navigation]);

  const handleNewRepair = useCallback(() => {
    navigation.navigate('NewRepair');
  }, [navigation]);

  const renderItem = useCallback(({ item }: { item: Repair }) => (
    <RepairCard
      repair={item}
      onPress={handleRepairPress}
      testID={`repair-card-${item.id}`}
    />
  ), [handleRepairPress]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    
    return (
      <EmptyState
        icon="wrench"
        title={t(`repairs.no_${selectedTab}`)}
        description={t('repairs.no_repairs_desc')}
      />
    );
  }, [isLoading, selectedTab, t]);

  const tabOptions = useMemo(() => STATUS_TABS.map(status => ({
    value: status,
    label: t(`repairs.status.${status}`),
    count: data?.summary?.[status] || 0,
  })), [data?.summary, t]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SegmentedControl
        options={tabOptions}
        selected={selectedTab}
        onChange={setSelectedTab}
        testID="repair-tabs"
      />

      <FilterBar
        filters={filters}
        onChange={setFilters}
        filterOptions={['level', 'priority', 'workshop']}
        testID="repair-filters"
      />

      <FlatList
        data={data?.repairs || []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        testID="repair-list"
      />

      <FAB
        icon="plus"
        onPress={handleNewRepair}
        accessibilityLabel={t('repairs.new_repair')}
        testID="new-repair-fab"
      />
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

export default RepairListScreen;
