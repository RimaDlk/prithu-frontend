import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient"; // ✅ correct gradient import
interface ReferralData {
  totalRewards: number;
  availableBalance: number;
  redeemedBalance: number;
  friendsSignedUp: number;
  friendsInvested: number;
}

interface TierInfo {
  tier: number;
  description: string;
  userReward: number;
  friendReward: number;
  isActive: boolean;
  isCompleted: boolean;
}

interface Referral {
  id: string;
  name: string;
  status: 'Signed Up' | 'Invested';
  initials: string;
}

const ReferralDashboard: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedTier, setSelectedTier] = useState<number | null>(1);

  const referralData: ReferralData = {
    totalRewards: 15000,
    availableBalance: 14000,
    redeemedBalance: 1000,
    friendsSignedUp: 2,
    friendsInvested: 0,
  };

  const tiers: TierInfo[] = [
    {
      tier: 1,
      description: 'for first 2 referrals',
      userReward: 400,
      friendReward: 400,
      isActive: true,
      isCompleted: false,
    },
    {
      tier: 2,
      description: 'for next 3 referrals',
      userReward: 600,
      friendReward: 600,
      isActive: false,
      isCompleted: false,
    },
    {
      tier: 3,
      description: 'for next 5 referrals',
      userReward: 800,
      friendReward: 800,
      isActive: false,
      isCompleted: false,
    },
  ];

  const referrals: Referral[] = [
    {
      id: '1',
      name: 'Jagdev Soni',
      status: 'Signed Up',
      initials: 'JS',
    },
  ];

  const tabs = ['All', 'Signed Up', 'Invested'];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>  Referral Dashboard</Text>
        </View>

        <View style={styles.content}>
          {/* Rewards Summary Card */}
          <View style={styles.card}>
            <View style={styles.rewardsSummary}>
              <Text style={styles.summaryLabel}>Total Rewards Earned</Text>
              <Text style={styles.summaryAmount}>
                ₹{referralData.totalRewards.toLocaleString()}
              </Text>
            </View>

            <View style={styles.balanceRow}>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>Available balance</Text>
                <Text style={styles.balanceAmount}>
                  ₹{referralData.availableBalance.toLocaleString()}
                </Text>
              </View>
              <View style={styles.balanceItem}>
                <Text style={styles.balanceLabel}>Redeemed balance</Text>
                <Text style={styles.balanceAmount}>
                  ₹{referralData.redeemedBalance.toLocaleString()}
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <LinearGradient
                colors={['yellow', 'green']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.redeemButton}
              >
                <Text style={styles.redeemButtonText}>Redeem Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Friends Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total friends who signed up</Text>
              <Text style={styles.statNumber}>
                {referralData.friendsSignedUp.toString().padStart(2, '0')}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total friends who invested</Text>
              <Text style={styles.statNumber}>
                {referralData.friendsInvested.toString().padStart(2, '0')}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.nudgeButton}>
              <Text style={styles.nudgeButtonText}>Nudge All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.referButton}>
              <Text style={styles.referButtonText}>Refer more friends</Text>
            </TouchableOpacity>
          </View>

          {/* Tier System */}
          <LinearGradient
            colors={['yellow', 'green']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tierContainer}
          >
            {/* You're here indicator */}
            <View style={styles.youreHereContainer}>
              <View style={styles.youreHereBadge}>
                <Text style={styles.youreHereText}>★ You're here</Text>
              </View>
            </View>

            {/* Tier progression */}
            <View style={styles.tierProgression}>
              {tiers.map((tier) => (
                <TouchableOpacity
                  key={tier.tier}
                  style={styles.tierItem}
                  onPress={() => setSelectedTier(selectedTier === tier.tier ? null : tier.tier)}
                >
                  <View
                    style={[
                      styles.tierCircle,
                      tier.isActive && styles.tierCircleActive,
                      tier.isCompleted && styles.tierCircleCompleted,
                    ]}
                  >
                    {tier.tier === 1 ? (
                      <Text
                        style={[
                          styles.tierCircleText,
                          tier.isActive && styles.tierCircleTextActive,
                          tier.isCompleted && styles.tierCircleTextCompleted,
                        ]}
                      >
                        {tier.isCompleted ? '✓' : tier.tier}
                      </Text>
                    ) : (
                      <Ionicons
                        name="lock-closed"
                        size={16}
                        color={tier.isActive ? '#92400e' : tier.isCompleted ? '#ffffff' : '#ffffff'}
                      />
                    )}
                  </View>
                  <Text style={styles.tierLabel}>Tier {tier.tier}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Progress line */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBackground} />
              <View style={styles.progressFill} />
            </View>

            {/* Tier message */}
            <View style={styles.tierMessage}>
              <Text style={styles.tierMessageText}>
                Refer your 1 more friend to earn 2X Reward Amount
              </Text>
            </View>

            {/* Tier Details */}
            {selectedTier && (
              <View style={styles.tierDetails}>
                <View style={styles.tierDetailsHeader}>
                  <Text style={styles.tierDetailsTitle}>Tier {selectedTier}</Text>
                  <Text style={styles.tierDetailsDescription}>
                    {tiers.find((t) => t.tier === selectedTier)?.description}
                  </Text>
                </View>
                <View style={styles.tierRewards}>
                  <View style={styles.rewardItem}>
                    <Text style={styles.rewardText}>
                      You get ₹{tiers.find((t) => t.tier === selectedTier)?.userReward}
                    </Text>
                  </View>
                  <Text style={styles.plusText}>+</Text>
                  <View style={styles.rewardItem}>
                    <Text style={styles.rewardText}>
                      Friends get ₹{tiers.find((t) => t.tier === selectedTier)?.friendReward}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </LinearGradient>

          {/* My Referrals */}
          <View style={styles.referralsSection}>
            <Text style={styles.referralsTitle}>My Referrals</Text>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setSelectedTab(tab)}
                  style={[styles.tab, selectedTab === tab && styles.tabActive]}
                >
                  <Text
                    style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Referrals List */}
            <View style={styles.referralsList}>
              {referrals.map((referral) => (
                <View key={referral.id} style={styles.referralCard}>
                  <View style={styles.referralInfo}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{referral.initials}</Text>
                    </View>
                    <Text style={styles.referralName}>{referral.name}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      referral.status === 'Signed Up'
                        ? styles.statusBadgeSignedUp
                        : styles.statusBadgeInvested,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        referral.status === 'Signed Up'
                          ? styles.statusTextSignedUp
                          : styles.statusTextInvested,
                      ]}
                    >
                      {referral.status}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    padding: 16,
    flexDirection: 'column',
    gap: 24,
  },
  card: {
    backgroundColor: '#cdd8cbff',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  rewardsSummary: {
    alignItems: 'center',
    marginBottom: 24,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 16,
  },
  balanceItem: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  redeemButton: {
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  redeemButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nudgeButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  nudgeButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  referButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  referButtonText: {
    fontSize: 14,
    color: 'green',
    fontWeight: '500',
  },
  tierContainer: {
    borderRadius: 8,
    padding: 24,
  },
  youreHereContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  youreHereBadge: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  youreHereText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#92400e',
  },
  tierProgression: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  tierItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tierCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6b7280',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  tierCircleActive: {
    backgroundColor: '#ffffff',
  },
  tierCircleCompleted: {
    backgroundColor: '#10b981',
  },
  tierCircleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tierCircleTextActive: {
    color: '#92400e',
  },
  tierCircleTextCompleted: {
    color: '#ffffff',
  },
  tierLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
  },
  progressContainer: {
    position: 'relative',
    height: 2,
    marginBottom: 24,
  },
  progressBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#6b7280',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '33%',
    height: 2,
    backgroundColor: '#ffffff',
  },
  tierMessage: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tierMessageText: {
    fontSize: 14,
    color: '#ffffff',
  },
  tierDetails: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 8,
    padding: 16,
  },
  tierDetailsHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  tierDetailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  tierDetailsDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tierRewards: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  rewardItem: {
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  plusText: {
    fontSize: 16,
    color: '#ffffff',
  },
  referralsSection: {
    marginTop: 24,
  },
  referralsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#111827',
  },
  referralsList: {
    flexDirection: 'column',
    gap: 12,
  },
  referralCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  referralInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  referralName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  statusBadge: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  statusBadgeSignedUp: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  statusBadgeInvested: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusTextSignedUp: {
    color: '#3b82f6',
  },
  statusTextInvested: {
    color: '#10b981',
  },
});

export default ReferralDashboard;