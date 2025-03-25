import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

// Filter Chip component
const FilterChip = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.filterChip,
        isSelected ? { 
          backgroundColor: colors.student,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 2,
        } : { 
          backgroundColor: colors.gray200 
        }
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.filterChipText,
          isSelected ? { color: colors.white } : { color: colors.textPrimary }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// School Card component
const SchoolCard = ({ id, name, type, location, rating, fees, image, onPress, isFavorite, onToggleFavorite }) => {
  return (
    <TouchableOpacity 
      style={styles.schoolCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.schoolImageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.schoolImage} />
        ) : (
          <View style={styles.schoolImagePlaceholder}>
            <Text style={styles.schoolImageText}>{name.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.schoolRating}>
          <Icon name="star" size={14} color={colors.warning} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
      <View style={styles.schoolInfo}>
        <Text style={styles.schoolName}>{name}</Text>
        <Text style={styles.schoolType}>
          <Icon name="school-outline" size={14} color={colors.textSecondary} /> {type}
        </Text>
        <Text style={styles.schoolLocation}>
          <Icon name="map-marker" size={14} color={colors.textSecondary} /> {location}
        </Text>
        {fees && (
          <Text style={styles.schoolFees}>
            <Icon name="cash" size={14} color={colors.textSecondary} /> {fees}
          </Text>
        )}
        <View style={styles.applyButtonContainer}>
          <TouchableOpacity style={styles.applyButton} onPress={onPress}>
            <Text style={styles.applyButtonText}>Plus d'infos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.saveButton, 
              isFavorite && styles.favoriteButton
            ]}
            onPress={() => onToggleFavorite(id)}
          >
            <Icon 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={isFavorite ? colors.white : colors.student} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Sort Option component
const SortOption = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.sortOption,
        isSelected && styles.selectedSortOption
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.sortOptionText,
          isSelected && styles.selectedSortOptionText
        ]}
      >
        {label}
      </Text>
      {isSelected && (
        <Icon name="check" size={16} color={colors.student} />
      )}
    </TouchableOpacity>
  );
};

