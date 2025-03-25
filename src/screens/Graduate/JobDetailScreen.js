import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  Linking,
  Share
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';

const { width } = Dimensions.get('window');

// Sample job description for demonstration purposes
const jobDescription = `
Notre client, leader dans le secteur de la technologie, recherche un(e) Développeur Full Stack expérimenté(e) pour rejoindre son équipe de développement.

Responsabilités:
• Concevoir, développer et maintenir des applications web et mobiles
• Collaborer avec les équipes produit et design pour définir les fonctionnalités
• Participer à la conception technique et à l'architecture des solutions
• Assurer la qualité du code via des tests unitaires et d'intégration
• Contribuer à l'amélioration continue des processus de développement

Exigences:
• 3+ ans d'expérience en développement Full Stack
• Maîtrise de JavaScript/TypeScript, React, Node.js
• Expérience avec les bases de données relationnelles et NoSQL
• Connaissance des méthodes agiles et des pratiques DevOps
• Bonnes compétences en communication et travail d'équipe

Avantages:
• Salaire compétitif et avantages sociaux
• Possibilité de télétravail partiel
• Formation continue et développement professionnel
• Environnement de travail stimulant et innovant
• Projets variés et challenges techniques intéressants
`;

const JobDetailScreen = ({ navigation, route }) => {
  const { job } = route.params || {
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
    category: 'Tech',
    description: jobDescription
  };
  
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  
  const handleSave = () => {
    setIsSaved(!isSaved);
  };
  
  const handleApply = () => {
    setIsApplied(true);
    // In a real app, this would submit an application to the API
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Découvrez cette offre d'emploi sur ForsaPlus: ${job.title} chez ${job.company}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const handleCompanyWebsite = () => {
    // In a real app, this would open the company website
    Linking.openURL('https://example.com');
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
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={colors.white} />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle} numberOfLines={1}>{job.title}</Text>
            <Text style={styles.headerSubtitle}>{job.company}</Text>
          </View>
          
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Icon name="share-variant" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Company Info */}
        <View style={styles.companyContainer}>
          <Image source={{ uri: job.logo }} style={styles.companyLogo} />
          
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{job.company}</Text>
            <TouchableOpacity 
              style={styles.websiteButton}
              onPress={handleCompanyWebsite}
            >
              <Text style={styles.websiteButtonText}>Voir le site</Text>
              <Icon name="open-in-new" size={14} color={colors.graduate} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.matchContainer}>
            <Text style={styles.matchLabel}>Match</Text>
            <Text style={styles.matchValue}>{job.matched}%</Text>
            <View style={styles.matchBarContainer}>
              <View style={[styles.matchBar, { width: `${job.matched}%` }]} />
            </View>
          </View>
        </View>
        
        {/* Job Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <View style={[styles.detailIcon, { backgroundColor: colors.graduate + '15' }]}>
                <Icon name="map-marker" size={20} color={colors.graduate} />
              </View>
              <View>
                <Text style={styles.detailLabel}>Lieu</Text>
                <Text style={styles.detailValue}>{job.location}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <View style={[styles.detailIcon, { backgroundColor: colors.tertiary + '15' }]}>
                <Icon name="briefcase-outline" size={20} color={colors.tertiary} />
              </View>
              <View>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{job.type}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <View style={[styles.detailIcon, { backgroundColor: colors.secondary + '15' }]}>
                <Icon name="currency-usd" size={20} color={colors.secondary} />
              </View>
              <View>
                <Text style={styles.detailLabel}>Salaire</Text>
                <Text style={styles.detailValue}>{job.salary}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <View style={[styles.detailIcon, { backgroundColor: colors.primary + '15' }]}>
                <Icon name="clock-outline" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.detailLabel}>Posté</Text>
                <Text style={styles.detailValue}>Il y a {job.posted}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Tags */}
        <View style={styles.tagsContainer}>
          <Text style={styles.sectionTitle}>Compétences requises</Text>
          <View style={styles.tagsList}>
            {job.tags?.map((tag, index) => (
              <View key={index} style={styles.tagItem}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description du poste</Text>
          <Text style={styles.descriptionText}>{job.description || jobDescription}</Text>
        </View>
        
        {/* Similar Jobs */}
        <View style={styles.similarJobsContainer}>
          <Text style={styles.sectionTitle}>Emplois similaires</Text>
          <Text style={styles.sectionSubtitle}>Basés sur votre profil et vos préférences</Text>
          
          {/* This would be a horizontal list of job cards in a real app */}
          <View style={styles.similarJobCard}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/2.jpg' }} 
              style={styles.similarJobLogo} 
            />
            <View style={styles.similarJobInfo}>
              <Text style={styles.similarJobTitle}>Développeur Frontend React</Text>
              <Text style={styles.similarJobCompany}>Digital Agency</Text>
              <View style={styles.similarJobDetails}>
                <Text style={styles.similarJobLocation}>Casablanca</Text>
                <Text style={styles.similarJobSalary}>12k-20k MAD</Text>
              </View>
            </View>
            <View style={styles.similarJobMatch}>
              <Text style={styles.similarJobMatchText}>85%</Text>
            </View>
          </View>
          
          <View style={styles.similarJobCard}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/3.jpg' }} 
              style={styles.similarJobLogo} 
            />
            <View style={styles.similarJobInfo}>
              <Text style={styles.similarJobTitle}>Développeur Backend Node.js</Text>
              <Text style={styles.similarJobCompany}>TechSolutions</Text>
              <View style={styles.similarJobDetails}>
                <Text style={styles.similarJobLocation}>Rabat</Text>
                <Text style={styles.similarJobSalary}>15k-22k MAD</Text>
              </View>
            </View>
            <View style={styles.similarJobMatch}>
              <Text style={styles.similarJobMatchText}>78%</Text>
            </View>
          </View>
        </View>
        
        {/* Bottom padding for scrollview */}
        <View style={{ height: 100 }} />
      </ScrollView>
      
      {/* Action buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Icon 
            name={isSaved ? "bookmark" : "bookmark-outline"} 
            size={26} 
            color={colors.graduate} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={handleApply}
          disabled={isApplied}
        >
          <LinearGradient
            colors={isApplied ? ['#6B6B6B', '#9B9B9B'] : [colors.graduate, '#1E8E7E']}
            style={styles.applyButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.applyButtonText}>
              {isApplied ? 'Candidature envoyée' : 'Postuler maintenant'}
            </Text>
            {!isApplied && <Icon name="send" size={18} color={colors.white} />}
          </LinearGradient>
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
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
    marginTop: 2,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: -30,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  companyInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  companyName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  websiteButtonText: {
    fontSize: fontSize.xs,
    color: colors.graduate,
    marginRight: 4,
  },
  matchContainer: {
    alignItems: 'center',
  },
  matchLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  matchValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.graduate,
  },
  matchBarContainer: {
    width: 50,
    height: 4,
    backgroundColor: colors.gray100,
    borderRadius: 2,
    marginTop: 4,
  },
  matchBar: {
    height: '100%',
    backgroundColor: colors.graduate,
    borderRadius: 2,
  },
  detailsContainer: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  detailLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
  },
  tagsContainer: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagItem: {
    backgroundColor: colors.graduate + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.graduate,
    fontWeight: fontWeight.medium,
  },
  descriptionContainer: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  descriptionText: {
    fontSize: fontSize.sm,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  similarJobsContainer: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  similarJobCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  similarJobLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  similarJobInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  similarJobTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  similarJobCompany: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  similarJobDetails: {
    flexDirection: 'row',
  },
  similarJobLocation: {
    fontSize: fontSize.xxs,
    color: colors.textTertiary,
    marginRight: spacing.md,
  },
  similarJobSalary: {
    fontSize: fontSize.xxs,
    color: colors.textTertiary,
  },
  similarJobMatch: {
    backgroundColor: colors.graduate + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  similarJobMatchText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
    color: colors.graduate,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  saveButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.graduate,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  applyButton: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  applyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  applyButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginRight: spacing.sm,
  },
});

export default JobDetailScreen; 