import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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

// Career paths by category
const CAREER_PATHS = {
  tech: {
    title: "Technologie",
    icon: "laptop",
    color: "#4A6FFF",
    careers: [
      { title: "Développeur Full Stack", match: 95 },
      { title: "Data Scientist", match: 88 },
      { title: "Ingénieur DevOps", match: 82 }
    ],
    education: ["Informatique", "Génie Logiciel", "Sciences des Données"],
    internships: [1, 3, 4]
  },
  business: {
    title: "Business & Management",
    icon: "chart-line",
    color: "#FF6B6B",
    careers: [
      { title: "Chef de Projet Digital", match: 90 },
      { title: "Consultant Business", match: 85 },
      { title: "Entrepreneur", match: 80 }
    ],
    education: ["Commerce", "Management", "Finance"],
    internships: [2, 5]
  },
  arts: {
    title: "Arts & Design",
    icon: "palette",
    color: "#8F57FF",
    careers: [
      { title: "Designer UX/UI", match: 92 },
      { title: "Directeur Artistique", match: 87 },
      { title: "Concepteur Multimédia", match: 83 }
    ],
    education: ["Design", "Arts Numériques", "Communication Visuelle"],
    internships: [5]
  },
  science: {
    title: "Sciences & Recherche",
    icon: "microscope",
    color: "#33B679",
    careers: [
      { title: "Chercheur Scientifique", match: 94 },
      { title: "Analyste de Données", match: 89 },
      { title: "Ingénieur R&D", match: 85 }
    ],
    education: ["Physique", "Biologie", "Chimie", "Mathématiques"],
    internships: [6, 7]
  },
  health: {
    title: "Santé",
    icon: "hospital-box",
    color: "#EA4335",
    careers: [
      { title: "Médecin", match: 93 },
      { title: "Pharmacien", match: 88 },
      { title: "Ingénieur Biomédical", match: 82 }
    ],
    education: ["Médecine", "Pharmacie", "Biologie Médicale"],
    internships: [8, 9]
  }
};

