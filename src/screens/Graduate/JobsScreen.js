import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';

// Mock data for jobs
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
    tags: ['React', 'Node.js', 'MongoDB'],
    category: 'Tech'
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
    tags: ['Gestion de Projet', 'Agile', 'Scrum'],
    category: 'Tech'
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
    tags: ['SEO', 'Social Media', 'Analytics'],
    category: 'Marketing'
  },
  {
    id: '4',
    title: 'Responsable RH',
    company: 'Global Services',
    location: 'Casablanca',
    type: 'CDI',
    salary: '18k-25k MAD',
    logo: 'https://randomuser.me/api/portraits/women/4.jpg',
    posted: '2 jours',
    matched: 85,
    tags: ['Recrutement', 'Formation', 'SIRH'],
    category: 'RH'
  },
  {
    id: '5',
    title: 'Ingénieur DevOps',
    company: 'CloudTech',
    location: 'Rabat',
    type: 'CDI',
    salary: '25k-35k MAD',
    logo: 'https://randomuser.me/api/portraits/men/5.jpg',
    posted: '3 jours',
    matched: 90,
    tags: ['Docker', 'Kubernetes', 'CI/CD'],
    category: 'Tech'
  },
  {
    id: '6',
    title: 'Architecte Cloud',
    company: 'Digital Solutions',
    location: 'Casablanca',
    type: 'CDI',
    salary: '30k-40k MAD',
    logo: 'https://randomuser.me/api/portraits/men/6.jpg',
    posted: '4 jours',
    matched: 88,
    tags: ['AWS', 'Azure', 'GCP'],
    category: 'Tech'
  },
];

// Filter categories
const filterCategories = [
  { id: 'all', name: 'Tous' },
  { id: 'tech', name: 'Tech' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'finance', name: 'Finance' },
  { id: 'sales', name: 'Ventes' },
  { id: 'hr', name: 'RH' },
];

// Job types
const jobTypes = [
  { id: 'all', name: 'Tous' },
  { id: 'full-time', name: 'CDI' },
  { id: 'part-time', name: 'CDD' },
  { id: 'contract', name: 'Freelance' },
  { id: 'remote', name: 'Télétravail' },
];

