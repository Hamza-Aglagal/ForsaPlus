import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  Platform,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight, lineHeight } from '../../theme/typography';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

// Sample data for schools
const SCHOOLS = [
  {
    id: '1',
    name: "EMSI - École Marocaine des Sciences de l'Ingénieur",
    location: "Casablanca",
    type: "Privé",
    rating: 4.5,
    image: "https://via.placeholder.com/400x200/1E88E5/FFFFFF?text=EMSI",
    fees: "45000 MAD/an",
    programs: ["Génie Informatique", "Génie Civil", "Génie Industriel"],
    admissionRate: "75%",
    icon: "school",
    color: colors.universityGradient.blue[0],
    description: "L'EMSI est une grande école d'ingénieurs qui a pour vocation de former des ingénieurs polyvalents, entreprenants et innovants.",
    contact: "+212 522 25 14 10",
    website: "www.emsi.ma",
    email: "contact@emsi.ma",
    address: "237, Bd Ghandi, Casablanca",
    campuses: [
      {
        city: "Casablanca",
        address: "237, Bd Ghandi, Casablanca",
        tel: "+212 522 25 14 10"
      },
      {
        city: "Rabat",
        address: "11, Avenue Al Abtal, Agdal, Rabat",
        tel: "+212 537 67 17 71"
      },
      {
        city: "Marrakech",
        address: "Bd Prince My Abdellah, Marrakech",
        tel: "+212 524 48 14 18"
      }
    ]
  },
  {
    id: '2',
    name: "ENSIAS - École Nationale Supérieure d'Informatique et d'Analyse des Systèmes",
    location: "Rabat",
    type: "Public",
    rating: 4.7,
    image: "https://via.placeholder.com/400x200/3949AB/FFFFFF?text=ENSIAS",
    fees: "5000 MAD/an",
    programs: ["Génie Logiciel", "Data Science", "Cybersécurité"],
    admissionRate: "15%",
    icon: "laptop",
    color: colors.universityGradient.primary[1],
    description: "L'ENSIAS est l'école d'ingénieurs de référence au Maroc dans le domaine des technologies de l'information et de la communication.",
    contact: "+212 537 77 72 57",
    website: "www.ensias.ma",
    email: "contact@ensias.ma",
    address: "Avenue Mohammed Ben Abdallah Regragui, Madinat Al Irfane, BP 713, Agdal Rabat",
    campuses: [
      {
        city: "Rabat",
        address: "Avenue Mohammed Ben Abdallah Regragui, Madinat Al Irfane, BP 713, Agdal Rabat",
        tel: "+212 537 77 72 57"
      }
    ]
  },
  {
    id: '3',
    name: "ISCAE - Institut Supérieur de Commerce et d'Administration des Entreprises",
    location: "Casablanca",
    type: "Public",
    rating: 4.6,
    image: "https://via.placeholder.com/400x200/7E57C2/FFFFFF?text=ISCAE",
    fees: "6000 MAD/an",
    programs: ["Finance", "Marketing", "Commerce International"],
    admissionRate: "20%",
    icon: "bank",
    color: colors.universityGradient.purple[0],
    description: "L'ISCAE est l'un des plus prestigieux établissements d'enseignement de gestion au Maroc, formant les futurs leaders du monde des affaires.",
    contact: "+212 522 33 54 82",
    website: "www.groupeiscae.ma",
    email: "info@groupeiscae.ma",
    address: "Km 9,5 Route de Nouasseur BP 8114, Casablanca",
    campuses: [
      {
        city: "Casablanca",
        address: "Km 9,5 Route de Nouasseur BP 8114, Casablanca",
        tel: "+212 522 33 54 82"
      },
      {
        city: "Rabat",
        address: "Avenue Allal El Fassi, BP 6533, Rabat",
        tel: "+212 537 67 17 58"
      }
    ]
  },
  {
    id: '4',
    name: "ENCG - École Nationale de Commerce et de Gestion",
    location: "Settat",
    type: "Public",
    rating: 4.3,
    image: "https://via.placeholder.com/400x200/0D47A1/FFFFFF?text=ENCG",
    fees: "4500 MAD/an",
    programs: ["Management", "Commerce", "Finance", "Audit"],
    admissionRate: "30%",
    icon: "chart-line",
    color: colors.universityGradient.indigo[0],
    description: "L'ENCG forme des cadres spécialisés en commerce et gestion pour répondre aux besoins des entreprises nationales et internationales.",
    contact: "+212 523 40 13 62",
    website: "www.encgsettat.ma",
    email: "contact@encgsettat.ma",
    address: "Km 3, route de Casablanca BP 658, Settat",
    campuses: [
      {
        city: "Settat",
        address: "Km 3, route de Casablanca BP 658, Settat",
        tel: "+212 523 40 13 62"
      }
    ]
  },
  {
    id: '5',
    name: "ESITH - École Supérieure des Industries du Textile et de l'Habillement",
    location: "Casablanca",
    type: "Public/Privé",
    rating: 4.2,
    image: "https://via.placeholder.com/400x200/26C6DA/FFFFFF?text=ESITH",
    fees: "25000 MAD/an",
    programs: ["Génie Industriel", "Logistique", "Management Textile"],
    admissionRate: "40%",
    icon: "tshirt-crew",
    color: colors.universityGradient.lightBlue[0],
    description: "L'ESITH est spécialisée dans la formation d'ingénieurs et de techniciens supérieurs pour l'industrie textile et de l'habillement.",
    contact: "+212 522 98 13 60",
    website: "www.esith.ac.ma",
    email: "info@esith.ac.ma",
    address: "Route d'El Jadida, Km 8, BP 7731, Casablanca",
    campuses: [
      {
        city: "Casablanca",
        address: "Route d'El Jadida, Km 8, BP 7731, Casablanca",
        tel: "+212 522 98 13 60"
      }
    ]
  }
];

