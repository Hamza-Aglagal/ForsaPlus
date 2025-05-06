import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { authService } from '../../services/api';

const NewsCard = ({ title, date, source, image, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.newsCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.newsImageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.newsImage} />
        ) : (
          <View style={styles.newsImagePlaceholder}>
            <Icon name="newspaper-variant-outline" size={30} color={colors.student} />
          </View>
        )}
      </View>
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle} numberOfLines={2}>{title}</Text>
        <View style={styles.newsMetaContainer}>
          <Text style={styles.newsDate}>{date}</Text>
          <Text style={styles.newsSource}>{source}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SuggestionCard = ({ name, type, match, location, image, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.suggestionCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.suggestionImageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.suggestionImage} />
        ) : (
          <View style={styles.suggestionImagePlaceholder}>
            <Icon name="school" size={40} color={colors.student} />
          </View>
        )}
        {match && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>{match}% match</Text>
          </View>
        )}
      </View>
      <View style={styles.suggestionInfo}>
        <Text style={styles.suggestionName} numberOfLines={1}>{name}</Text>
        <Text style={styles.suggestionType} numberOfLines={1}>
          <Icon name="school-outline" size={14} color={colors.textSecondary} /> {type}
        </Text>
        <Text style={styles.suggestionLocation} numberOfLines={1}>
          <Icon name="map-marker" size={14} color={colors.textSecondary} /> {location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const KeyDateCard = ({ title, date, icon, color, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.keyDateCard, { borderLeftColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.keyDateIconContainer, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <View style={styles.keyDateContent}>
        <Text style={styles.keyDateTitle}>{title}</Text>
        <Text style={styles.keyDateDate}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    avatar: null,
    interests: [],
    bacType: '',
    bacYear: '',
    bacMention: ''
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await authService.getStoredUser();
        if (userData) {
          setUser({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            avatar: userData.profileImage || null,
            interests: userData.interests || [],
            bacType: userData.bacType || '',
            bacYear: userData.bacYear || '',
            bacMention: userData.bacMention || ''
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const keyDates = [
    {
      id: '1',
      title: 'Date limite d inscription ENCG',
      date: '15 Juillet 2024',
      icon: 'calendar-clock',
      color: colors.warning
    },
    {
      id: '2',
      title: 'Concours des grandes écoles',
      date: '20 Juillet 2024',
      icon: 'pencil-box-outline',
      color: colors.error
    },
    {
      id: '3',
      title: 'Début des inscriptions universitaires',
      date: '1 Août 2024',
      icon: 'school',
      color: colors.student
    }
  ];

  const newsItems = [
    {
      id: '1',
      title: 'Les inscriptions à la faculté de médecine sont désormais ouvertes',
      date: 'Aujourd hui',
      source: 'Ministère de l Éducation',
      image: null
    },
    {
      id: '2',
      title: 'Salon de l étudiant: Découvrez les meilleures écoles du pays',
      date: 'Hier',
      source: 'ForsaPlus',
      image: null
    },
    {
      id: '3',
      title: 'Nouvelles filières en intelligence artificielle disponibles',
      date: '2 jours',
      source: 'ENSIAS',
      image: null
    }
  ];

  const schoolSuggestions = [
    {
      id: '1',
      name: 'École Mohammadia d Ingénieurs',
      type: 'École d ingénieur',
      match: 95,
      location: 'Rabat',
      image: null
    },
    {
      id: '2',
      name: 'ENSIAS',
      type: 'École d ingénieur Informatique',
      match: 92,
      location: 'Rabat',
      image: null
    },
    {
      id: '3',
      name: 'ENCG Casablanca',
      type: 'École de commerce',
      match: 87,
      location: 'Casablanca',
      image: null
    },
    {
      id: '4',
      name: 'Faculté des Sciences',
      type: 'université',
      match: 85,
      location: 'Rabat',
      image: null
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Welcome */}
        <View style={styles.header}>
          <LinearGradient
            colors={colors.studentGradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientHeader}
          >
            <View style={styles.headerContent}>
              <View style={styles.welcomeSection}>
                <View>
                  <Text style={styles.welcomeText}>Bienvenue,</Text>
                  <Text style={styles.userName}>{user.firstName} !</Text>
                  <View style={styles.userBacInfo}>
                    <Icon name="school" size={16} color={colors.white} style={{ marginRight: 4 }} />
                    <Text style={styles.bacInfo}>{user.bacType} | {user.bacMention}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.avatarContainer}>
                  {user.avatar ? (
                    <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarText}>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <View style={styles.statIconContainer}>
                    <Icon name="magnify" size={18} color={colors.student} />
                  </View>
                  <View>
                    <Text style={styles.statValue}>24</Text>
                    <Text style={styles.statLabel}>Écoles vues</Text>
                  </View>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <View style={styles.statIconContainer}>
                    <Icon name="heart" size={18} color={colors.student} />
                  </View>
                  <View>
                    <Text style={styles.statValue}>8</Text>
                    <Text style={styles.statLabel}>Favoris</Text>
                  </View>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <View style={styles.statIconContainer}>
                    <Icon name="file-document" size={18} color={colors.student} />
                  </View>
                  <View>
                    <Text style={styles.statValue}>3</Text>
                    <Text style={styles.statLabel}>Candidatures</Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Key Dates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dates Clés</Text>
            <TouchableOpacity onPress={() => navigation.navigate('KeyDates')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.keyDatesContainer}>
            {keyDates.map(date => (
              <KeyDateCard 
                key={date.id}
                title={date.title}
                date={date.date}
                icon={date.icon}
                color={date.color}
                onPress={() => navigation.navigate('KeyDates')}
              />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Orientation', { screen: 'OrientationTest' })}
          >
            <LinearGradient
              colors={colors.studentGradient.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quickActionIcon}
            >
              <Icon name="compass-outline" size={24} color={colors.white} />
            </LinearGradient>
            <Text style={styles.quickActionText}>Test d'orientation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Schools', { screen: 'AllSchools' })}
          >
            <LinearGradient
              colors={colors.studentGradient.secondary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quickActionIcon}
            >
              <Icon name="school-outline" size={24} color={colors.white} />
            </LinearGradient>
            <Text style={styles.quickActionText}>Explorer les écoles</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('KeyDates')}
          >
            <LinearGradient
              colors={colors.studentGradient.teal}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.quickActionIcon}
            >
              <Icon name="calendar-check" size={24} color={colors.white} />
            </LinearGradient>
            <Text style={styles.quickActionText}>Calendrier admissions</Text>
          </TouchableOpacity>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Écoles recommandées pour vous</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Schools', { screen: 'AllSchools' })}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recommendationsDescription}>
            <Icon name="information" size={18} color={colors.student} style={{ marginRight: 8 }} />
            <Text style={styles.recommendationsText}>
              Basé sur votre profil {user.bacType} et vos intérêts
            </Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.suggestionsContainer}
          >
            {schoolSuggestions.map(school => (
              <SuggestionCard 
                key={school.id}
                name={school.name}
                type={school.type}
                match={school.match}
                location={school.location}
                image={school.image}
                onPress={() => navigation.navigate('Schools', { 
                  screen: 'SchoolDetail',
                  params: { schoolId: school.id }
                })}
              />
            ))}
          </ScrollView>
        </View>

        {/* News */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Actualités</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllNews')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.newsContainer}>
            {newsItems.map(news => (
              <NewsCard 
                key={news.id}
                title={news.title}
                date={news.date}
                source={news.source}
                image={news.image}
                onPress={() => navigation.navigate('NewsDetail', { newsId: news.id })}
              />
            ))}
          </View>
        </View>

        {/* Timeline Progress */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Votre parcours d'orientation</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Orientation', { screen: 'ParcourTimeline' })}>
              <Text style={styles.seeAllText}>Détails</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.timelineContainer}>
            <LinearGradient
              colors={['rgba(94, 96, 206, 0.1)', 'rgba(94, 96, 206, 0.05)']}
              style={styles.timelineGradient}
            >
              <View style={styles.timelineProgressBar}>
                <View style={styles.timelineCompleted} />
                <View style={styles.timelineDot}>
                  <View style={styles.innerDot} />
                </View>
              </View>
              
              <View style={styles.timelineContent}>
                <View style={styles.timelineStep}>
                  <Text style={styles.timelineStepTitle}>Profil complété</Text>
                  <Text style={[styles.timelineStepStatus, { color: colors.success }]}>Terminé</Text>
                </View>
                
                <View style={styles.timelineStep}>
                  <Text style={styles.timelineStepTitle}>Test d'orientation</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Orientation', { screen: 'OrientationTest' })}>
                    <Text style={[styles.timelineStepStatus, { color: colors.warning }]}>En cours</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.timelineStep}>
                  <Text style={styles.timelineStepTitle}>Sélection des écoles</Text>
                  <Text style={[styles.timelineStepStatus, { color: colors.textTertiary }]}>À venir</Text>
                </View>
                
                <View style={styles.timelineStep}>
                  <Text style={styles.timelineStepTitle}>Candidatures</Text>
                  <Text style={[styles.timelineStepStatus, { color: colors.textTertiary }]}>À venir</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Support Section */}
        <TouchableOpacity 
          style={styles.supportCard}
          onPress={() => {/* Handle support action */}}
        >
          <LinearGradient
            colors={colors.studentGradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.supportGradient}
          >
            <View style={styles.supportContent}>
              <View>
                <Text style={styles.supportTitle}>Besoin d'aide pour votre orientation ?</Text>
                <Text style={styles.supportDescription}>
                  Consultez nos conseillers pour un accompagnement personnalisé
                </Text>
              </View>
              <View style={styles.supportButton}>
                <Text style={styles.supportButtonText}>Contacter</Text>
                <Icon name="chevron-right" size={20} color={colors.white} />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: spacing.lg,
  },
  gradientHeader: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  headerContent: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  welcomeText: {
    fontSize: fontSize.md,
    color: colors.white,
    opacity: 0.9,
  },
  userName: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  userBacInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bacInfo: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
  },
  avatarContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarImage: {
    height: '100%',
    width: '100%',
  },
  avatarPlaceholder: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 7,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.student + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: colors.gray200,
    marginHorizontal: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.student,
  },
  keyDatesContainer: {
    paddingHorizontal: spacing.xl,
  },
  keyDateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
  },
  keyDateIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  keyDateContent: {
    flex: 1,
  },
  keyDateTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  keyDateDate: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  quickActionButton: {
    alignItems: 'center',
    width: '30%',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  quickActionText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  recommendationsDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: colors.student + '10',
    paddingVertical: spacing.sm,
    borderRadius: 10,
  },
  recommendationsText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  suggestionsContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.sm,
  },
  suggestionCard: {
    width: 170,
    backgroundColor: colors.white,
    borderRadius: 18,
    marginRight: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  suggestionImageContainer: {
    height: 100,
    position: 'relative',
  },
  suggestionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  suggestionImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.student + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.student,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 10,
  },
  matchText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
  },
  suggestionInfo: {
    padding: spacing.md,
  },
  suggestionName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  suggestionType: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  suggestionLocation: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  newsContainer: {
    paddingHorizontal: spacing.xl,
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 18,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  newsImageContainer: {
    width: 80,
    height: 80,
  },
  newsImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newsImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.student + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsContent: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  newsTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  newsMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsDate: {
    fontSize: fontSize.xs,
    color: colors.student,
  },
  newsSource: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  timelineContainer: {
    marginHorizontal: spacing.xl,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timelineGradient: {
    borderRadius: 18,
    padding: spacing.md,
  },
  timelineProgressBar: {
    position: 'absolute',
    left: spacing.md + 12, // Adjust based on the dot size
    top: spacing.md,
    bottom: spacing.md,
    width: 2,
    backgroundColor: colors.gray200,
  },
  timelineCompleted: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '30%', // Adjust based on progress
    backgroundColor: colors.student,
  },
  timelineDot: {
    position: 'absolute',
    top: '30%', // Should match the timelineCompleted height
    left: -5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.student,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.student,
  },
  timelineContent: {
    marginLeft: 30,
  },
  timelineStep: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  timelineStepTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  timelineStepStatus: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  supportCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  supportGradient: {
    padding: spacing.lg,
  },
  supportContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  supportTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  supportDescription: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
    maxWidth: '80%',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 25,
  },
  supportButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
    marginRight: spacing.xs,
  }
});

export default HomeScreen; 