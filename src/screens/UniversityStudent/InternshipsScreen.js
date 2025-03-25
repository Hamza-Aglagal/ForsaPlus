import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  FlatList,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight, lineHeight } from '../../theme/typography';

// Sample data for internships
const INTERNSHIPS = [
  {
    id: '1',
    company: "SQLI",
    position: "Développeur Frontend React",
    description: "Rejoignez notre équipe pour développer des interfaces utilisateur modernes et réactives pour nos clients.",
    requirements: ["React.js", "JavaScript", "CSS3"],
    location: "Rabat",
    duration: "3 mois",
    paid: true,
    amount: "3500 MAD",
    logo: "code-tags",
    color: colors.universityGradient.blue[0],
    postedAt: "Il y a 2 jours",
    deadline: "30/06/2023"
  },
  {
    id: '2',
    company: "OCP Group",
    position: "Data Analyst Stagiaire",
    description: "Analysez les données industrielles pour améliorer les processus de production et réduire les coûts.",
    requirements: ["Python", "SQL", "Power BI", "Excel"],
    location: "Casablanca",
    duration: "6 mois",
    paid: true,
    amount: "4500 MAD",
    logo: "chart-box",
    color: colors.universityGradient.purple[0],
    postedAt: "Il y a 3 jours",
    deadline: "15/07/2023"
  },
  {
    id: '3',
    company: "Maroc Telecom",
    position: "Stagiaire en Cybersécurité",
    description: "Contribuez à la sécurisation de nos infrastructures IT et à la prévention des cyberattaques.",
    requirements: ["Réseau", "Linux", "Cybersécurité", "Pentest"],
    location: "Casablanca",
    duration: "4 mois",
    paid: true,
    amount: "4000 MAD",
    logo: "shield-lock",
    color: colors.universityGradient.indigo[0],
    postedAt: "Il y a 1 semaine",
    deadline: "10/07/2023"
  },
  {
    id: '4',
    company: "Alten Maroc",
    position: "Développeur Java Backend",
    description: "Développez des solutions backend robustes pour nos clients dans le secteur de l'automobile.",
    requirements: ["Java", "Spring Boot", "Hibernate", "PostgreSQL"],
    location: "Rabat",
    duration: "5 mois",
    paid: true,
    amount: "4000 MAD",
    logo: "language-java",
    color: colors.universityGradient.lightBlue[0],
    postedAt: "Il y a 5 jours",
    deadline: "20/07/2023"
  },
  {
    id: '5',
    company: "Royal Air Maroc",
    position: "Stagiaire en Marketing Digital",
    description: "Élaborez et exécutez des stratégies de marketing digital pour augmenter notre présence en ligne.",
    requirements: ["SEO", "Google Analytics", "Social Media", "Content Marketing"],
    location: "Casablanca",
    duration: "3 mois",
    paid: true,
    amount: "3000 MAD",
    logo: "airplane",
    color: colors.universityGradient.blue[1],
    postedAt: "Il y a 1 jour",
    deadline: "05/07/2023"
  }
];

// Sample data for jobs
const JOBS = [
  {
    id: 'j1',
    company: "Capgemini",
    position: "Développeur Full Stack",
    description: "Nous recherchons un développeur Full Stack pour rejoindre notre équipe et travailler sur des projets innovants.",
    requirements: ["React.js", "Node.js", "MongoDB", "Express"],
    location: "Casablanca",
    experience: "1-3 ans",
    salary: "10000-15000 MAD",
    logo: "code-braces",
    color: colors.universityGradient.indigo[1],
    postedAt: "Il y a 3 jours",
    deadline: "15/08/2023"
  },
  {
    id: 'j2',
    company: "CBI",
    position: "Ingénieur DevOps",
    description: "Optimisez nos processus de déploiement et maintenez notre infrastructure cloud à grande échelle.",
    requirements: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    location: "Rabat",
    experience: "2-5 ans",
    salary: "15000-18000 MAD",
    logo: "cloud-outline",
    color: colors.universityGradient.blue[0],
    postedAt: "Il y a 1 semaine",
    deadline: "20/08/2023"
  },
  {
    id: 'j3',
    company: "Société Générale",
    position: "Data Scientist",
    description: "Développez des modèles prédictifs pour optimiser nos services financiers et réduire les risques.",
    requirements: ["Python", "TensorFlow", "SQL", "Data Mining"],
    location: "Casablanca",
    experience: "2-4 ans",
    salary: "17000-20000 MAD",
    logo: "chart-scatter-plot",
    color: colors.universityGradient.purple[0],
    postedAt: "Il y a 5 jours",
    deadline: "12/08/2023"
  }
];

// Filter categories
const CATEGORIES = [
  { id: 'all', name: 'Tous' },
  { id: 'it', name: 'IT & Dev' },
  { id: 'data', name: 'Data' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'finance', name: 'Finance' },
  { id: 'engineering', name: 'Ingénierie' }
];

const InternshipsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('internships'); // 'internships' or 'jobs'

  // InternshipCard component
  const InternshipCard = ({ item, onPress }) => (
    <TouchableOpacity style={styles.internshipCard} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={[styles.companyLogo, { backgroundColor: item.color }]}>
          <Icon name={item.logo} size={24} color="#FFF" />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.companyName}>{item.company}</Text>
          <View style={styles.locationContainer}>
            <Icon name="map-marker" size={14} color={colors.gray500} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton}>
          <Icon name="bookmark-outline" size={20} color={colors.universityStudent} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.positionTitle}>{item.position}</Text>
        <Text style={styles.descriptionText} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.requirementsContainer}>
          {item.requirements.slice(0, 3).map((req, index) => (
            <View key={index} style={styles.requirementTag}>
              <Text style={styles.requirementText}>{req}</Text>
            </View>
          ))}
          {item.requirements.length > 3 && (
            <View style={styles.requirementTag}>
              <Text style={styles.requirementText}>+{item.requirements.length - 3}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <Icon name="clock-outline" size={16} color={colors.gray500} />
          <Text style={styles.footerText}>{item.duration}</Text>
        </View>
        
        <View style={styles.footerItem}>
          <Icon name="currency-usd" size={16} color={colors.success} />
          <Text style={[styles.footerText, { color: colors.success }]}>
            {item.paid ? item.amount : "Non rémunéré"}
          </Text>
        </View>
        
        <View style={styles.footerItem}>
          <Icon name="calendar-clock" size={16} color={colors.warning} />
          <Text style={[styles.footerText, { color: colors.warning }]}>
            {item.deadline}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // JobCard component
  const JobCard = ({ item, onPress }) => (
    <TouchableOpacity style={styles.internshipCard} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={[styles.companyLogo, { backgroundColor: item.color }]}>
          <Icon name={item.logo} size={24} color="#FFF" />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.companyName}>{item.company}</Text>
          <View style={styles.locationContainer}>
            <Icon name="map-marker" size={14} color={colors.gray500} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton}>
          <Icon name="bookmark-outline" size={20} color={colors.universityStudent} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.positionTitle}>{item.position}</Text>
        <Text style={styles.descriptionText} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.requirementsContainer}>
          {item.requirements.slice(0, 3).map((req, index) => (
            <View key={index} style={styles.requirementTag}>
              <Text style={styles.requirementText}>{req}</Text>
            </View>
          ))}
          {item.requirements.length > 3 && (
            <View style={styles.requirementTag}>
              <Text style={styles.requirementText}>+{item.requirements.length - 3}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <Icon name="briefcase-clock" size={16} color={colors.gray500} />
          <Text style={styles.footerText}>{item.experience}</Text>
        </View>
        
        <View style={styles.footerItem}>
          <Icon name="currency-usd" size={16} color={colors.success} />
          <Text style={[styles.footerText, { color: colors.success }]}>
            {item.salary}
          </Text>
        </View>
        
        <View style={styles.footerItem}>
          <Icon name="calendar-clock" size={16} color={colors.warning} />
          <Text style={[styles.footerText, { color: colors.warning }]}>
            {item.deadline}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render the Filter Categories
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const handleInternshipPress = (internshipId) => {
    navigation.navigate('InternshipDetail', { internshipId });
  };

  const handleJobPress = (jobId) => {
    navigation.navigate('InternshipDetail', { jobId });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stages/Emploi</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
          <Icon name="filter-variant" size={22} color={colors.universityStudent} />
        </TouchableOpacity>
      </View>
      
      {/* Tab Selector */}
      <View style={styles.tabSelectorContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeSection === 'internships' && styles.activeTabButton]}
          onPress={() => setActiveSection('internships')}
        >
          <Text style={[styles.tabButtonText, activeSection === 'internships' && styles.activeTabButtonText]}>
            Stages
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeSection === 'jobs' && styles.activeTabButton]}
          onPress={() => setActiveSection('jobs')}
        >
          <Text style={[styles.tabButtonText, activeSection === 'jobs' && styles.activeTabButtonText]}>
            Emploi
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={colors.gray500} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={activeSection === 'internships' ? "Rechercher des stages..." : "Rechercher des emplois..."}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.gray500}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Icon name="close-circle" size={16} color={colors.gray500} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      {/* Internship/Job List */}
      {activeSection === 'internships' ? (
        <FlatList
          data={INTERNSHIPS}
          renderItem={({ item }) => (
            <InternshipCard
              item={item}
              onPress={() => handleInternshipPress(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.internshipsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={JOBS}
          renderItem={({ item }) => (
            <JobCard
              item={item}
              onPress={() => handleJobPress(item.id)}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.internshipsList}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      <TouchableOpacity style={styles.fab}>
        <Icon name="plus" size={24} color="#FFF" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 15,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  clearButton: {
    padding: 5,
  },
  categoriesContainer: {
    marginTop: 15,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  categoryButtonActive: {
    backgroundColor: colors.universityStudent,
    borderColor: colors.universityStudent,
  },
  categoryText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  categoryTextActive: {
    color: colors.white,
    fontWeight: fontWeight.bold,
  },
  internshipsList: {
    padding: 20,
    paddingBottom: 80, // Extra padding to accommodate FAB
  },
  internshipCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  companyLogo: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  companyName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  saveButton: {
    padding: 8,
  },
  cardBody: {
    paddingHorizontal: 15,
    paddingBottom: 12,
  },
  positionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: lineHeight.sm,
    marginBottom: 12,
  },
  requirementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  requirementTag: {
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  requirementText: {
    fontSize: fontSize.xs,
    color: colors.universityStudent,
    fontWeight: fontWeight.medium,
  },
  cardFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    padding: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  footerText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 5,
  },
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  // New styles for tab selector
  tabSelectorContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    margin: 15,
    borderRadius: 10,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: colors.universityStudent,
  },
  tabButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  activeTabButtonText: {
    color: colors.white,
  },
});

export default InternshipsScreen; 