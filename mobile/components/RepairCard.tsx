/**
 * Repair Card Component
 */

import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme';
import { Repair } from '../types';
import { StatusBadge } from './StatusBadge';
import { PriorityIndicator } from './PriorityIndicator';
import { ProgressBar } from './ProgressBar';

interface RepairCardProps {
  repair: Repair;
  onPress: (repair: Repair) => void;
  testID?: string;
}

export const RepairCard: React.FC<RepairCardProps> = memo(({
  repair,
  onPress,
  testID,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() => onPress(repair)}
      activeOpacity={0.7}
      accessibilityRole="button"
      testID={testID}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.ticketInfo}>
          <Text style={[styles.ticketNumber, { color: colors.primary }]}>
            {repair.ticket_number}
          </Text>
          <Text style={[styles.vehicleId, { color: colors.textSecondary }]}>
            {repair.vehicle_id}
          </Text>
        </View>
        
        <View style={styles.badges}>
          <StatusBadge status={repair.status} />
          <PriorityIndicator priority={repair.priority} />
        </View>
      </View>

      {/* Issue */}
      <Text style={[styles.issue, { color: colors.text }]} numberOfLines={2}>
        {repair.issue}
      </Text>

      {/* Meta Row */}
      <View style={styles.metaRow}>
        <View style={[styles.levelBadge, { backgroundColor: getLevelColor(repair.level) }]}>
          <Text style={styles.levelText}>{repair.level}</Text>
        </View>
        
        <Text style={[styles.workshop, { color: colors.textSecondary }]}>
          {repair.workshop}
        </Text>
      </View>

      {/* Progress (if active) */}
      {repair.status === 'active' && (
        <View style={styles.progressContainer}>
          <ProgressBar progress={repair.progress} />
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            {repair.progress}%
          </Text>
        </View>
      )}

      {/* ETA (if available) */}
      {repair.estimated_completion && repair.status !== 'completed' && (
        <Text style={[styles.eta, { color: colors.textSecondary }]}>
          ETA: {formatDate(repair.estimated_completion)}
        </Text>
      )}
    </TouchableOpacity>
  );
});

function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    R1: '#22c55e',
    R2: '#3b82f6',
    R3: '#f59e0b',
    R4: '#ef4444',
  };
  return colors[level] || '#6b7280';
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ticketInfo: {
    flex: 1,
  },
  ticketNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  vehicleId: {
    fontSize: 13,
    marginTop: 2,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  issue: {
    fontSize: 14,
    marginTop: 12,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  workshop: {
    fontSize: 13,
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    width: 35,
  },
  eta: {
    fontSize: 12,
    marginTop: 8,
  },
});

RepairCard.displayName = 'RepairCard';

export default RepairCard;
