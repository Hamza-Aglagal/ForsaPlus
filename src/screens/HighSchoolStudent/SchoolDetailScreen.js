import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Linking,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const InfoItem = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <Icon name={icon} size={20} color={colors.student} style={styles.infoIcon} />
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const ProgramItem = ({ title, duration, degree, description }) => (
  <View style={styles.programItem}>
    <View style={styles.programHeader}>
      <Text style={styles.programTitle}>{title}</Text>
      <View style={styles.programBadge}>
        <Text style={styles.programBadgeText}>{duration}</Text>
      </View>
    </View>
    <Text style={styles.programDegree}>{degree}</Text>
    <Text style={styles.programDescription}>{description}</Text>
  </View>
);

const ReviewItem = ({ name, date, rating, comment, avatar }) => (
  <View style={styles.reviewItem}>
    <View style={styles.reviewHeader}>
      <View style={styles.reviewUser}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.reviewAvatar} />
        ) : (
          <View style={styles.reviewAvatarPlaceholder}>
            <Text style={styles.reviewAvatarText}>{name.charAt(0)}</Text>
          </View>
        )}
        <View>
          <Text style={styles.reviewName}>{name}</Text>
          <Text style={styles.reviewDate}>{date}</Text>
        </View>
      </View>
      <View style={styles.reviewRating}>
        {Array(5).fill().map((_, i) => (
          <Icon 
            key={i} 
            name={i < rating ? "star" : "star-outline"} 
            size={16} 
            color={i < rating ? "#FFB400" : colors.gray400} 
            style={{ marginLeft: 2 }}
          />
        ))}
      </View>
    </View>
    <Text style={styles.reviewComment}>{comment}</Text>
  </View>
);