// Job Card Component
const JobCard = ({ job, onPress }) => (
  <TouchableOpacity style={styles.jobCard} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.jobCardTop}>
      <Image source={{ uri: job.logo }} style={styles.companyLogo} />
      <View style={styles.jobTitleContainer}>
        <Text style={styles.jobTitle} numberOfLines={1}>{job.title}</Text>
        <Text style={styles.companyName}>{job.company}</Text>
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Icon name="bookmark-outline" size={22} color={colors.graduate} />
      </TouchableOpacity>
    </View>
    
    <View style={styles.jobTags}>
      {job.tags.map((tag, index) => (
        <View key={index} style={styles.tagContainer}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
    
    <View style={styles.jobDetails}>
      <View style={styles.jobDetailItem}>
        <Icon name="map-marker" size={16} color={colors.textSecondary} />
        <Text style={styles.jobDetailText}>{job.location}</Text>
      </View>
      <View style={styles.jobDetailItem}>
        <Icon name="briefcase-outline" size={16} color={colors.textSecondary} />
        <Text style={styles.jobDetailText}>{job.type}</Text>
      </View>
      <View style={styles.jobDetailItem}>
        <Icon name="currency-usd" size={16} color={colors.textSecondary} />
        <Text style={styles.jobDetailText}>{job.salary}</Text>
      </View>
    </View>
    
    <View style={styles.jobFooter}>
      <View style={styles.matchScore}>
        <Text style={styles.matchScoreText}>{job.matched}% Match</Text>
        <View style={styles.matchBarContainer}>
          <View style={[styles.matchBar, { width: `${job.matched}%` }]} />
        </View>
      </View>
      <Text style={styles.postedText}>Il y a {job.posted}</Text>
    </View>
  </TouchableOpacity>
);

// Filter Chip Component
const FilterChip = ({ title, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.filterChip,
      isSelected && { backgroundColor: colors.graduate + '15', borderColor: colors.graduate }
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      style={[
        styles.filterChipText,
        isSelected && { color: colors.graduate, fontWeight: fontWeight.bold }
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const JobsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  const handleJobPress = (job) => {
    navigation.navigate('JobDetail', { job });
  };
  
  const filteredJobs = jobsData.filter(job => {
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!job.title.toLowerCase().includes(query) && 
          !job.company.toLowerCase().includes(query) &&
          !job.tags.some(tag => tag.toLowerCase().includes(query))) {
        return false;
      }
    }
    
    // Filter by category
    if (selectedCategory !== 'all' && 
        job.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    
    // Filter by job type
    if (selectedJobType !== 'all' && 
        job.type.toLowerCase() !== selectedJobType.toLowerCase()) {
      return false;
    }
    
    return true;
  });
  
  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };
  
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const handleJobTypeSelect = (typeId) => {
    setSelectedJobType(typeId);
  };
  
  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedJobType('all');
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.graduate} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.graduate, '#1E8E7E']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Offres d'emploi</Text>
          <Text style={styles.headerSubtitle}>Trouvez l'emploi idéal pour vous</Text>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="magnify" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un emploi ou une entreprise"
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity 
            style={[styles.filterButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]} 
            onPress={toggleFilterPanel}
          >
            <Icon name="filter-variant" size={22} color={colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      {/* Filter Panel */}
      {showFilterPanel && (
        <View style={styles.filterPanel}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Catégorie</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterChipsContainer}
            >
              {filterCategories.map((category) => (
                <FilterChip
                  key={category.id}
                  title={category.name}
                  isSelected={selectedCategory === category.id}
                  onPress={() => handleCategorySelect(category.id)}
                />
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Type d'emploi</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterChipsContainer}
            >
              {jobTypes.map((type) => (
                <FilterChip
                  key={type.id}
                  title={type.name}
                  isSelected={selectedJobType === type.id}
                  onPress={() => handleJobTypeSelect(type.id)}
                />
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.filterActions}>
            <TouchableOpacity 
              style={styles.clearFiltersButton}
              onPress={clearAllFilters}
            >
              <Text style={styles.clearFiltersText}>Réinitialiser</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.applyFiltersButton}
              onPress={toggleFilterPanel}
            >
              <LinearGradient
                colors={[colors.graduate, '#1E8E7E']}
                style={styles.applyFiltersGradient}
              >
                <Text style={styles.applyFiltersText}>Appliquer</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredJobs.length} {filteredJobs.length === 1 ? 'emploi trouvé' : 'emplois trouvés'}
        </Text>
      </View>
      
      {/* Jobs List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard job={item} onPress={() => handleJobPress(item)} />
        )}
        contentContainerStyle={styles.jobsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="briefcase-search-outline" size={60} color={colors.gray300} />
            <Text style={styles.emptyTitle}>Aucun emploi trouvé</Text>
            <Text style={styles.emptyMessage}>
              Essayez d'autres critères de recherche ou réinitialisez les filtres.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
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
  searchInput: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
    padding: 0,
  },
  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPanel: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  filterSection: {
    marginBottom: spacing.md,
  },
  filterSectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  filterChipsContainer: {
    paddingVertical: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  filterChipText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  clearFiltersButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 10,
    marginRight: spacing.sm,
  },
  clearFiltersText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  applyFiltersButton: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  applyFiltersGradient: {
    paddingVertical: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyFiltersText: {
    fontSize: fontSize.sm,
    color: colors.white,
    fontWeight: fontWeight.bold,
  },
  resultsContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  resultsText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  jobsList: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
  jobCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
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
  saveButton: {
    padding: 4,
  },
  jobTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  tagContainer: {
    backgroundColor: colors.graduate + '10',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 11,
    color: colors.graduate,
    fontWeight: fontWeight.medium,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    paddingTop: spacing.sm,
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
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  matchScore: {
    marginBottom: 8,
  },
  matchScoreText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.graduate,
    marginBottom: 4,
  },
  matchBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: colors.gray100,
    borderRadius: 2,
  },
  matchBar: {
    height: '100%',
    backgroundColor: colors.graduate,
    borderRadius: 2,
  },
  postedText: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyMessage: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default JobsScreen; 