const AllSchoolsScreen = ({ navigation, route }) => {
  const initialFilterType = route.params?.filterType || 'all';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(initialFilterType);
  const [favorites, setFavorites] = useState([]);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [locationFilter, setLocationFilter] = useState('all');
  const [feesFilter, setFeesFilter] = useState('all');

  // Dummy data for schools
  const schools = [
    {
      id: '1',
      name: 'ENSIAS',
      type: 'École d ingénieurs',
      location: 'Rabat',
      rating: '4.8',
      fees: 'Public',
      image: null
    },
    {
      id: '2',
      name: 'ENCG Casablanca',
      type: 'École de commerce',
      location: 'Casablanca',
      rating: '4.7',
      fees: 'Public',
      image: null
    },
    {
      id: '3',
      name: 'Faculté de Médecine de Rabat',
      type: 'Médecine',
      location: 'Rabat',
      rating: '4.5',
      fees: 'Public',
      image: null
    },
    {
      id: '4',
      name: 'université Mohammed V',
      type: 'université',
      location: 'Rabat',
      rating: '4.3',
      fees: 'Public',
      image: null
    },
    {
      id: '5',
      name: 'INPT',
      type: 'École d ingénieurs',
      location: 'Rabat',
      rating: '4.6',
      fees: 'Public',
      image: null
    },
    {
      id: '6',
      name: 'ENSEM',
      type: 'École d ingénieurs',
      location: 'Casablanca',
      rating: '4.5',
      fees: 'Public',
      image: null
    },
    {
      id: '7',
      name: 'EHTP',
      type: 'École d ingénieurs',
      location: 'Casablanca',
      rating: '4.7',
      fees: 'Public',
      image: null
    },
    {
      id: '8',
      name: 'Faculté des Sciences Juridiques',
      type: 'université',
      location: 'Fès',
      rating: '4.1',
      fees: 'Public',
      image: null
    },
    {
      id: '9',
      name: 'UIR',
      type: 'université',
      location: 'Rabat',
      rating: '4.4',
      fees: 'Privé',
      image: null
    },
    {
      id: '10',
      name: 'UM6P',
      type: 'université',
      location: 'Ben Guerir',
      rating: '4.9',
      fees: 'Privé',
      image: null
    },
  ];

  const typeFilters = [
    { id: 'all', label: 'Tout' },
    { id: 'université', label: 'universités' },
    { id: 'ingénieurs', label: 'Écoles d ingénieurs' },
    { id: 'commerce', label: 'Écoles de commerce' },
    { id: 'médecine', label: 'Médecine' },
    { id: 'privé', label: 'Privé' },
    { id: 'public', label: 'Public' },
  ];

  const locations = [
    { id: 'all', label: 'Toutes les villes' },
    { id: 'rabat', label: 'Rabat' },
    { id: 'casablanca', label: 'Casablanca' },
    { id: 'marrakech', label: 'Marrakech' },
    { id: 'fès', label: 'Fès' },
    { id: 'tanger', label: 'Tanger' },
  ];

  const fees = [
    { id: 'all', label: 'Tous les frais' },
    { id: 'public', label: 'Public' },
    { id: 'privé', label: 'Privé' },
  ];

  const sortOptions = [
    { id: 'relevance', label: 'Pertinence' },
    { id: 'rating', label: 'Note (plus élevée d abord)' },
    { id: 'name_asc', label: 'Nom (A-Z)' },
    { id: 'name_desc', label: 'Nom (Z-A)' },
  ];

  // Toggle favorite
  const toggleFavorite = (schoolId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(schoolId)) {
        return prevFavorites.filter(id => id !== schoolId);
      } else {
        return [...prevFavorites, schoolId];
      }
    });
  };

  // Filter and sort schools
  const getFilteredSchools = () => {
    // Start with search query filter
    let filteredSchools = schools.filter(school => {
      const schoolNameMatch = school.name.toLowerCase().includes(searchQuery.toLowerCase());
      const schoolTypeMatch = school.type.toLowerCase().includes(searchQuery.toLowerCase());
      const schoolLocationMatch = school.location.toLowerCase().includes(searchQuery.toLowerCase());
      return schoolNameMatch || schoolTypeMatch || schoolLocationMatch;
    });

    // Type filter
    if (selectedFilter !== 'all') {
      filteredSchools = filteredSchools.filter(school => 
        school.type.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        school.fees.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }

    // Location filter
    if (locationFilter !== 'all') {
      filteredSchools = filteredSchools.filter(school => 
        school.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Fees filter
    if (feesFilter !== 'all') {
      filteredSchools = filteredSchools.filter(school => 
        school.fees.toLowerCase() === feesFilter.toLowerCase()
      );
    }

    // Sorting
    if (sortBy === 'rating') {
      filteredSchools.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sortBy === 'name_asc') {
      filteredSchools.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name_desc') {
      filteredSchools.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filteredSchools;
  };

  const filteredSchools = getFilteredSchools();
  
  // Navigate to school detail screen
  const handleSchoolPress = (schoolId) => {
    navigation.navigate('SchoolDetail', { schoolId });
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedFilter('all');
    setLocationFilter('all');
    setFeesFilter('all');
    setSortBy('relevance');
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Toutes les écoles</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="magnify" size={20} color={colors.gray600} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher des établissements..."
            placeholderTextColor={colors.gray500}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={20} color={colors.gray500} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Icon name="filter-variant" size={22} color={colors.student} />
        </TouchableOpacity>
      </View>

      {/* Filter options panel */}
      {showFilters && (
        <View style={styles.filtersPanel}>
          <View style={styles.filtersPanelHeader}>
            <Text style={styles.filtersPanelTitle}>Filtres avancés</Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetText}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.filterSectionTitle}>Ville</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterOptionsContainer}
          >
            {locations.map(location => (
              <FilterChip
                key={location.id}
                label={location.label}
                isSelected={locationFilter === location.id}
                onPress={() => setLocationFilter(location.id)}
              />
            ))}
          </ScrollView>

          <Text style={styles.filterSectionTitle}>Frais</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterOptionsContainer}
          >
            {fees.map(fee => (
              <FilterChip
                key={fee.id}
                label={fee.label}
                isSelected={feesFilter === fee.id}
                onPress={() => setFeesFilter(fee.id)}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Type filters */}
      <View style={styles.typeFiltersSection}>
        <Text style={styles.filterSectionTitle}>Type d'établissement</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeFiltersContainer}
        >
          {typeFilters.map(filter => (
            <FilterChip
              key={filter.id}
              label={filter.label}
              isSelected={selectedFilter === filter.id}
              onPress={() => setSelectedFilter(filter.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Results count */}
      <View style={styles.resultsCountContainer}>
        <Text style={styles.resultsCountText}>
          {filteredSchools.length} écoles trouvées
        </Text>
      </View>

      {/* School list */}
      <FlatList
        data={filteredSchools}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SchoolCard
            id={item.id}
            name={item.name}
            type={item.type}
            location={item.location}
            rating={item.rating}
            fees={item.fees}
            image={item.image}
            onPress={() => handleSchoolPress(item.id)}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        contentContainerStyle={styles.schoolsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyResultsContainer}>
            <Icon name="school-outline" size={60} color={colors.gray400} />
            <Text style={styles.emptyResultsTitle}>Aucun résultat trouvé</Text>
            <Text style={styles.emptyResultsText}>
              Essayez de modifier vos filtres ou votre recherche
            </Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Réinitialiser les filtres</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.student + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeFiltersSection: {
    backgroundColor: colors.white,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  typeFiltersContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray300,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterChipText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    textAlign: 'center',
  },
  sortByContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray200,
    position: 'relative',
  },
  sortByButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortByText: {
    fontSize: fontSize.sm,
    color: colors.student,
    fontWeight: fontWeight.medium,
    marginHorizontal: spacing.sm,
  },
  sortOptionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.gray200,
    zIndex: 1,
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  selectedSortOption: {
    backgroundColor: colors.gray100,
  },
  sortOptionText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  selectedSortOptionText: {
    color: colors.student,
    fontWeight: fontWeight.semiBold,
  },
  resultsCountContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  resultsCountText: {
    fontSize: fontSize.sm,
    color: colors.textTertiary,
  },
  schoolsList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  schoolCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  schoolImageContainer: {
    height: 140,
    position: 'relative',
  },
  schoolImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  schoolImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.student + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolImageText: {
    fontSize: 48,
    fontWeight: fontWeight.bold,
    color: colors.student,
  },
  schoolRating: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  schoolInfo: {
    padding: spacing.md,
  },
  schoolName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  schoolType: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  schoolLocation: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  schoolFees: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  applyButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  applyButton: {
    backgroundColor: colors.student,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    flex: 1,
    marginRight: spacing.sm,
    alignItems: 'center',
  },
  applyButtonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    backgroundColor: colors.student,
  },
  filtersPanel: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  filtersPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  filtersPanelTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
  },
  resetText: {
    fontSize: fontSize.sm,
    color: colors.student,
    fontWeight: fontWeight.medium,
  },
  filterSectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  filterOptionsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  emptyResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    marginTop: spacing.xl,
  },
  emptyResultsTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyResultsText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  resetButton: {
    backgroundColor: colors.student,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  resetButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
  },
});

export default AllSchoolsScreen; 