// Filter categories
const CATEGORIES = [
  { id: 'all', name: 'Tous', icon: 'view-grid' },
  { id: 'engineering', name: 'Ingénierie', icon: 'engineer' },
  { id: 'business', name: 'Commerce', icon: 'briefcase' },
  { id: 'public', name: 'Public', icon: 'office-building' },
  { id: 'private', name: 'Privé', icon: 'domain' }
];

// Recommended schools
const RECOMMENDED_SCHOOLS = [
  {
    id: '6',
    name: "ENSAM - École Nationale Supérieure d'Arts et Métiers",
    location: "Casablanca",
    image: "https://via.placeholder.com/400x200/1E88E5/FFFFFF?text=ENSAM",
    rating: 4.8,
    highlights: ["98% Taux d'emploi", "1200+ Étudiants"],
    icon: "factory",
    color: colors.universityGradient.blue[1],
    description: "L'ENSAM forme des ingénieurs pluridisciplinaires capables d'innover et de diriger des projets industriels complexes.",
    contact: "+212 522 56 42 20",
    website: "www.ensam-casa.ma",
    email: "contact@ensam-casa.ma",
    address: "150 Boulevard du Nil, Casablanca",
    type: "Public",
    fees: "4500 MAD/an",
    programs: ["Génie Mécanique", "Génie Industriel", "Génie Électrique"],
    admissionRate: "20%",
    campuses: [
      {
        city: "Casablanca",
        address: "150 Boulevard du Nil, Casablanca",
        tel: "+212 522 56 42 20"
      },
      {
        city: "Meknès",
        address: "BP 4024, Meknès",
        tel: "+212 535 46 71 60"
      }
    ]
  },
  {
    id: '7',
    name: "FST - Faculté des Sciences et Techniques",
    location: "Marrakech",
    image: "https://via.placeholder.com/400x200/29B6F6/FFFFFF?text=FST",
    rating: 4.6,
    highlights: ["Recherche de pointe", "Partenariats internationaux"],
    icon: "atom",
    color: colors.universityGradient.lightBlue[1],
    description: "La FST offre des formations scientifiques et techniques de pointe adaptées aux besoins du marché du travail.",
    contact: "+212 524 43 16 26",
    website: "www.fstm.ac.ma",
    email: "contact@fstm.ac.ma",
    address: "Boulevard Abdelkrim Khattabi, Marrakech",
    type: "Public",
    fees: "2500 MAD/an",
    programs: ["Sciences Mathématiques", "Informatique", "Génie Civil"],
    admissionRate: "40%",
    campuses: [
      {
        city: "Marrakech",
        address: "Boulevard Abdelkrim Khattabi, Marrakech",
        tel: "+212 524 43 16 26"
      }
    ]
  }
];

const SchoolsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Render a regular school card
  const renderSchoolCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.schoolCard}
      onPress={() => navigation.navigate('SchoolDetails', { school: item })}
      activeOpacity={0.9}
    >
      <View style={styles.schoolCardHeader}>
        <View style={[styles.schoolIconContainer, {backgroundColor: item.color}]}>
          <Icon name={item.icon} size={24} color={colors.white} />
        </View>
        <View style={styles.schoolTypeContainer}>
          <Text style={styles.schoolTypeText}>{item.type}</Text>
        </View>
      </View>
      
      <View style={styles.schoolCardBody}>
        <Text style={styles.schoolCardName} numberOfLines={2}>{item.name}</Text>
        
        <View style={styles.schoolCardLocation}>
          <Icon name="map-marker" size={14} color={colors.universityStudent} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        
        <View style={styles.programTags}>
          {item.programs.slice(0, 2).map((program, index) => (
            <View key={index} style={styles.programTag}>
              <Text style={styles.programTagText} numberOfLines={1}>{program}</Text>
            </View>
          ))}
          {item.programs.length > 2 && (
            <View style={styles.moreTag}>
              <Text style={styles.moreTagText}>+{item.programs.length - 2}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.schoolCardFooter}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color={colors.warning} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Détails</Text>
          <Icon name="chevron-right" size={14} color={colors.universityStudent} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Render a recommended school card
  const renderRecommendedCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.recommendedCard}
      onPress={() => navigation.navigate('SchoolDetails', { school: item })}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={[item.color, 'rgba(255,255,255,0.9)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.recommendedGradient}
      >
        <View style={styles.recommendedBadge}>
          <Icon name="star-circle" size={16} color={colors.white} />
          <Text style={styles.recommendedBadgeText}>Recommandé</Text>
        </View>
        
        <View style={styles.recommendedIconContainer}>
          <Icon name={item.icon} size={36} color={colors.white} />
        </View>
        
        <View style={styles.recommendedContent}>
          <Text style={styles.recommendedName} numberOfLines={2}>{item.name}</Text>
          
          <View style={styles.recommendedLocation}>
            <Icon name="map-marker" size={14} color={colors.white} />
            <Text style={styles.recommendedLocationText}>{item.location}</Text>
          </View>
          
          <View style={styles.recommendedHighlights}>
            {item.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightTag}>
                <Icon name="check-circle" size={12} color={colors.success} />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  // Render category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Icon 
        name={item.icon} 
        size={18} 
        color={selectedCategory === item.id ? colors.white : colors.universityStudent} 
      />
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

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Écoles</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="tune-vertical" size={22} color={colors.universityStudent} />
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={colors.gray500} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une école..."
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
      
      {/* Main Content */}
      <FlatList
        ListHeaderComponent={
          <>
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
            
            {/* Recommended Schools Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Écoles Recommandées</Text>
                <TouchableOpacity style={styles.seeAllButton}>
                  <Text style={styles.seeAllText}>Voir tout</Text>
                  <Icon name="chevron-right" size={16} color={colors.universityStudent} />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={RECOMMENDED_SCHOOLS}
                renderItem={renderRecommendedCard}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.recommendedList}
              />
            </View>
            
            {/* All Schools Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Toutes les Écoles</Text>
              </View>
            </View>
          </>
        }
        data={SCHOOLS}
        renderItem={renderSchoolCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.schoolsList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.schoolsRow}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 15,
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
  
  // Categories
  categoriesContainer: {
    marginTop: 15,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
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
    marginLeft: 8,
  },
  categoryTextActive: {
    color: colors.white,
    fontWeight: fontWeight.bold,
  },
  
  // Section Headers
  sectionContainer: {
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: fontSize.sm,
    color: colors.universityStudent,
    fontWeight: fontWeight.medium,
  },
  
  // Recommended Schools
  recommendedList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  recommendedCard: {
    width: width * 0.8,
    height: 160,
    borderRadius: 16,
    marginRight: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  recommendedGradient: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
  },
  recommendedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(40, 199, 111, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  recommendedBadgeText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    marginLeft: 4,
  },
  recommendedIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  recommendedContent: {
    flex: 1,
  },
  recommendedName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: 6,
  },
  recommendedLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recommendedLocationText: {
    fontSize: fontSize.sm,
    color: colors.white,
    marginLeft: 4,
    opacity: 0.9,
  },
  recommendedHighlights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  highlightTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  highlightText: {
    fontSize: fontSize.xs,
    color: colors.white,
    marginLeft: 4,
  },
  
  // All Schools Grid
  schoolsList: {
    padding: 20,
    paddingTop: 5,
  },
  schoolsRow: {
    justifyContent: 'space-between',
  },
  schoolCard: {
    width: (width - 50) / 2,
    backgroundColor: colors.white,
    borderRadius: 16,
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
  schoolCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
  },
  schoolIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolTypeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.gray100,
  },
  schoolTypeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  schoolCardBody: {
    padding: 12,
    paddingTop: 0,
  },
  schoolCardName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 8,
    height: 44,
  },
  schoolCardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  programTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  programTag: {
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 4,
    marginBottom: 4,
    maxWidth: '48%',
  },
  programTagText: {
    fontSize: fontSize.xs,
    color: colors.universityStudent,
  },
  moreTag: {
    backgroundColor: colors.gray100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  moreTagText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: fontWeight.bold,
  },
  schoolCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    padding: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginLeft: 4,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: fontSize.xs,
    color: colors.universityStudent,
    marginRight: 2,
  }
});

export default SchoolsScreen; 