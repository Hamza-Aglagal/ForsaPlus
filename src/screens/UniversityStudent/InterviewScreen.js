import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight, lineHeight } from '../../theme/typography';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

// Sample data for interview history
const INTERVIEW_HISTORY = [
  {
    id: '1',
    position: "Développeur Full Stack",
    date: "2023-06-15T15:00:00",
    duration: "35 min",
    score: 85,
    feedback: "Excellente communication, bonnes connaissances techniques. À améliorer: connaissance des frameworks récents."
  },
  {
    id: '2',
    position: "Ingénieur DevOps",
    date: "2023-06-10T11:00:00",
    duration: "28 min",
    score: 72,
    feedback: "Bonnes bases techniques, mais manque de précision sur les processus CI/CD. Confiance en soi à renforcer."
  },
  {
    id: '3',
    position: "UX/UI Designer",
    date: "2023-05-25T14:30:00",
    duration: "40 min",
    score: 90,
    feedback: "Excellent portfolio, très bonne présentation des projets. Connaissance approfondie des principes UX."
  }
];

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: 'long'
  });
  const formattedTime = date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit'
  });
  return { formattedDate, formattedTime };
};

// Score color
const getScoreColor = (score) => {
  if (score >= 85) return colors.success;
  if (score >= 70) return colors.universityStudent;
  if (score >= 50) return colors.warning;
  return colors.error;
};

const InterviewScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate average score
  const averageScore = INTERVIEW_HISTORY.reduce((sum, interview) => sum + interview.score, 0) / INTERVIEW_HISTORY.length;
  
  // Statistics data
  const stats = {
    totalInterviews: INTERVIEW_HISTORY.length,
    averageScore: averageScore.toFixed(0),
    bestScore: Math.max(...INTERVIEW_HISTORY.map(item => item.score)),
    totalDuration: INTERVIEW_HISTORY.reduce((sum, interview) => {
      const durationMinutes = parseInt(interview.duration.split(' ')[0]);
      return sum + durationMinutes;
    }, 0)
  };
  
  // Interview history item component
  const InterviewHistoryItem = ({ item }) => {
    const { formattedDate, formattedTime } = formatDate(item.date);
    
    return (
      <View style={styles.historyItem}>
        <View style={styles.historyHeader}>
          <View style={styles.historyPosition}>
            <Text style={styles.positionName}>{item.position}</Text>
            <Text style={styles.dateText}>{formattedDate} à {formattedTime}</Text>
          </View>
          <View style={[styles.scoreContainer, { backgroundColor: `${getScoreColor(item.score)}10` }]}>
            <Text style={[styles.scoreText, { color: getScoreColor(item.score) }]}>{item.score}%</Text>
          </View>
        </View>
        
        <View style={styles.historyInfo}>
          <View style={styles.infoItem}>
            <Icon name="clock-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.infoText}>{item.duration}</Text>
          </View>
        </View>
        
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>Feedback AI :</Text>
          <Text style={styles.feedbackText}>{item.feedback}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.historyButton}
          onPress={() => {}}
        >
          <Text style={styles.historyButtonText}>Revoir l'entretien</Text>
          <Icon name="arrow-right" size={14} color={colors.universityStudent} />
        </TouchableOpacity>
      </View>
    );
  };
  
  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <View style={styles.overviewContainer}>
            {/* AI Interview Card */}
            <TouchableOpacity 
              style={styles.aiInterviewCard}
              onPress={() => {}}
            >
              <LinearGradient
                colors={[colors.universityGradient.primary[0], colors.universityGradient.primary[1]]}
                style={styles.aiCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.aiCardContent}>
                  <View style={styles.aiIconContainer}>
                    <Icon name="video" size={30} color="#fff" />
                  </View>
                  <View style={styles.aiTextContainer}>
                    <Text style={styles.aiCardTitle}>Entretien vidéo avec AI</Text>
                    <Text style={styles.aiCardSubtitle}>Pratiquez et améliorez vos compétences</Text>
                  </View>
                </View>
                <View style={styles.aiCardButton}>
                  <Text style={styles.aiButtonText}>Démarrer</Text>
                  <View style={styles.arrowContainer}>
                    <Icon name="arrow-right" size={16} color="#fff" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            {/* Global Statistics */}
            <View style={styles.globalStatsContainer}>
              <LinearGradient
                colors={[colors.universityGradient.blue[0], colors.universityGradient.blue[1]]}
                style={styles.globalStatsGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.statRow}>
                  <View style={styles.globalStatItem}>
                    <Text style={styles.globalStatValue}>{stats.averageScore}%</Text>
                    <Text style={styles.globalStatLabel}>Score moyen</Text>
                  </View>
                  
                  <View style={styles.globalStatItem}>
                    <Text style={styles.globalStatValue}>{stats.bestScore}%</Text>
                    <Text style={styles.globalStatLabel}>Meilleur score</Text>
                  </View>
                  
                  <View style={styles.globalStatItem}>
                    <Text style={styles.globalStatValue}>{stats.totalInterviews}</Text>
                    <Text style={styles.globalStatLabel}>Entretiens</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
            
            {/* Recent interviews */}
            <View style={styles.recentSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Entretiens récents</Text>
                <TouchableOpacity onPress={() => setActiveTab('history')}>
                  <Text style={styles.seeAllText}>Voir tout</Text>
                </TouchableOpacity>
              </View>
              
              {INTERVIEW_HISTORY.slice(0, 2).map(item => (
                <InterviewHistoryItem key={item.id} item={item} />
              ))}
            </View>
            
            {/* Tips section */}
            <View style={styles.tipsContainer}>
              <View style={styles.tipHeader}>
                <Icon name="lightbulb-outline" size={24} color={colors.warning} />
                <Text style={styles.tipTitle}>Conseils pour réussir</Text>
              </View>
              <Text style={styles.tipText}>Préparez-vous en amont, recherchez l'entreprise, entraînez-vous aux questions courantes, et montrez votre motivation.</Text>
            </View>
          </View>
        );
        
      case 'history':
        return (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Historique des entretiens</Text>
            {INTERVIEW_HISTORY.map(item => (
              <InterviewHistoryItem key={item.id} item={item} />
            ))}
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Entretiens AI</Text>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'overview' && styles.activeTabText
            ]}
          >
            Aperçu
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'history' && styles.activeTabText
            ]}
          >
            Historique
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderTabContent()}
      </ScrollView>
      
      {/* Floating Action Button for new interview */}
      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Icon name="video-plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  tab: {
    paddingVertical: 15,
    marginRight: 25,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.universityStudent,
  },
  tabText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.universityStudent,
    fontWeight: fontWeight.bold,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  
  // Overview Tab Styles
  overviewContainer: {
    padding: 20,
  },
  aiInterviewCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  aiCardGradient: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  aiCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  aiIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  aiTextContainer: {
    flex: 1,
  },
  aiCardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: 5,
  },
  aiCardSubtitle: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  aiCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    borderRadius: 10,
  },
  aiButtonText: {
    color: colors.white,
    fontWeight: fontWeight.bold,
    marginRight: 8,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Global Stats Styles
  globalStatsContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  globalStatsGradient: {
    padding: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  globalStatItem: {
    alignItems: 'center',
  },
  globalStatValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: 5,
  },
  globalStatLabel: {
    fontSize: fontSize.xs,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: fontWeight.medium,
  },
  
  recentSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: fontSize.sm,
    color: colors.universityStudent,
    fontWeight: fontWeight.medium,
  },
  historyItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyPosition: {
    flex: 1,
  },
  positionName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  dateText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  scoreContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  historyInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  infoText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 5,
  },
  feedbackContainer: {
    marginBottom: 12,
  },
  feedbackLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: lineHeight.md,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    marginTop: 5,
  },
  historyButtonText: {
    fontSize: fontSize.sm,
    color: colors.universityStudent,
    fontWeight: fontWeight.medium,
    marginRight: 5,
  },
  tipsContainer: {
    backgroundColor: '#FFF8E1', // Light yellow background
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginLeft: 10,
  },
  tipText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: lineHeight.md,
  },
  
  // History Tab Styles
  historyContainer: {
    padding: 20,
  },
  historyTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  
  // FAB
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.universityStudent,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});

export default InterviewScreen; 