const OrientationResultsScreen = ({ navigation, route }) => {
  const [topCategories, setTopCategories] = useState([]);
  const [tagSummary, setTagSummary] = useState({});
  const userAnswers = route.params?.answers || [];
  
  useEffect(() => {
    // Analyze user answers to determine top career categories
    const tagCounts = {};
    
    userAnswers.forEach(answer => {
      answer.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    // Get top tags for display
    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, count]) => ({
        tag,
        percentage: Math.round((count / userAnswers.length) * 100)
      }));
    
    setTagSummary(sortedTags);
    
    // Map tags to main categories
    const categoryMapping = {
      "tech": "tech",
      "engineering": "tech",
      "science": "science",
      "research": "science",
      "business": "business",
      "management": "business",
      "finance": "business",
      "marketing": "business",
      "arts": "arts",
      "design": "arts",
      "creative": "arts",
      "health": "health",
      "medicine": "health",
      "biology": "science"
    };
    
    // Get unique main categories
    const categories = [...new Set(
      Object.keys(tagCounts)
        .map(tag => categoryMapping[tag] || tag)
    )]
    .filter(category => CAREER_PATHS[category])
    .slice(0, 3); // Limit to top 3 categories
    
    setTopCategories(categories);
  }, [userAnswers]);

  const handleExploreCareer = (category) => {
    navigation.navigate("CareerPaths", { category });
  };

  const handleExploreInternships = () => {
    navigation.goBack();
    navigation.navigate("Internships");
  };

  // Generate recommendation text based on top categories
  const getRecommendationText = () => {
    if (topCategories.length === 0) return "";
    
    if (topCategories.length === 1) {
      return `Vous avez un profil fortement orienté vers le domaine ${CAREER_PATHS[topCategories[0]].title}.`;
    } else {
      const domains = topCategories.map(cat => CAREER_PATHS[cat].title).join(" et ");
      return `Votre profil montre un équilibre entre les domaines ${domains}.`;
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
        colors={[colors.universityStudent, "#4776E6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vos Résultats</Text>
        </View>
        
        <View style={styles.headerInfo}>
          <Icon name="check-circle-outline" size={20} color={colors.white} />
          <Text style={styles.headerInfoText}>Test complété avec succès</Text>
        </View>
      </LinearGradient>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Results Summary */}
        <View style={styles.resultsSummary}>
          <Text style={styles.congratsText}>
            Félicitations ! Voici les domaines qui correspondent à votre profil.
          </Text>
          <Text style={styles.recommendationText}>
            {getRecommendationText()}
          </Text>
          
          {/* Tag Percentage Summary */}
          {tagSummary.length > 0 && (
            <View style={styles.tagSummaryContainer}>
              {tagSummary.map((item, index) => (
                <View key={index} style={styles.tagItem}>
                  <Text style={styles.tagName}>{item.tag}</Text>
                  <View style={styles.tagBarContainer}>
                    <View 
                      style={[styles.tagBar, { width: `${item.percentage}%`, backgroundColor: colors.universityStudent }]} 
                    />
                  </View>
                  <Text style={styles.tagPercentage}>{item.percentage}%</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        {/* Career Matches */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Vos Meilleurs Domaines</Text>
          {topCategories.map((category, index) => (
            <View key={category} style={styles.careerCategory}>
              <LinearGradient
                colors={[CAREER_PATHS[category].color, `${CAREER_PATHS[category].color}99`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.categoryHeader}
              >
                <View style={styles.categoryIconContainer}>
                  <Icon name={CAREER_PATHS[category].icon} size={24} color="#FFF" />
                </View>
                <Text style={styles.categoryTitle}>{CAREER_PATHS[category].title}</Text>
                <View style={styles.matchContainer}>
                  <Text style={styles.matchText}>{95 - index * 10}%</Text>
                  <Text style={styles.matchLabel}>match</Text>
                </View>
              </LinearGradient>
              
              <View style={styles.categoryContent}>
                <Text style={styles.subsectionTitle}>Métiers recommandés</Text>
                {CAREER_PATHS[category].careers.map((career, i) => (
                  <View key={i} style={styles.careerItem}>
                    <Icon name="briefcase" size={16} color={CAREER_PATHS[category].color} />
                    <Text style={styles.careerItemText}>{career.title}</Text>
                    <Text style={styles.careerItemMatch}>{career.match}%</Text>
                  </View>
                ))}
                
                <Text style={styles.subsectionTitle}>Formations recommandées</Text>
                {CAREER_PATHS[category].education.map((edu, i) => (
                  <View key={i} style={styles.educationItem}>
                    <Icon name="school-outline" size={16} color={CAREER_PATHS[category].color} />
                    <Text style={styles.educationItemText}>{edu}</Text>
                  </View>
                ))}
                
                <TouchableOpacity 
                  style={styles.exploreButton}
                  onPress={() => handleExploreCareer(category)}
                >
                  <Text style={styles.exploreButtonText}>Explorer ce domaine</Text>
                  <Icon name="arrow-right" size={16} color={CAREER_PATHS[category].color} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        
        {/* Next Steps Section */}
        <View style={styles.nextStepsContainer}>
          <Text style={styles.sectionTitle}>Prochaines Étapes</Text>
          
          <View style={styles.nextStepCard}>
            <View style={styles.nextStepIconContainer}>
              <Icon name="briefcase-search" size={24} color={colors.white} />
            </View>
            <View style={styles.nextStepContent}>
              <Text style={styles.nextStepTitle}>Explorer les stages</Text>
              <Text style={styles.nextStepDescription}>
                Découvrez des opportunités de stage adaptées à votre profil et à vos intérêts.
              </Text>
              <TouchableOpacity 
                style={styles.nextStepButton}
                onPress={handleExploreInternships}
              >
                <Text style={styles.nextStepButtonText}>Voir les stages</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.nextStepCard}>
            <View style={[styles.nextStepIconContainer, { backgroundColor: "#FF6B6B" }]}>
              <Icon name="school" size={24} color={colors.white} />
            </View>
            <View style={styles.nextStepContent}>
              <Text style={styles.nextStepTitle}>Explorer les formations</Text>
              <Text style={styles.nextStepDescription}>
                Trouvez les écoles et formations qui correspondent à vos objectifs professionnels.
              </Text>
              <TouchableOpacity 
                style={styles.nextStepButton}
                onPress={() => navigation.navigate("Schools")}
              >
                <Text style={styles.nextStepButtonText}>Voir les écoles</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 15,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfoText: {
    color: colors.white,
    opacity: 0.9,
    fontSize: fontSize.sm,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  resultsSummary: {
    padding: 20,
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  congratsText: {
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    lineHeight: lineHeight.lg,
    textAlign: 'center',
  },
  recommendationText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: lineHeight.md,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 15,
  },
  careerCategory: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
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
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    flex: 1,
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  matchContainer: {
    alignItems: 'center',
  },
  matchText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  matchLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: fontSize.xs,
  },
  categoryContent: {
    padding: 15,
  },
  subsectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 10,
    marginTop: 15,
  },
  careerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  careerItemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  careerItemMatch: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.universityStudent,
  },
  educationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  educationItemText: {
    marginLeft: 10,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
  },
  exploreButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginRight: 5,
    color: colors.textPrimary,
  },
  nextStepsContainer: {
    padding: 20,
    marginBottom: 30,
  },
  nextStepCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
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
  nextStepIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.universityStudent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  nextStepContent: {
    flex: 1,
  },
  nextStepTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 5,
  },
  nextStepDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: lineHeight.sm,
    marginBottom: 12,
  },
  nextStepButton: {
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  nextStepButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.universityStudent,
  },
  tagSummaryContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: colors.gray50,
    borderRadius: 12,
  },
  tagItem: {
    marginBottom: 12,
  },
  tagName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  tagBarContainer: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    marginVertical: 6,
  },
  tagBar: {
    height: '100%',
    borderRadius: 4,
  },
  tagPercentage: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    color: colors.universityStudent,
    textAlign: 'right',
  },
});

export default OrientationResultsScreen; 