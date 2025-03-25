import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight, lineHeight } from '../../theme/typography';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

// Sample data for alumni testimonials
const TESTIMONIALS = [
  {
    id: '1',
    name: 'Mohammed Alami',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    graduation: '2020',
    role: 'Data Scientist @ IBM',
    content: "Cette école m'a offert une excellente formation technique et m'a aidé à trouver mon premier emploi à travers son réseau d'entreprises partenaires."
  },
  {
    id: '2',
    name: 'Fatima Zahra',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    graduation: '2019',
    role: 'Ingénieur Logiciel @ Microsoft',
    content: "Le programme était intensif mais les compétences acquises m'ont permis de me démarquer sur le marché du travail international."
  }
];

// Sample data for job opportunities
const JOBS = [
  {
    id: '1',
    company: 'OCP Group',
    position: 'Ingénieur Industriel',
    logo: 'https://via.placeholder.com/100x100/1E88E5/FFFFFF?text=OCP',
    location: 'Casablanca',
    salary: '15000-20000 MAD'
  },
  {
    id: '2',
    company: 'Maroc Telecom',
    position: 'Développeur Full Stack',
    logo: 'https://via.placeholder.com/100x100/7E57C2/FFFFFF?text=MT',
    location: 'Rabat',
    salary: '12000-18000 MAD'
  },
  {
    id: '3',
    company: 'Royal Air Maroc',
    position: 'Analyste de Données',
    logo: 'https://via.placeholder.com/100x100/26C6DA/FFFFFF?text=RAM',
    location: 'Casablanca',
    salary: '14000-17000 MAD'
  }
];

