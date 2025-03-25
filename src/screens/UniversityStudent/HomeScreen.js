import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  StatusBar,
  Platform,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight } from '../../theme/typography';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Quick access items
  const quickAccessItems = [
    { id: 'cv', title: 'Mon CV', icon: 'file-document-outline', color: '#4A6FFF', screen: 'CV' },
    { id: 'internships', title: 'Stages', icon: 'briefcase', color: '#FF6B6B', screen: 'Internships' },
    { id: 'schools', title: 'Écoles', icon: 'school-outline', color: '#33B679', screen: 'Schools' },
    { id: 'interviews', title: 'Entretiens', icon: 'calendar-account', color: '#8F57FF', screen: 'Interviews' },
    { id: 'orientation', title: 'Orientation', icon: 'compass', color: '#FFA000', screen: 'Orientation' },
    { id: 'questions', title: 'FAQ', icon: 'frequently-asked-questions', color: '#00BCD4', screen: 'FAQ' },
  ];

  // Sample data for recommended internships
  const recommendedInternships = [
    {
      id: 1,
      company: "SQLI",
      position: "Développeur Frontend React",
      duration: "3 mois",
      location: "Rabat",
      logo: "code-tags",
      color: "#4A6FFF",
      match: 95
    },
    {
      id: 2,
      company: "OCP Group",
      position: "Data Analyst Stagiaire",
      duration: "6 mois",
      location: "Casablanca",
      logo: "chart-box",
      color: "#FF6B6B",
      match: 89
    },
    {
      id: 3,
      company: "Maroc Telecom",
      position: "Stagiaire en Cybersécurité",
      duration: "4 mois",
      location: "Casablanca",
      logo: "shield-lock",
      color: "#33B679",
      match: 82
    }
  ];

  const navigateToScreen = (screen) => {
    // Handle navigation to different screens
    if (screen === 'CV') {
      // Navigate to CV screen
      navigation.navigate("CV");
    } else if (screen === 'Orientation') {
      // Navigate to Orientation Test screen
      navigation.navigate("OrientationTest");
    } else if (screen === 'Internships') {
      navigation.setActiveTab('Internships');
    } else if (screen === 'Schools') {
      navigation.setActiveTab('Schools');
    } else if (screen === 'Interviews') {
      navigation.setActiveTab('Interviews');
    } else {
      navigation.setActiveTab(screen);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.universityStudent}
      />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.universityStudent, '#4776E6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Bonjour, Hamza</Text>
            <Text style={styles.subGreeting}>Bon retour parmi nous!</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="account-circle" size={36} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color={colors.gray500} style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Rechercher...</Text>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.universityStudent]} />
        }
      >
        {/* Quick Access Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accès rapide</Text>
          
          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map(item => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.quickAccessItem}
                onPress={() => navigateToScreen(item.screen)}
              >
                <View style={[styles.quickAccessIcon, { backgroundColor: item.color }]}>
                  <Icon name={item.icon} size={26} color="#FFF" />
                </View>
                <Text style={styles.quickAccessText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recommended Internships */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Stages/Emplois recommandés</Text>
            <TouchableOpacity onPress={() => navigateToScreen('Internships')}>
              <Text style={styles.seeAllLink}>Tout voir</Text>
            </TouchableOpacity>
          </View>
          
          {recommendedInternships.map(internship => (
            <TouchableOpacity 
              key={internship.id} 
              style={styles.internshipCard}
              onPress={() => navigation.navigate('InternshipDetail', { internshipId: internship.id })}
            >
              <View style={[styles.internshipLogoContainer, { backgroundColor: internship.color }]}>
                <Icon name={internship.logo} size={24} color="#FFF" />
              </View>
              <View style={styles.internshipInfo}>
                <Text style={styles.companyName}>{internship.company}</Text>
                <Text style={styles.positionName}>{internship.position}</Text>
                <View style={styles.internshipMeta}>
                  <View style={styles.metaItem}>
                    <Icon name="clock-outline" size={14} color={colors.gray500} />
                    <Text style={styles.metaText}>{internship.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Icon name="map-marker" size={14} color={colors.gray500} />
                    <Text style={styles.metaText}>{internship.location}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.matchContainer}>
                <Text style={styles.matchText}>{internship.match}%</Text>
                <Text style={styles.matchLabel}>match</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Career Orientation Section */}
        <View style={styles.orientationSection}>
          <LinearGradient
            colors={['#FF8F7D', '#FF6B6B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.orientationCard}
          >
            <View style={styles.orientationContent}>
              <View>
                <Text style={styles.orientationTitle}>Test d'orientation professionnelle</Text>
                <Text style={styles.orientationDescription}>
                  Découvrez les carrières qui correspondent à vos compétences et intérêts
                </Text>
              </View>
              <View style={styles.orientationIconContainer}>
                <Icon name="compass" size={40} color="#FFFFFF" />
              </View>
            </View>
            <TouchableOpacity 
              style={styles.orientationButton} 
              onPress={() => navigation.navigate("OrientationTest")}
            >
              <Text style={styles.orientationButtonText}>Commencer</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Votre progression</Text>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '40%' }]}></View>
            </View>
            <Text style={styles.progressText}>40% complété</Text>
          </View>
          
          <View style={styles.progressItems}>
            <TouchableOpacity style={styles.progressItem}>
              <View style={styles.progressItemIconComplete}>
                <Icon name="check" size={16} color="#FFF" />
              </View>
              <Text style={styles.progressItemText}>Profil complété</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.progressItem}>
              <View style={styles.progressItemIcon}>
                <Icon name="file-document-outline" size={16} color="#FFF" />
              </View>
              <Text style={styles.progressItemText}>Créer votre CV</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.progressItem}>
              <View style={styles.progressItemIcon}>
                <Icon name="school-outline" size={16} color="#FFF" />
              </View>
              <Text style={styles.progressItemText}>Explorer les écoles</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  greeting: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  subGreeting: {
    color: colors.white,
    opacity: 0.9,
    fontSize: fontSize.md,
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: colors.gray500,
    fontSize: fontSize.md,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
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
    marginBottom: 15,
  },
  seeAllLink: {
    color: colors.universityStudent,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  quickAccessIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  quickAccessText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  internshipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  internshipLogoContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  internshipInfo: {
    flex: 1,
    paddingHorizontal: 14,
  },
  companyName: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginBottom: 4,
  },
  positionName: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: 8,
  },
  internshipMeta: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
    marginLeft: 6,
  },
  matchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  matchText: {
    color: colors.universityStudent,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  matchLabel: {
    color: colors.textSecondary,
    fontSize: fontSize.xs,
  },
  orientationSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  orientationCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  orientationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orientationTitle: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: 6,
  },
  orientationDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: fontSize.sm,
    maxWidth: '80%',
  },
  orientationIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orientationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  orientationButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  progressCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 15,
  },
  progressBarContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.universityStudent,
    borderRadius: 4,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  progressItems: {
    gap: 12,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressItemIconComplete: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  progressItemIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.universityStudent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  progressItemText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  }
});

export default HomeScreen;