const SchoolDetailScreen = ({ route, navigation }) => {
  // In a real app, you would fetch this data from an API or pass it via route params
  // For now, we'll use static data
  const schoolId = route.params?.schoolId || '1';
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [selectedCampus, setSelectedCampus] = useState(0);

  const schoolData = {
    id: schoolId,
    name: 'École Nationale Supérieure Informatique et d Analyse des Systèmes',
    shortName: 'ENSIAS',
    type: 'École d ingénieurs',
    rating: 4.8,
    fees: 'Public',
    website: 'http://ensias.um5.ac.ma',
    phone: '+212 5377-17731',
    email: 'contact@ensias.ma',
    foundedYear: '1992',
    studentsCount: '1200+',
    description: 'L ENSIAS est une grande école d ingénieurs marocaine spécialisée dans les domaines de lInformatique et des systèmes d information. Elle forme des ingénieurs de haut niveau dans différentes spécialités informatiques et technologies émergentes.',
    admissionInfo: 'L admission se fait par voie de concours national commun (CNC) pour les classes préparatoires, et sur dossier pour les titulaires dune licence en informatique ou mathématiques.',
    campuses: [
      {
        id: '1',
        name: 'Campus principal - Rabat',
        location: 'Rabat',
        address: 'Avenue Mohammed Ben Abdallah Regragui, Madinat Al Irfane, Rabat',
        contact: '+212 5377-17731',
        email: 'contact@ensias.ma',
        coordinates: {
          latitude: 33.9716,
          longitude: -6.8498
        },
        programs: [
          {
            id: '1',
            title: 'Génie Logiciel',
            duration: '3 ans',
            degree: 'Diplôme d Ingénieur d État',
            description: 'Formation en développement de logiciels, architecture des systèmes d information, et gestion de projets informatiques.'
          },
          {
            id: '2',
            title: 'Intelligence Artificielle',
            duration: '3 ans',
            degree: 'Diplôme d Ingénieur d État',
            description: 'Formation spécialisée en intelligence artificielle, machine learning, traitement de données massives et systèmes experts.'
          },
          {
            id: '3',
            title: 'Cybersécurité',
            duration: '3 ans',
            degree: 'Diplôme d Ingénieur d État',
            description: 'Formation en sécurité informatique, cryptographie, audit et gouvernance des systèmes d information.'
          }
        ],
        facilities: ['Bibliothèque', 'Laboratoires informatiques', 'Cafétéria', 'Espaces de travail collaboratif']
      },
      {
        id: '2',
        name: 'Campus Annexe - Casablanca',
        location: 'Casablanca',
        address: '25 Rue Ahmed El Figuigui, Casablanca',
        contact: '+212 522-456789',
        email: 'ensias.casa@ensias.ma',
        coordinates: {
          latitude: 33.5731,
          longitude: -7.5898
        },
        programs: [
          {
            id: '4',
            title: 'Cloud Computing',
            duration: '3 ans',
            degree: 'Diplôme d Ingénieur d État',
            description: 'Formation en technologies cloud, infrastructures distribuées et services numériques.'
          },
          {
            id: '5',
            title: 'Data Science',
            duration: '3 ans',
            degree: 'Diplôme d Ingénieur d État',
            description: 'Formation en analyse de données, statistiques avancées et techniques de valorisation des données massives.'
          }
        ],
        facilities: ['Espace de coworking', 'Laboratoires d innovation', 'Incubateur de startups']
      }
    ],
    reviews: [
      {
        id: '1',
        name: 'Ahmed Tazi',
        date: 'Mai 2023',
        rating: 5,
        comment: 'Excellente école avec un corps professoral de qualité. La formation est rigoureuse et correspond bien aux besoins du marché du travail.',
        avatar: null
      },
      {
        id: '2',
        name: 'Salma Bennani',
        date: 'Mars 2023',
        rating: 4,
        comment: 'Très bonne formation technique. Cependant, les infrastructures pourraient être améliorées pour offrir un meilleur cadre d apprentissage.',
        avatar: null
      }
    ],
    image: null,
    gallery: [null, null, null]  // In a real app, these would be image URLs
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const openWebsite = () => {
    if (schoolData.website) {
      Linking.openURL(schoolData.website);
    }
  };

  const callSchool = () => {
    const phone = schoolData.campuses[selectedCampus]?.contact || schoolData.phone;
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const emailSchool = () => {
    const email = schoolData.campuses[selectedCampus]?.email || schoolData.email;
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  const applyToSchool = () => {
    // In a real app, this would navigate to an application form
    alert('Fonctionnalité de candidature à venir!');
  };

  const selectedCampusData = schoolData.campuses[selectedCampus];

  const CampusSelector = () => (
    <View style={styles.campusSelector}>
      <Text style={styles.campusSelectorTitle}>Campus disponibles</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.campusSelectorContainer}
      >
        {schoolData.campuses.map((campus, index) => (
          <TouchableOpacity 
            key={campus.id}
            style={[
              styles.campusOption,
              selectedCampus === index && styles.campusOptionSelected
            ]}
            onPress={() => setSelectedCampus(index)}
          >
            <Icon 
              name="map-marker-outline" 
              size={18} 
              color={selectedCampus === index ? colors.white : colors.student} 
            />
            <Text 
              style={[
                styles.campusOptionText,
                selectedCampus === index && styles.campusOptionTextSelected
              ]}
            >
              {campus.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Icon 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={colors.white} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* School Hero */}
        <View style={styles.schoolHero}>
          <View style={styles.schoolImageContainer}>
            {schoolData.image ? (
              <Image source={{ uri: schoolData.image }} style={styles.schoolImage} />
            ) : (
              <LinearGradient
                colors={[colors.student, colors.student + 'AA']}
                style={styles.schoolImagePlaceholder}
              >
                <Text style={styles.schoolImageText}>{schoolData.shortName || schoolData.name.charAt(0)}</Text>
              </LinearGradient>
            )}
          </View>

          <View style={styles.schoolHeroInfo}>
            <Text style={styles.schoolName}>{schoolData.name}</Text>
            
            <View style={styles.schoolBasicInfo}>
              <View style={styles.schoolType}>
                <Text style={styles.schoolTypeText}>{schoolData.type}</Text>
              </View>
              
              <View style={styles.schoolRating}>
                <Icon name="star" size={16} color="#FFB400" />
                <Text style={styles.ratingText}>{schoolData.rating}</Text>
              </View>
            </View>

            <View style={styles.schoolLocation}>
              <Icon name="map-marker" size={16} color={colors.textSecondary} />
              <Text style={styles.locationText}>{schoolData.campuses.length} campus disponibles</Text>
            </View>
          </View>
        </View>

        {/* Campus Selector if multiple campuses exist */}
        {schoolData.campuses.length > 1 && <CampusSelector />}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={openWebsite}>
            <Icon name="web" size={22} color={colors.student} />
            <Text style={styles.actionText}>Site web</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={callSchool}>
            <Icon name="phone" size={22} color={colors.student} />
            <Text style={styles.actionText}>Appeler</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={emailSchool}>
            <Icon name="email" size={22} color={colors.student} />
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Icon name="share-variant" size={22} color={colors.student} />
            <Text style={styles.actionText}>Partager</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>
              Info
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'programs' && styles.activeTab]}
            onPress={() => setActiveTab('programs')}
          >
            <Text style={[styles.tabText, activeTab === 'programs' && styles.activeTabText]}>
              Filières
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
              Avis
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'gallery' && styles.activeTab]}
            onPress={() => setActiveTab('gallery')}
          >
            <Text style={[styles.tabText, activeTab === 'gallery' && styles.activeTabText]}>
              Photos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {/* Info Tab */}
          {activeTab === 'info' && (
            <View>
              <Text style={styles.sectionTitle}>À propos</Text>
              <Text style={styles.descriptionText}>{schoolData.description}</Text>

              <Text style={styles.sectionTitle}>Informations sur le campus</Text>
              <InfoItem 
                icon="map-marker" 
                label="Adresse" 
                value={selectedCampusData.address} 
              />
              <InfoItem 
                icon="phone" 
                label="Téléphone" 
                value={selectedCampusData.contact || schoolData.phone} 
              />
              <InfoItem 
                icon="email" 
                label="Email" 
                value={selectedCampusData.email || schoolData.email} 
              />
              <InfoItem 
                icon="calendar" 
                label="Année de fondation" 
                value={schoolData.foundedYear} 
              />
              <InfoItem 
                icon="account-group" 
                label="Nombre d'étudiants" 
                value={schoolData.studentsCount} 
              />
              <InfoItem 
                icon="cash" 
                label="Frais" 
                value={schoolData.fees} 
              />

              <Text style={styles.sectionTitle}>Installations</Text>
              <View style={styles.facilitiesContainer}>
                {selectedCampusData.facilities.map((facility, index) => (
                  <View key={index} style={styles.facilityItem}>
                    <Icon name="check-circle" size={16} color={colors.success} />
                    <Text style={styles.facilityText}>{facility}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.sectionTitle}>Admission</Text>
              <Text style={styles.descriptionText}>{schoolData.admissionInfo}</Text>
            </View>
          )}

          {/* Programs Tab */}
          {activeTab === 'programs' && (
            <View>
              <Text style={styles.sectionTitle}>
                Programmes disponibles à {selectedCampusData.name}
              </Text>
              {selectedCampusData.programs.map(program => (
                <ProgramItem 
                  key={program.id}
                  title={program.title}
                  duration={program.duration}
                  degree={program.degree}
                  description={program.description}
                />
              ))}
            </View>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <View>
              <View style={styles.reviewsHeader}>
                <Text style={styles.sectionTitle}>Avis des étudiants</Text>
                <View style={styles.overallRating}>
                  <Text style={styles.overallRatingScore}>{schoolData.rating}</Text>
                  <View style={styles.starsContainer}>
                    {Array(5).fill().map((_, i) => (
                      <Icon 
                        key={i} 
                        name="star" 
                        size={16} 
                        color={i < Math.floor(schoolData.rating) ? "#FFB400" : colors.gray300} 
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewsCount}>{schoolData.reviews.length} avis</Text>
                </View>
              </View>

              {schoolData.reviews.map(review => (
                <ReviewItem 
                  key={review.id}
                  name={review.name}
                  date={review.date}
                  rating={review.rating}
                  comment={review.comment}
                  avatar={review.avatar}
                />
              ))}
            </View>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <View style={styles.galleryContainer}>
              <Text style={styles.sectionTitle}>Photos de l'établissement</Text>
              <Text style={styles.emptyGalleryText}>Photos à venir</Text>
            </View>
          )}
        </View>

        {/* Apply Button */}
        <View style={styles.applyContainer}>
          <TouchableOpacity 
            style={styles.applyToSchoolButton}
            onPress={applyToSchool}
          >
            <LinearGradient
              colors={colors.studentGradient.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.applyButtonGradient}
            >
              <Text style={styles.applyToSchoolButtonText}>
                S'informer sur les admissions
              </Text>
              <Icon name="arrow-right" size={20} color={colors.white} />
            </LinearGradient>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolHero: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  schoolImageContainer: {
    height: 200,
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
    fontSize: 60,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  schoolHeroInfo: {
    padding: spacing.lg,
  },
  schoolName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  schoolBasicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  schoolType: {
    backgroundColor: colors.student + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 4,
    marginRight: spacing.md,
  },
  schoolTypeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.student,
  },
  schoolRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    marginLeft: spacing.xs / 2,
  },
  schoolLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.xs / 2,
  },
  quickActions: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginTop: spacing.sm,
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
  },
  actionText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginTop: spacing.lg,
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    padding: spacing.xs,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.student + '20',
  },
  tabText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  activeTabText: {
    color: colors.student,
  },
  tabContent: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingBottom: 80, // Space for fixed apply button
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  descriptionText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    width: '50%',
    marginBottom: spacing.md,
  },
  infoIcon: {
    marginRight: spacing.sm,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  programItem: {
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
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  programTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  programBadge: {
    backgroundColor: colors.student + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 4,
  },
  programBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.student,
  },
  programDegree: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  programDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  reviewsHeader: {
    marginBottom: spacing.md,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  overallRatingScore: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginRight: spacing.md,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewsCount: {
    fontSize: fontSize.sm,
    color: colors.textTertiary,
    marginLeft: spacing.sm,
  },
  reviewItem: {
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
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  reviewAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.student + '40',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  reviewAvatarText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.student,
  },
  reviewName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  reviewDate: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewComment: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  applyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  applyToSchoolButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  applyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  applyToSchoolButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
    marginRight: spacing.sm,
  },
  campusSelector: {
    backgroundColor: colors.gray100,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  campusSelectorTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginLeft: spacing.lg,
    marginBottom: spacing.sm,
  },
  campusSelectorContainer: {
    paddingHorizontal: spacing.lg,
  },
  campusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.student,
  },
  campusOptionSelected: {
    backgroundColor: colors.student,
  },
  campusOptionText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.student,
    marginLeft: 4,
  },
  campusOptionTextSelected: {
    color: colors.white,
  },
  facilitiesContainer: {
    marginBottom: spacing.lg,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  facilityText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  galleryContainer: {
    marginBottom: spacing.lg,
  },
  emptyGalleryText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SchoolDetailScreen; 