const SchoolDetailsScreen = ({ route, navigation }) => {
  const { school } = route.params;
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <Text style={styles.descriptionText}>{school.description}</Text>
            
            <View style={styles.keyDetailsContainer}>
              <View style={styles.keyDetail}>
                <Icon name="currency-usd" size={24} color={colors.universityStudent} />
                <Text style={styles.keyDetailValue}>{school.fees}</Text>
                <Text style={styles.keyDetailLabel}>Frais Annuels</Text>
              </View>
              
              <View style={styles.keyDetail}>
                <Icon name="account-check" size={24} color={colors.universityStudent} />
                <Text style={styles.keyDetailValue}>{school.admissionRate}</Text>
                <Text style={styles.keyDetailLabel}>Taux d'Admission</Text>
              </View>
              
              <View style={styles.keyDetail}>
                <Icon name="star" size={24} color={colors.warning} />
                <Text style={styles.keyDetailValue}>{school.rating}</Text>
                <Text style={styles.keyDetailLabel}>Évaluation</Text>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Facilités</Text>
            <View style={styles.facilitiesContainer}>
              <View style={styles.facilityItem}>
                <Icon name="wifi" size={24} color={colors.universityStudent} />
                <Text style={styles.facilityText}>WiFi Campus</Text>
              </View>
              
              <View style={styles.facilityItem}>
                <Icon name="library" size={24} color={colors.universityStudent} />
                <Text style={styles.facilityText}>Bibliothèque</Text>
              </View>
              
              <View style={styles.facilityItem}>
                <Icon name="food" size={24} color={colors.universityStudent} />
                <Text style={styles.facilityText}>Cafétéria</Text>
              </View>
              
              <View style={styles.facilityItem}>
                <Icon name="laptop" size={24} color={colors.universityStudent} />
                <Text style={styles.facilityText}>Laboratoires</Text>
              </View>
              
              <View style={styles.facilityItem}>
                <Icon name="domain" size={24} color={colors.universityStudent} />
                <Text style={styles.facilityText}>Résidences</Text>
              </View>
              
              <View style={styles.facilityItem}>
                <Icon name="volleyball" size={24} color={colors.universityStudent} />
                <Text style={styles.facilityText}>Terrains de Sport</Text>
              </View>
            </View>
          </View>
        );
        
      case 'programs':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Filières</Text>
            
            {school.programs && school.programs.map((program, index) => (
              <View key={index} style={styles.programCard}>
                <View style={styles.programHeader}>
                  <Text style={styles.programName}>{program}</Text>
                  <View style={styles.programBadge}>
                    <Text style={styles.programBadgeText}>Accrédité</Text>
                  </View>
                </View>
                
                <View style={styles.programDetails}>
                  <View style={styles.programDetail}>
                    <Icon name="clock-outline" size={16} color={colors.universityStudent} />
                    <Text style={styles.programDetailText}>3-5 ans</Text>
                  </View>
                  
                  <View style={styles.programDetail}>
                    <Icon name="book-open-variant" size={16} color={colors.universityStudent} />
                    <Text style={styles.programDetailText}>Diplôme d'État</Text>
                  </View>
                  
                  <View style={styles.programDetail}>
                    <Icon name="translate" size={16} color={colors.universityStudent} />
                    <Text style={styles.programDetailText}>FR/EN</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.programButton}>
                  <Text style={styles.programButtonText}>Voir les détails</Text>
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Voir toutes les filières</Text>
              <Icon name="chevron-right" size={16} color={colors.universityStudent} />
            </TouchableOpacity>
          </View>
        );
      
      case 'contact':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Coordonnées</Text>
            
            <View style={styles.contactCard}>
              <View style={styles.contactItem}>
                <Icon name="phone" size={20} color={colors.universityStudent} />
                <Text style={styles.contactText}>{school.contact}</Text>
                <TouchableOpacity style={styles.contactActionButton}>
                  <Icon name="phone" size={18} color={colors.white} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.contactItem}>
                <Icon name="email" size={20} color={colors.universityStudent} />
                <Text style={styles.contactText}>{school.email}</Text>
                <TouchableOpacity style={styles.contactActionButton}>
                  <Icon name="email-outline" size={18} color={colors.white} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.contactItem}>
                <Icon name="web" size={20} color={colors.universityStudent} />
                <Text style={styles.contactText}>{school.website}</Text>
                <TouchableOpacity style={styles.contactActionButton}>
                  <Icon name="open-in-new" size={18} color={colors.white} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.contactItem}>
                <Icon name="map-marker" size={20} color={colors.universityStudent} />
                <Text style={styles.contactText}>{school.address}</Text>
                <TouchableOpacity style={styles.contactActionButton}>
                  <Icon name="map-marker-outline" size={18} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Horaires</Text>
            <View style={styles.scheduleCard}>
              <View style={styles.scheduleItem}>
                <Text style={styles.scheduleDay}>Lundi - Vendredi</Text>
                <Text style={styles.scheduleHours}>08:30 - 18:00</Text>
              </View>
              <View style={styles.scheduleItem}>
                <Text style={styles.scheduleDay}>Samedi</Text>
                <Text style={styles.scheduleHours}>09:00 - 13:00</Text>
              </View>
              <View style={styles.scheduleItem}>
                <Text style={styles.scheduleDay}>Dimanche</Text>
                <Text style={styles.scheduleHours}>Fermé</Text>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Réseaux Sociaux</Text>
            <View style={styles.socialContainer}>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#3b5998' }]}>
                <Icon name="facebook" size={20} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1da1f2' }]}>
                <Icon name="twitter" size={20} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#0077b5' }]}>
                <Icon name="linkedin" size={20} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#ff0000' }]}>
                <Icon name="youtube" size={20} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#c32aa3' }]}>
                <Icon name="instagram" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 'campus':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Campus</Text>
            
            {school.campuses && school.campuses.map((campus, index) => (
              <View key={index} style={styles.campusCard}>
                <View style={styles.campusHeader}>
                  <View style={styles.campusCity}>
                    <Icon name="city" size={22} color={colors.universityStudent} />
                    <Text style={styles.campusCityText}>{campus.city}</Text>
                  </View>
                  <TouchableOpacity style={styles.mapButton}>
                    <Text style={styles.mapButtonText}>Voir sur la carte</Text>
                    <Icon name="map-marker-radius" size={16} color={colors.universityStudent} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.campusInfo}>
                  <View style={styles.campusInfoItem}>
                    <Icon name="map-marker" size={18} color={colors.textSecondary} />
                    <Text style={styles.campusInfoText}>{campus.address}</Text>
                  </View>
                  
                  <View style={styles.campusInfoItem}>
                    <Icon name="phone" size={18} color={colors.textSecondary} />
                    <Text style={styles.campusInfoText}>{campus.tel}</Text>
                  </View>
                </View>
                
                <View style={styles.campusImageContainer}>
                  <Image 
                    source={{ uri: `https://via.placeholder.com/600x200/1E88E5/FFFFFF?text=Campus+${campus.city}` }}
                    style={styles.campusImage}
                    resizeMode="cover"
                  />
                </View>
                
                <View style={styles.campusFooter}>
                  <TouchableOpacity style={styles.campusAction}>
                    <Icon name="phone" size={16} color={colors.universityStudent} />
                    <Text style={styles.campusActionText}>Appeler</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.campusAction}>
                    <Icon name="email" size={16} color={colors.universityStudent} />
                    <Text style={styles.campusActionText}>Email</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.campusAction}>
                    <Icon name="directions" size={16} color={colors.universityStudent} />
                    <Text style={styles.campusActionText}>Itinéraire</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        
      case 'careers':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Témoignages d'Anciens</Text>
            
            {TESTIMONIALS.map((testimonial) => (
              <View key={testimonial.id} style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <Image
                    source={{ uri: testimonial.avatar }}
                    style={styles.testimonialAvatar}
                  />
                  <View style={styles.testimonialMeta}>
                    <Text style={styles.testimonialName}>{testimonial.name}</Text>
                    <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                    <Text style={styles.testimonialGraduation}>Promotion {testimonial.graduation}</Text>
                  </View>
                </View>
                <Text style={styles.testimonialContent}>"{testimonial.content}"</Text>
              </View>
            ))}
            
            <Text style={styles.sectionTitle}>Opportunités d'Emploi</Text>
            
            {JOBS.map((job) => (
              <View key={job.id} style={styles.jobCard}>
                <Image
                  source={{ uri: job.logo }}
                  style={styles.jobLogo}
                />
                <View style={styles.jobInfo}>
                  <Text style={styles.jobPosition}>{job.position}</Text>
                  <Text style={styles.jobCompany}>{job.company}</Text>
                  <View style={styles.jobMeta}>
                    <View style={styles.jobMetaItem}>
                      <Icon name="map-marker" size={14} color={colors.gray500} />
                      <Text style={styles.jobMetaText}>{job.location}</Text>
                    </View>
                    <View style={styles.jobMetaItem}>
                      <Icon name="currency-usd" size={14} color={colors.gray500} />
                      <Text style={styles.jobMetaText}>{job.salary}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.jobButton}>
                  <Icon name="arrow-right" size={20} color={colors.white} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: school.image || "https://via.placeholder.com/800x400/1E88E5/FFFFFF?text=School" }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent']}
          style={styles.headerGradient}
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.shareButton}>
          <Icon name="share-variant" size={20} color={colors.white} />
        </View>
        
        <View style={styles.favoriteButton}>
          <Icon name="heart-outline" size={20} color={colors.white} />
        </View>
      </View>
      
      {/* School Info Header */}
      <View style={styles.infoHeader}>
        <View style={[styles.schoolIconContainer, {backgroundColor: school.color}]}>
          <Icon name={school.icon} size={28} color="#FFF" />
        </View>
        
        <View style={styles.schoolInfoContainer}>
          <Text style={styles.schoolName}>{school.name}</Text>
          <View style={styles.schoolMeta}>
            <View style={styles.metaItem}>
              <Icon name="map-marker" size={14} color={colors.gray500} />
              <Text style={styles.metaText}>{school.location}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Icon name="school-outline" size={14} color={colors.gray500} />
              <Text style={styles.metaText}>{school.type}</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollView}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]} 
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              Aperçu
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
            style={[styles.tab, activeTab === 'contact' && styles.activeTab]} 
            onPress={() => setActiveTab('contact')}
          >
            <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>
              Contact
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'campus' && styles.activeTab]} 
            onPress={() => setActiveTab('campus')}
          >
            <Text style={[styles.tabText, activeTab === 'campus' && styles.activeTabText]}>
              Campus
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'careers' && styles.activeTab]} 
            onPress={() => setActiveTab('careers')}
          >
            <Text style={[styles.tabText, activeTab === 'careers' && styles.activeTabText]}>
              Carrières
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      {/* Tab Content */}
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderTabContent()}
      </ScrollView>
      
      {/* Apply Button */}
      <View style={styles.applyContainer}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Demander l'admission</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    right: 70,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoHeader: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  schoolIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  schoolInfoContainer: {
    flex: 1,
  },
  schoolName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 5,
  },
  schoolMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  tabsContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  tabsScrollView: {
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 15,
    marginRight: 20,
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: 15,
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: lineHeight.md,
    marginBottom: 20,
  },
  keyDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  keyDetail: {
    alignItems: 'center',
    flex: 1,
  },
  keyDetailValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  keyDetailLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  facilityItem: {
    width: (width - 60) / 3,
    alignItems: 'center',
    padding: 12,
    marginBottom: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
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
  facilityText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  programCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
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
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  programName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    flex: 1,
  },
  programBadge: {
    backgroundColor: 'rgba(40, 199, 111, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  programBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.success,
  },
  programDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  programDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  programDetailText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  programButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  programButtonText: {
    fontSize: fontSize.sm,
    color: colors.universityStudent,
    fontWeight: fontWeight.medium,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  viewAllText: {
    fontSize: fontSize.md,
    color: colors.universityStudent,
    fontWeight: fontWeight.medium,
    marginRight: 5,
  },
  testimonialCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
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
  testimonialHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  testimonialAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  testimonialMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  testimonialName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  testimonialRole: {
    fontSize: fontSize.sm,
    color: colors.universityStudent,
    marginBottom: 2,
  },
  testimonialGraduation: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  testimonialContent: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: lineHeight.md,
  },
  jobCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
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
  jobLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  jobInfo: {
    flex: 1,
  },
  jobPosition: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  jobCompany: {
    fontSize: fontSize.sm,
    color: colors.universityStudent,
    marginBottom: 4,
  },
  jobMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  jobMetaText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  jobButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.universityStudent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  applyButton: {
    backgroundColor: colors.universityStudent,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  
  // Contact tab styles
  contactCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  contactText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginLeft: 15,
  },
  contactActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.universityStudent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
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
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  scheduleDay: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  scheduleHours: {
    fontSize: fontSize.md,
    color: colors.universityStudent,
    fontWeight: fontWeight.medium,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  // Campus tab styles
  campusCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
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
  campusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  campusCity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  campusCityText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginLeft: 10,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  mapButtonText: {
    fontSize: fontSize.sm,
    color: colors.universityStudent,
    marginRight: 5,
  },
  campusInfo: {
    padding: 15,
  },
  campusInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  campusInfoText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginLeft: 10,
    flex: 1,
  },
  campusImageContainer: {
    width: '100%',
    height: 150,
  },
  campusImage: {
    width: '100%',
    height: '100%',
  },
  campusFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  campusAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: colors.gray100,
  },
  campusActionText: {
    fontSize: fontSize.sm,
    color: colors.universityStudent,
    marginLeft: 6,
  }
});

export default SchoolDetailsScreen; 