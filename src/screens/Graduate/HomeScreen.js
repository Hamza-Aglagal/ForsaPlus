import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import { authService } from '../../services/api';

const { width } = Dimensions.get('window');

const jobsData = [
  {
    id: '1',
    title: 'Développeur Full Stack',
    company: 'TechMaroc',
    location: 'Casablanca',
    type: 'CDI',
    salary: '15k-25k MAD',
    logo: 'https://randomuser.me/api/portraits/men/1.jpg',
    posted: '2 heures',
    matched: 92,
  },
  {
    id: '2',
    title: 'Chef de Projet IT',
    company: 'Consulting Group',
    location: 'Rabat',
    type: 'CDI',
    salary: '20k-30k MAD',
    logo: 'https://randomuser.me/api/portraits/women/2.jpg',
    posted: '5 heures',
    matched: 87,
  },
  {
    id: '3',
    title: 'Analyste Marketing Digital',
    company: 'MarketingPro',
    location: 'Tanger',
    type: 'CDD',
    salary: '12k-18k MAD',
    logo: 'https://randomuser.me/api/portraits/men/3.jpg',
    posted: '1 jour',
    matched: 78,
  },
];

const eventsData = [
  {
    id: '1',
    title: 'Forum Emploi Tech',
    date: '15 Mai 2023',
    location: 'Technopark Casablanca',
    image: 'https://picsum.photos/id/26/200/200',
  },
  {
    id: '2',
    title: 'Workshop LinkedIn et Personal Branding',
    date: '22 Mai 2023',
    location: 'En ligne',
    image: 'https://picsum.photos/id/25/200/200',
  },
];

const articleData = [
  {
    id: '1',
    title: 'Comment réussir un entretien à distance',
    category: 'Conseils',
    image: 'https://picsum.photos/id/28/200/200',
    duration: '8 min de lecture',
  },
  {
    id: '2',
    title: 'Tendances du marché de l\'emploi au Maroc en 2023',
    category: 'Tendances',
    image: 'https://picsum.photos/id/29/200/200',
    duration: '12 min de lecture',
  },
];

// Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
      <Icon name={icon} size={24} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

// Job Card Component
const JobCard = ({ job, onPress }) => (
  <TouchableOpacity style={styles.jobCard} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.jobHeader}>
      <Image source={{ uri: job.logo }} style={styles.companyLogo} />
      <View style={styles.jobTitleContainer}>
        <Text style={styles.jobTitle} numberOfLines={1}>{job.title}</Text>
        <Text style={styles.companyName}>{job.company}</Text>
      </View>
      <View style={styles.matchContainer}>
        <Text style={styles.matchLabel}>Match</Text>
        <Text style={styles.matchValue}>{job.matched}%</Text>
      </View>
    </View>
    
    <View style={styles.jobDetails}>
      <View style={styles.jobDetailItem}>
        <Icon name="map-marker" size={14} color={colors.textSecondary} />
        <Text style={styles.jobDetailText}>{job.location}</Text>
      </View>
      <View style={styles.jobDetailItem}>
        <Icon name="briefcase-outline" size={14} color={colors.textSecondary} />
        <Text style={styles.jobDetailText}>{job.type}</Text>
      </View>
      <View style={styles.jobDetailItem}>
        <Icon name="currency-usd" size={14} color={colors.textSecondary} />
        <Text style={styles.jobDetailText}>{job.salary}</Text>
      </View>
    </View>
    
    <View style={styles.jobFooter}>
      <Text style={styles.postedText}>Posté il y a {job.posted}</Text>
      <TouchableOpacity style={styles.saveButton}>
        <Icon name="bookmark-outline" size={18} color={colors.graduate} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

