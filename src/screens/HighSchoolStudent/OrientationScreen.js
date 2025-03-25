import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const OrientationCard = ({ title, description, icon, color, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.orientationCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <LinearGradient
          colors={color === colors.student ? colors.studentGradient.primary : [color, color + 'CC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <Icon name={icon} size={24} color={colors.white} />
        </LinearGradient>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={[styles.cardTypeBadge, { backgroundColor: color + '15' }]}>
            <Text style={[styles.cardTypeBadgeText, { color: color }]}>Filière</Text>
          </View>
        </View>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
      <View style={styles.cardFooter}>
        <View style={[styles.cardButton, { backgroundColor: color + '15' }]}>
          <Text style={[styles.exploreText, { color }]}>Découvrir</Text>
          <Icon name="arrow-right" size={16} color={color} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const JobCard = ({ title, domain, icon, color, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.jobCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={color === colors.student ? colors.studentGradient.primary : [color, color + 'CC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.jobIconContainer}
      >
        <Icon name={icon} size={22} color={colors.white} />
      </LinearGradient>
      <View style={styles.jobTextContainer}>
        <Text style={styles.jobTitle}>{title}</Text>
        <Text style={styles.jobDomain}>{domain}</Text>
      </View>
      <Icon name="chevron-right" size={20} color={colors.gray400} />
    </TouchableOpacity>
  );
};

const AdvisorCard = ({ name, title, imageUrl, rating, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.advisorCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.advisorHeader}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.advisorImage} />
        ) : (
          <View style={styles.advisorImagePlaceholder}>
            <Text style={styles.advisorInitials}>{name.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.advisorInfo}>
          <Text style={styles.advisorName}>{name}</Text>
          <Text style={styles.advisorTitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.advisorRating}>
        {Array(5).fill().map((_, i) => (
          <Icon 
            key={i} 
            name={i < rating ? "star" : "star-outline"} 
            size={16} 
            color={i < rating ? "#FFB400" : colors.gray400} 
            style={{ marginRight: 2 }}
          />
        ))}
        <Text style={styles.advisorRatingText}>{rating}.0</Text>
      </View>
      <TouchableOpacity style={styles.advisorButton}>
        <Text style={styles.advisorButtonText}>Prendre rendez-vous</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const GuideCard = ({ title, pages, time, icon, color, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.guideCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.guideHeader}>
        <LinearGradient
          colors={color === colors.student ? colors.studentGradient.primary : [color, color + 'CC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.guideIconContainer}
        >
          <Icon name={icon} size={24} color={colors.white} />
        </LinearGradient>
        <Text style={styles.guideTitle}>{title}</Text>
      </View>
      <View style={styles.guideDetails}>
        <View style={styles.guideDetailItem}>
          <Icon name="file-document-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.guideDetailText}>{pages} pages</Text>
        </View>
        <View style={styles.guideDetailItem}>
          <Icon name="clock-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.guideDetailText}>{time} min</Text>
        </View>
      </View>
      <Text style={[styles.guideReadText, { color }]}>Lire le guide</Text>
    </TouchableOpacity>
  );
};

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

const OrientationScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const navigation = useNavigation();

  const filters = [
    { id: 'all', label: 'Tout' },
    { id: 'university', label: 'université' },
    { id: 'engineering', label: 'Ingénieur' },
    { id: 'business', label: 'Commerce' },
    { id: 'medicine', label: 'Médecine' },
    { id: 'art', label: 'Art & Design' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={colors.studentGradient.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.title}>Orientation</Text>
          <Text style={styles.subtitle}>
            Explorez les différentes options académiques et professionnelles
          </Text>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchContainer}>
            <Icon name="magnify" size={20} color={colors.gray600} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher des filières, écoles..."
              placeholderTextColor={colors.gray500}
            />
          </View>
        </View>

        {/* Main Option Cards */}
        <View style={styles.optionCardsContainer}>
          {/* Test Intelligence Card */}
          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('OrientationTest')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={colors.studentGradient.purple}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.optionCardGradient}
            >
              <Icon name="brain" size={40} color={colors.white} style={styles.optionCardIcon} />
              <View style={styles.optionCardContent}>
                <Text style={styles.optionCardTitle}>Tests d'intelligence et d'orientation</Text>
                <Text style={styles.optionCardDescription}>
                  Découvrez vos forces et les parcours qui vous correspondent
                </Text>
              </View>
              <View style={styles.optionCardAction}>
                <Text style={styles.optionCardActionText}>Explorer</Text>
                <Icon name="chevron-right" size={20} color={colors.white} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Parcours Card */}
          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('ParcourTimeline')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={colors.studentGradient.blue}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.optionCardGradient}
            >
              <Icon name="map-marker-path" size={40} color={colors.white} style={styles.optionCardIcon} />
              <View style={styles.optionCardContent}>
                <Text style={styles.optionCardTitle}>Mon parcours d'orientation</Text>
                <Text style={styles.optionCardDescription}>
                  Visualisez et suivez votre progression vers votre objectif académique
                </Text>
                
                <View style={styles.miniTimeline}>
                  <View style={[styles.miniTimelineStep, { backgroundColor: colors.student }]} />
                  <View style={[styles.miniTimelineStep, { backgroundColor: colors.student }]} />
                  <View style={[styles.miniTimelineStep, { backgroundColor: colors.white }]} />
                  <View style={[styles.miniTimelineStep, { backgroundColor: colors.white, opacity: 0.5 }]} />
                  <View style={[styles.miniTimelineStep, { backgroundColor: colors.white, opacity: 0.3 }]} />
                </View>

                <Text style={styles.miniTimelineText}>3/5 étapes complétées</Text>
              </View>
              <View style={styles.optionCardAction}>
                <Text style={styles.optionCardActionText}>Continuer</Text>
                <Icon name="chevron-right" size={20} color={colors.white} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Filières */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderWithAction}>
            <Text style={styles.sectionTitle}>Découvrez les filières</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {/* Filters */}
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

          <OrientationCard
            title="Facultés des Sciences"
            description="Explorez les programmes en mathématiques, physique, chimie, biologie et informatique."
            icon="atom"
            color={colors.info}
            onPress={() => {}}
          />

          <OrientationCard
            title="Écoles d'Ingénieurs"
            description="Découvrez les écoles d'ingénieurs, leurs spécialités et les concours d'accès."
            icon="calculator-variant"
            color={colors.student}
            onPress={() => {}}
          />

          <OrientationCard
            title="Écoles de Commerce"
            description="Parcourez les écoles de commerce et de gestion au Maroc et à l'international."
            icon="chart-line"
            color={colors.tertiary}
            onPress={() => {}}
          />
          
          <OrientationCard
            title="Facultés de Médecine"
            description="Informez-vous sur les études de médecine, pharmacie et médecine dentaire."
            icon="medical-bag"
            color={colors.success}
            onPress={() => {}}
          />
        </View>

        {/* Guides d'orientation */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderWithAction}>
            <Text style={styles.sectionTitle}>Guides d'orientation</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.guidesContainer}
          >
            <GuideCard 
              title="Comment choisir sa filière après le bac"
              pages="15"
              time="25"
              icon="school"
              color={colors.student}
              onPress={() => {}}
            />
            
            <GuideCard 
              title="Les études à l'étranger"
              pages="20"
              time="35"
              icon="airplane"
              color={colors.info}
              onPress={() => {}}
            />
            
            <GuideCard 
              title="Réussir les concours d'accès"
              pages="12"
              time="20"
              icon="trophy"
              color={colors.warning}
              onPress={() => {}}
            />
            
            <GuideCard 
              title="Guide des formations technologiques"
              pages="18"
              time="30"
              icon="laptop"
              color={colors.tertiary}
              onPress={() => {}}
            />
          </ScrollView>
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
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  header: {
    padding: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
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
  optionCardsContainer: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  optionCard: {
    borderRadius: 24,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    overflow: 'hidden',
  },
  optionCardGradient: {
    padding: spacing.lg,
    borderRadius: 24,
  },
  optionCardIcon: {
    marginBottom: spacing.md,
  },
  optionCardContent: {
    marginBottom: spacing.md,
  },
  optionCardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  optionCardDescription: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
    marginBottom: spacing.sm,
  },
  optionCardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  optionCardActionText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.white,
    marginRight: spacing.xs,
  },
  miniTimeline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  miniTimelineStep: {
    width: 30,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  miniTimelineText: {
    fontSize: fontSize.xs,
    color: colors.white,
    opacity: 0.9,
  },
  sectionContainer: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
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
    marginBottom: spacing.sm,
  },
  seeAllText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.student,
  },
  filtersContainer: {
    paddingRight: spacing.xl,
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 25,
    marginRight: spacing.sm,
  },
  filterChipText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  guidesContainer: {
    paddingRight: spacing.xl,
    paddingVertical: spacing.sm,
  },
  guideCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.md,
    width: 200,
    marginRight: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  guideIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  guideTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  guideDetails: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  guideDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  guideDetailText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  guideReadText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  orientationCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  cardTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  cardTypeBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  cardDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  exploreText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginRight: spacing.xs,
  },
  jobCardsContainer: {
    marginTop: spacing.sm,
  },
  jobCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  jobIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  jobTextContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  jobDomain: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  advisorCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.md,
    marginRight: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    width: 220,
  },
  advisorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  advisorImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.student,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  advisorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.sm,
  },
  advisorInitials: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  advisorInfo: {
    flex: 1,
  },
  advisorName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  advisorTitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  advisorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  advisorRatingText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  advisorButton: {
    backgroundColor: colors.student,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
    alignItems: 'center',
  },
  advisorButtonText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.white,
  },
});

export default OrientationScreen; 