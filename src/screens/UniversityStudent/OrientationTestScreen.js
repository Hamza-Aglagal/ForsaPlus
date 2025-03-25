import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight, lineHeight } from '../../theme/typography';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const OrientationTestScreen = ({ navigation }) => {
  // Features of the test
  const features = [
    {
      id: '1',
      title: 'Découvrez vos intérêts',
      description: 'Identifiez vos domaines dintérêt et vos aptitudes naturelles pour guider votre parcours professionnel.',
      icon: 'lightbulb-on-outline',
      color: colors.universityGradient.blue[0]
    },
    {
      id: '2',
      title: 'Explorez des carrières',
      description: 'Explorez les métiers et secteurs qui correspondent à votre profil et vos aspirations.',
      icon: 'briefcase-search',
      color: colors.universityGradient.purple[0]
    },
    {
      id: '3',
      title: 'Trouvez votre parcours',
      description: 'Obtenez des recommandations personnalisées pour votre formation et vos stages.',
      icon: 'map-marker-path',
      color: colors.universityGradient.indigo[0]
    }
  ];

  // Career categories for quick selection
  const careerCategories = [
    { id: 'tech', name: 'Technologie', icon: 'laptop', color: '#4A6FFF' },
    { id: 'business', name: 'Business', icon: 'chart-line', color: '#FF6B6B' },
    { id: 'science', name: 'Sciences', icon: 'flask', color: '#33B679' },
    { id: 'arts', name: 'Arts & Design', icon: 'palette', color: '#8F57FF' },
    { id: 'health', name: 'Santé', icon: 'medical-bag', color: '#FF9D4C' },
    { id: 'education', name: 'Éducation', icon: 'school', color: '#00BCD4' }
  ];

  const startTest = () => {
    // Use the navigate function passed through props
    navigation.navigate("OrientationQuestions", { step: 1, answers: [] });
  };

  const exploreCategoryPath = (category) => {
    navigation.navigate("CareerPaths", { category });
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orientation Professionnelle</Text>
      </LinearGradient>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Trouvez votre voie professionnelle</Text>
            <Text style={styles.heroSubtitle}>
              Découvrez les carrières qui correspondent le mieux à votre profil, vos compétences et vos aspirations.
            </Text>
            
            <TouchableOpacity style={styles.startButton} onPress={startTest}>
              <LinearGradient
                colors={[colors.universityStudent, '#4776E6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.startButtonGradient}
              >
                <Text style={styles.startButtonText}>Commencer le test</Text>
                <Icon name="arrow-right" size={20} color={colors.white} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/200x200/4776E6/FFFFFF?text=Orientation' }} 
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>
        </View>
        
        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Comment ça fonctionne</Text>
          
          {features.map((feature, index) => (
            <View key={feature.id} style={styles.featureCard}>
              <View style={[styles.featureIconContainer, { backgroundColor: feature.color }]}>
                <Icon name={feature.icon} size={28} color={colors.white} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Quick Exploration */}
        <View style={styles.exploreSection}>
          <Text style={styles.sectionTitle}>Explorer par domaine</Text>
          <Text style={styles.exploreSubtitle}>
            Parcourez directement les domaines qui vous intéressent
          </Text>
          
          <View style={styles.categoriesGrid}>
            {careerCategories.map(category => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
                onPress={() => exploreCategoryPath(category.id)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Icon name={category.icon} size={24} color={colors.white} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Test Info */}
        <View style={styles.testInfoSection}>
          <LinearGradient
            colors={['rgba(30, 136, 229, 0.1)', 'rgba(30, 136, 229, 0.05)']}
            style={styles.testInfoCard}
          >
            <Icon name="information-outline" size={24} color={colors.universityStudent} style={styles.infoIcon} />
            <Text style={styles.testInfoText}>
              Le test prend environ 5-10 minutes à compléter. Vos réponses nous aideront à vous proposer des parcours adaptés à votre profil.
            </Text>
          </LinearGradient>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: lineHeight.md,
    marginBottom: 20,
  },
  imageContainer: {
    width: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 5,
    width: '90%',
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  startButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginRight: 8,
  },
  featuresSection: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 15,
    padding: 15,
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
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: lineHeight.sm,
  },
  exploreSection: {
    padding: 20,
  },
  exploreSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: -15,
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%',
    backgroundColor: colors.white,
    borderRadius: 12,
    alignItems: 'center',
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
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  testInfoSection: {
    padding: 20,
    marginBottom: 30,
  },
  testInfoCard: {
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 15,
  },
  testInfoText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: lineHeight.sm,
  }
});

export default OrientationTestScreen; 