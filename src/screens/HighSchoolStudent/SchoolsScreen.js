import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const FilterChip = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.filterChip,
        isSelected ? { backgroundColor: colors.student } : { backgroundColor: colors.gray200 }
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
          <LinearGradient
            colors={[colors.student, colors.studentGradient.primary[1]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.schoolImagePlaceholder}
          >
            <Text style={styles.schoolImageText}>{name.charAt(0)}</Text>
          </LinearGradient>
        )}
        <View style={styles.schoolRating}>
          <Icon name="star" size={14} color="#FFB400" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.favoriteIconButton, 
            isFavorite && styles.favoriteActiveButton
          ]}
          onPress={() => onToggleFavorite(id)}
        >
          <Icon 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={18} 
            color={isFavorite ? colors.white : colors.student} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.schoolInfo}>
        <Text style={styles.schoolName} numberOfLines={1}>{name}</Text>
        <View style={styles.schoolMetaContainer}>
          <View style={styles.schoolTypeBadge}>
            <Text style={styles.schoolTypeBadgeText}>{type}</Text>
          </View>
          <Text style={styles.schoolFees}>{fees}</Text>
        </View>
        <View style={styles.schoolDetailsContainer}>
          <View style={styles.schoolDetailItem}>
            <Icon name="map-marker" size={14} color={colors.textSecondary} />
            <Text style={styles.schoolDetailText} numberOfLines={1}>{location}</Text>
          </View>
          <View style={styles.schoolDetailItem}>
            <Icon name="school-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.schoolDetailText}>Plusieurs filières</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={onPress}>
          <Text style={styles.applyButtonText}>Voir détails</Text>
          <Icon name="chevron-right" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const FeaturedSchoolCard = ({ id, name, type, description, image, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.featuredSchoolCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
        style={styles.featuredSchoolGradient}
      >
        <View style={styles.featuredSchoolImageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.featuredSchoolImage} />
          ) : (
            <LinearGradient
              colors={[colors.student, colors.studentGradient.primary[1]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featuredSchoolImagePlaceholder}
            >
              <Text style={styles.featuredSchoolImageText}>{name.charAt(0)}</Text>
            </LinearGradient>
          )}
        </View>
        
        <View style={styles.featuredSchoolContent}>
          <View style={styles.featuredSchoolBadge}>
            <Icon name="school-outline" size={14} color={colors.white} style={{marginRight: 4}} />
            <Text style={styles.featuredSchoolBadgeText}>{type}</Text>
          </View>
          
          <Text style={styles.featuredSchoolName}>{name}</Text>
          
          <Text style={styles.featuredSchoolDescription} numberOfLines={2}>
            {description}
          </Text>
          
          <View style={styles.featuredSchoolFooter}>
            <View style={styles.featuredSchoolMetaInfo}>
              <View style={styles.featuredSchoolMetaItem}>
                <Icon name="map-marker" size={14} color="rgba(255,255,255,0.8)" />
                <Text style={styles.featuredSchoolMetaText}>Multiple campus</Text>
              </View>
              <View style={styles.featuredSchoolMetaItem}>
                <Icon name="star" size={14} color="#FFB400" />
                <Text style={styles.featuredSchoolMetaText}>Top rated</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.featuredSchoolButton}
              onPress={onPress}
            >
              <Text style={styles.featuredSchoolButtonText}>Découvrir</Text>
              <Icon name="arrow-right" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const EmptyFavoritesSection = ({ onExplore }) => {
  return (
    <View style={styles.emptyFavoritesContainer}>
      <Icon name="heart-outline" size={60} color={colors.gray400} />
      <Text style={styles.emptyFavoritesTitle}>Pas encore de favoris</Text>
      <Text style={styles.emptyFavoritesText}>
        Marquez des établissements comme favoris pour les retrouver facilement ici.
      </Text>
      <TouchableOpacity style={styles.exploreButton} onPress={onExplore}>
        <Text style={styles.exploreButtonText}>Explorer des établissements</Text>
      </TouchableOpacity>
    </View>
  );
};

const SchoolsScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filters = [
    { id: 'all', label: 'Tout' },
    { id: 'university', label: 'universités' },
    { id: 'engineering', label: 'Écoles d ingénieurs' },
    { id: 'business', label: 'Écoles de commerce' },
    { id: 'medicine', label: 'Médecine' },
    { id: 'international', label: 'International' }
  ];

  const featuredSchools = [
    {
      id: '1',
      name: 'École Mohammadia d Ingénieurs',
      type: 'École d ingénieurs',
      description: ' une des plus prestigieuses écoles d ingénieurs au Maroc offrant une formation de qualité dans différentes spécialités.',
      image: null
    }
  ];

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
  ];

  const toggleFavorite = (schoolId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(schoolId)) {
        return prevFavorites.filter(id => id !== schoolId);
      } else {
        return [...prevFavorites, schoolId];
      }
    });
  };

  const handleSchoolPress = (schoolId) => {
    navigation.navigate('SchoolDetail', { schoolId });
  };

  const favoriteSchools = schools.filter(school => favorites.includes(school.id));

  const toggleFavoritesFilter = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    if (!showFavoritesOnly) {
      setSelectedFilter('favorites');
    } else {
      setSelectedFilter('all');
    }
  };

  const filteredSchools = showFavoritesOnly 
    ? favoriteSchools 
    : selectedFilter === 'all' 
      ? schools 
      : schools.filter(school => school.type.toLowerCase().includes(selectedFilter));

  const scrollToFavorites = () => {
    setShowFavoritesOnly(true);
    setSelectedFilter('favorites');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[colors.student, colors.student + 'AA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.title}>Établissements</Text>
          <Text style={styles.subtitle}>
            Découvrez les meilleures écoles et universités
          </Text>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchContainer}>
            <Icon name="magnify" size={20} color={colors.gray600} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher des établissements..."
              placeholderTextColor={colors.gray500}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        
        </View>

        {/* Favorites Toggle */}
        <View style={styles.favoritesToggleContainer}>
          <TouchableOpacity 
            style={[
              styles.favoritesToggle, 
              showFavoritesOnly && styles.favoritesToggleActive
            ]}
            onPress={toggleFavoritesFilter}
          >
            <Icon 
              name={showFavoritesOnly ? "heart" : "heart-outline"} 
              size={16} 
              color={showFavoritesOnly ? colors.white : colors.student} 
            />
            <Text 
              style={[
                styles.favoritesToggleText,
                showFavoritesOnly && styles.favoritesToggleTextActive
              ]}
            >
              Mes favoris ({favorites.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        {!showFavoritesOnly && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.filtersContainer}
          >
            {filters.map(filter => (
              <FilterChip
                key={filter.id}
                label={filter.label}
                isSelected={selectedFilter === filter.id}
                onPress={() => setSelectedFilter(filter.id)}
              />
            ))}
          </ScrollView>
        )}

        {/* Favorites Section */}
        {showFavoritesOnly && (
          <View style={styles.favoritesSection}>
            <View style={styles.sectionHeaderWithAction}>
              <Text style={styles.sectionTitle}>Mes Établissements Favoris</Text>
              {favoriteSchools.length > 0 && (
                <TouchableOpacity onPress={() => setShowFavoritesOnly(false)}>
                  <Text style={styles.seeAllText}>Voir tout</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {favoriteSchools.length === 0 ? (
              <EmptyFavoritesSection onExplore={() => setShowFavoritesOnly(false)} />
            ) : (
              favoriteSchools.map(school => (
                <SchoolCard
                  key={school.id}
                  id={school.id}
                  name={school.name}
                  type={school.type}
                  location={school.location}
                  rating={school.rating}
                  fees={school.fees}
                  image={school.image}
                  onPress={() => handleSchoolPress(school.id)}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            )}
          </View>
        )}

        {/* Featured School */}
        {!showFavoritesOnly && (
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeaderWithAction}>
              <Text style={styles.sectionTitle}>À la une</Text>
              <TouchableOpacity 
                style={styles.seeAllButton}
                onPress={() => navigation.navigate('AllSchools')}
              >
                <Text style={styles.seeAllText}>Voir tout</Text>
                <Icon name="chevron-right" size={16} color={colors.student} />
              </TouchableOpacity>
            </View>
            {featuredSchools.map(school => (
              <FeaturedSchoolCard
                key={school.id}
                id={school.id}
                name={school.name}
                type={school.type}
                description={school.description}
                image={school.image}
                onPress={() => handleSchoolPress(school.id)}
              />
            ))}
          </View>
        )}

        {/* Top Schools */}
        {(!showFavoritesOnly || (showFavoritesOnly && favoriteSchools.length > 0)) && (
          <View style={styles.schoolsSection}>
            <View style={styles.sectionHeaderWithAction}>
              <Text style={styles.sectionTitle}>
                {showFavoritesOnly ? "Autres établissements qui pourraient vous intéresser" : "Établissements recommandés"}
              </Text>
              <TouchableOpacity 
                style={styles.seeAllButton}
                onPress={() => navigation.navigate('AllSchools')}
              >
                <Text style={styles.seeAllText}>Voir tout</Text>
                <Icon name="chevron-right" size={16} color={colors.student} />
              </TouchableOpacity>
            </View>
            {filteredSchools.map(school => (
              <SchoolCard
                key={school.id}
                id={school.id}
                name={school.name}
                type={school.type}
                location={school.location}
                rating={school.rating}
                fees={school.fees}
                image={school.image}
                onPress={() => handleSchoolPress(school.id)}
                isFavorite={favorites.includes(school.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </View>
        )}

        {/* Exploration Guides Section */}
        <View style={styles.guidesSection}>
          <Text style={styles.sectionTitle}>Guides d'exploration</Text>
          
          <View style={styles.guidesContainer}>
            <TouchableOpacity 
              style={styles.guideCard}
              onPress={() => navigation.navigate('HowToChooseSchool')}
            >
              <View style={[styles.guideIconContainer, { backgroundColor: colors.student + '30' }]}>
                <Icon name="help-circle" size={30} color={colors.student} />
              </View>
              <Text style={styles.guideTitle}>Comment choisir son école</Text>
              <Text style={styles.guideDescription}>
                7 étapes pour trouver l'établissement idéal
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.guideCard}
              onPress={() => navigation.navigate('SchoolSelectionCriteria')}
            >
              <View style={[styles.guideIconContainer, { backgroundColor: colors.warning + '30' }]}>
                <Icon name="clipboard-list" size={30} color={colors.warning} />
              </View>
              <Text style={styles.guideTitle}>Critères de sélection</Text>
              <Text style={styles.guideDescription}>
                Comparez les établissements objectivement
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    padding: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.white,
    opacity: 0.9,
  },
  searchBarContainer: {
    marginTop: -spacing.xl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  favoritesToggleContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  favoritesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.student,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  favoritesToggleActive: {
    backgroundColor: colors.student,
    borderColor: colors.student,
  },
  favoritesToggleText: {
    color: colors.student,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginLeft: spacing.xs,
  },
  favoritesToggleTextActive: {
    color: colors.white,
  },
  filtersContainer: {
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  filterChipText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  sectionHeaderWithAction: {
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
    fontWeight: fontWeight.medium,
    color: colors.student,
  },
  favoritesSection: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  featuredSection: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  schoolsSection: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  guidesSection: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  guidesContainer: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  guideCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginRight: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  guideIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  guideTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  guideDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  emptyFavoritesContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyFavoritesTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyFavoritesText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  exploreButton: {
    backgroundColor: colors.student,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
  },
  allSchoolsButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.student + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: fontSize.sm,
    color: colors.student,
    fontWeight: fontWeight.medium,
    marginRight: spacing.xs,
  },
  schoolCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 160,
  },
  schoolImageContainer: {
    width: 130,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolImageText: {
    fontSize: 40,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  schoolRating: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  favoriteIconButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.white,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteActiveButton: {
    backgroundColor: colors.student,
  },
  ratingText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginLeft: 2,
  },
  schoolInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  schoolName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  schoolMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  schoolTypeBadge: {
    backgroundColor: colors.student + '15',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  schoolTypeBadgeText: {
    fontSize: fontSize.xs,
    color: colors.student,
    fontWeight: fontWeight.medium,
  },
  schoolFees: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  schoolDetailsContainer: {
    marginBottom: spacing.sm,
  },
  schoolDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  schoolDetailText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  applyButton: {
    backgroundColor: colors.student,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  applyButtonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginRight: 4,
  },
  featuredSchoolCard: {
    marginBottom: spacing.lg,
    borderRadius: 16,
    overflow: 'hidden',
    height: 320,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  featuredSchoolGradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  featuredSchoolImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  featuredSchoolImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredSchoolImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredSchoolImageText: {
    fontSize: 80,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  featuredSchoolContent: {
    padding: spacing.lg,
    justifyContent: 'flex-end',
  },
  featuredSchoolBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(94, 96, 206, 0.7)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  featuredSchoolBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.white,
  },
  featuredSchoolName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featuredSchoolDescription: {
    fontSize: fontSize.md,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  featuredSchoolFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredSchoolMetaInfo: {
    flexDirection: 'column',
  },
  featuredSchoolMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featuredSchoolMetaText: {
    fontSize: fontSize.xs,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  featuredSchoolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  featuredSchoolButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.white,
    marginRight: spacing.xs,
  },
});

export default SchoolsScreen; 