// Event Card Component
const EventCard = ({ event, onPress }) => (
  <TouchableOpacity style={styles.eventCard} onPress={onPress} activeOpacity={0.8}>
    <Image source={{ uri: event.image }} style={styles.eventImage} />
    <View style={styles.eventContent}>
      <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
      <View style={styles.eventDetail}>
        <Icon name="calendar" size={14} color={colors.textSecondary} />
        <Text style={styles.eventDetailText}>{event.date}</Text>
      </View>
      <View style={styles.eventDetail}>
        <Icon name="map-marker" size={14} color={colors.textSecondary} />
        <Text style={styles.eventDetailText}>{event.location}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Article Card Component
const ArticleCard = ({ article, onPress }) => (
  <TouchableOpacity style={styles.articleCard} onPress={onPress} activeOpacity={0.8}>
    <Image source={{ uri: article.image }} style={styles.articleImage} />
    <View style={styles.articleContent}>
      <View style={styles.articleCategoryContainer}>
        <Text style={styles.articleCategory}>{article.category}</Text>
      </View>
      <Text style={styles.articleTitle} numberOfLines={2}>{article.title}</Text>
      <View style={styles.articleFooter}>
        <Text style={styles.articleDuration}>{article.duration}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Main Component
const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await authService.getStoredUser();
        if (userData) {
          setUser({
            firstName: userData.firstName || '',
            lastName: userData.lastName || ''
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleJobPress = (job) => {
    navigation.navigate('JobDetail', { job });
  };
  
  const handleNetworkingPress = () => {
    navigation.navigate('Networking');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.graduate} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <LinearGradient
          colors={[colors.graduate, '#1E8E7E']}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={[styles.greeting, { color: colors.white }]}>Bonjour, {user.firstName} 👋</Text>
              <Text style={[styles.subtitle, { color: 'rgba(255, 255, 255, 0.9)' }]}>Découvrez de nouvelles opportunités</Text>
            </View>
            <TouchableOpacity style={[styles.notificationButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
              <Icon name="bell-outline" size={22} color={colors.white} />
            </TouchableOpacity>
          </View>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchBar} activeOpacity={0.8}>
              <Icon name="magnify" size={20} color={colors.textSecondary} />
              <Text style={styles.searchPlaceholder}>Rechercher un emploi ou une entreprise</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
              <Icon name="filter-variant" size={22} color={colors.white} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <StatCard 
            icon="eye-outline" 
            title="Vues CV" 
            value="28" 
            color={colors.graduate} 
          />
          <StatCard 
            icon="file-find-outline" 
            title="Recherches" 
            value="12" 
            color="#4A6FFF" 
          />
          <StatCard 
            icon="bookmark-check-outline" 
            title="Enregistrés" 
            value="5" 
            color="#FF7A5A" 
          />
        </View>
        
        {/* Jobs Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Emplois recommandés</Text>
            <TouchableOpacity onPress={() => navigation.setActiveTab('Jobs')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          {jobsData.map((job) => (
            <JobCard key={job.id} job={job} onPress={() => handleJobPress(job)} />
          ))}
        </View>
        
        {/* Networking Banner */}
        <TouchableOpacity 
          style={styles.networkingBanner}
          activeOpacity={0.9}
          onPress={handleNetworkingPress}
        >
          <LinearGradient
            colors={[colors.graduate, '#1E8E7E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.networkingGradient}
          >
            <View style={styles.networkingContent}>
              <View>
                <Text style={styles.networkingTitle}>Développez votre réseau</Text>
                <Text style={styles.networkingDescription}>
                  Connectez-vous avec des professionnels de votre secteur
                </Text>
              </View>
              <View style={styles.networkingIconContainer}>
                <Icon name="account-group" size={40} color="white" />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        
        {/* Upcoming Events */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Événements à venir</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {eventsData.map((event) => (
              <EventCard key={event.id} event={event} onPress={() => {}} />
            ))}
          </ScrollView>
        </View>
        
        {/* Articles Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Articles & Conseils</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {articleData.map((article) => (
              <ArticleCard key={article.id} article={article} onPress={() => {}} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    padding: spacing.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.tertiary,
    borderWidth: 1,
    borderColor: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    flex: 1,
    marginRight: spacing.sm,
  },
  searchPlaceholder: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  statCard: {
    width: (width - spacing.lg * 2 - spacing.md * 2) / 3,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.sm,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  statTitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: fontSize.sm,
    color: colors.graduate,
    fontWeight: fontWeight.medium,
  },
  jobCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: spacing.sm,
  },
  jobTitleContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  companyName: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  matchContainer: {
    alignItems: 'center',
  },
  matchLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  matchValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.graduate,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDetailText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  postedText: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
  },
  saveButton: {
    padding: 4,
  },
  networkingBanner: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.graduate,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  networkingGradient: {
    borderRadius: 16,
    padding: spacing.md,
  },
  networkingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  networkingTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: 4,
  },
  networkingDescription: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '80%',
  },
  networkingIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalScrollContent: {
    paddingRight: spacing.lg,
  },
  eventCard: {
    width: 220,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginRight: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: spacing.sm,
  },
  eventTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  eventDetailText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  articleCard: {
    width: 180,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginRight: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  articleImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  articleContent: {
    padding: spacing.sm,
  },
  articleCategoryContainer: {
    backgroundColor: colors.graduate + '15',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  articleCategory: {
    fontSize: 10,
    color: colors.graduate,
    fontWeight: fontWeight.medium,
  },
  articleTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  articleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  articleDuration: {
    fontSize: 10,
    color: colors.textTertiary,
  },
});

export default HomeScreen; 