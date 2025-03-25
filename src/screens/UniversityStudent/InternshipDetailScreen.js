import React, { useState } from 'react';
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
import { fontSize, fontWeight } from '../../theme/typography';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const InternshipDetailScreen = ({ navigation, route }) => {
  const [isSaved, setIsSaved] = useState(false);
  const internshipId = route?.params?.internshipId || 1;
  
  // Mock internship data - in a real app, this would come from an API
  const internship = {
    id: internshipId,
    company: "SQLI",
    position: "Développeur Frontend React",
    location: "Rabat, Maroc",
    type: "Stage",
    duration: "3 mois",
    deadline: "30 Juin 2023",
    salary: "3500 MAD / mois",
    logo: "code-tags",
    color: "#4A6FFF",
    description: "SQLI recherche un développeur frontend React stagiaire pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants pour nos clients dans divers secteurs.",
    responsibilities: [
      "Développer des interfaces utilisateur réactives et intuitives",
      "Collaborer avec les designers et les développeurs backend",
      "Assurer la qualité du code et la performance des applications",
      "Participer aux revues de code et aux réunions d'équipe"
    ],
    requirements: [
      "En cours de formation en développement web / informatique",
      "Connaissance de base de JavaScript et React",
      "Familiarité avec HTML, CSS et les principes de conception responsive",
      "Capacité à travailler en équipe et à apprendre rapidement"
    ],
    benefits: [
      "Environnement de travail stimulant et formation continue",
      "Possibilité d'embauche après le stage",
      "Horaires flexibles",
      "Événements d'entreprise réguliers"
    ],
    companyInfo: "SQLI est une entreprise internationale de services numériques qui accompagne les entreprises dans leur transformation digitale. Avec plus de 2000 collaborateurs dans 13 pays, SQLI combine expertise technique et créativité pour concevoir des solutions innovantes."
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
  };

  const handleApply = () => {
    // Handle application logic
    alert('Application submitted!');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={internship.color}
      />
      
      {/* Header */}
      <LinearGradient
        colors={[internship.color, `${internship.color}CC`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleSaveToggle} style={styles.saveButton}>
            <Icon 
              name={isSaved ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color="#FFF" 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.companyContainer}>
          <View style={styles.logoContainer}>
            <Icon name={internship.logo} size={32} color="#FFF" />
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{internship.company}</Text>
            <Text style={styles.positionTitle}>{internship.position}</Text>
          </View>
        </View>
        
        <View style={styles.quickInfoContainer}>
          <View style={styles.quickInfoItem}>
            <Icon name="map-marker" size={18} color="#FFF" />
            <Text style={styles.quickInfoText}>{internship.location}</Text>
          </View>
          <View style={styles.quickInfoItem}>
            <Icon name="calendar-range" size={18} color="#FFF" />
            <Text style={styles.quickInfoText}>{internship.duration}</Text>
          </View>
          <View style={styles.quickInfoItem}>
            <Icon name="currency-usd" size={18} color="#FFF" />
            <Text style={styles.quickInfoText}>{internship.salary}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{internship.description}</Text>
        </View>
        
        <View style={styles.divider} />
        
        {/* Responsibilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Responsabilités</Text>
          {internship.responsibilities.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.divider} />
        
        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prérequis</Text>
          {internship.requirements.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.divider} />
        
        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avantages</Text>
          {internship.benefits.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.divider} />
        
        {/* Company Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos de l'entreprise</Text>
          <Text style={styles.descriptionText}>{internship.companyInfo}</Text>
        </View>
        
        {/* Application Deadline */}
        <View style={styles.deadlineContainer}>
          <Icon name="clock-outline" size={20} color={colors.textSecondary} />
          <Text style={styles.deadlineText}>
            Date limite de candidature: <Text style={styles.deadlineDate}>{internship.deadline}</Text>
          </Text>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.moreInfoButton}>
            <Text style={styles.moreInfoButtonText}>Plus d'infos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <LinearGradient
              colors={[internship.color, `${internship.color}DD`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.applyButtonGradient}
            >
              <Text style={styles.applyButtonText}>Postuler maintenant</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  saveButton: {
    padding: 8,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    marginBottom: 4,
  },
  positionTitle: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  quickInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 8,
  },
  quickInfoText: {
    color: colors.white,
    fontSize: fontSize.sm,
    marginLeft: 6,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.universityStudent,
    marginTop: 8,
    marginRight: 10,
  },
  listItemText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 136, 229, 0.08)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  deadlineText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    marginLeft: 10,
  },
  deadlineDate: {
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  moreInfoButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.universityStudent,
    borderRadius: 12,
    paddingVertical: 14,
    marginRight: 12,
  },
  moreInfoButtonText: {
    color: colors.universityStudent,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
  },
  applyButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  applyButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  applyButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
  },
});

export default InternshipDetailScreen; 