/**
 * Part Card Component
 * Displays part summary in search results and lists
 */

import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  AccessibilityInfo,
} from 'react-native';
import { useTheme } from '../theme';
import { Part } from '../types';
import { SafetyBadge } from './SafetyBadge';
import { RepairLevelBadges } from './RepairLevelBadges';

interface PartCardProps {
  part: Part;
  onPress: (part: Part) => void;
  showAnalogBadge?: boolean;
  confidence?: number;
  testID?: string;
}

export const PartCard: React.FC<PartCardProps> = memo(({
  part,
  onPress,
  showAnalogBadge,
  confidence,
  testID,
}) => {
  const { colors, spacing } = useTheme();

  const accessibilityLabel = `${part.brand} ${part.part_number}. ${part.description}. ${
    part.safety_critical ? 'Safety critical part.' : ''
  }`;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() => onPress(part)}
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityHint="Double tap to view part details"
      testID={testID}
    >
      {/* Part Image */}
      <View style={styles.imageContainer}>
        {part.image_url ? (
          <Image
            source={{ uri: part.image_url }}
            style={styles.image}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: colors.border }]}>
            <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
              No Image
            </Text>
          </View>
        )}
        
        {/* Analog Confidence Badge */}
        {showAnalogBadge && confidence !== undefined && (
          <View style={[styles.confidenceBadge, { backgroundColor: getConfidenceColor(confidence) }]}>
            <Text style={styles.confidenceText}>
              {Math.round(confidence * 100)}%
            </Text>
          </View>
        )}
      </View>

      {/* Part Info */}
      <View style={styles.infoContainer}>
        <Text style={[styles.partNumber, { color: colors.primary }]} numberOfLines={1}>
          {part.part_number}
        </Text>
        
        <Text style={[styles.brand, { color: colors.textSecondary }]} numberOfLines={1}>
          {part.brand}
        </Text>
        
        <Text style={[styles.description, { color: colors.text }]} numberOfLines={2}>
          {part.description}
        </Text>

        {/* Tags Row */}
        <View style={styles.tagsRow}>
          <View style={[styles.categoryTag, { backgroundColor: colors.backgroundSecondary }]}>
            <Text style={[styles.categoryText, { color: colors.textSecondary }]}>
              {part.category}
            </Text>
          </View>
          
          {part.safety_critical && <SafetyBadge />}
        </View>

        {/* Repair Level Coverage */}
        {part.repair_coverage && (
          <RepairLevelBadges coverage={part.repair_coverage} />
        )}
      </View>

      {/* Chevron */}
      <View style={styles.chevronContainer}>
        <Text style={[styles.chevron, { color: colors.border }]}>›</Text>
      </View>
    </TouchableOpacity>
  );
});

function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.9) return '#22c55e';
  if (confidence >= 0.75) return '#eab308';
  return '#f97316';
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    textAlign: 'center',
  },
  confidenceBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  partNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  brand: {
    fontSize: 13,
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    lineHeight: 18,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '500',
  },
  chevronContainer: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
  },
});

PartCard.displayName = 'PartCard';

export default PartCard;
