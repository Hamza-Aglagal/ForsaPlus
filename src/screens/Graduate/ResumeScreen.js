import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';

const ResumeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('resume');
  
  const renderContent = () => {
    switch(activeTab) {
      case 'resume':
        return <ResumeTab navigation={navigation} />;
      case 'templates':
        return <TemplatesTab navigation={navigation} />;
      case 'tips':
        return <TipsTab navigation={navigation} />;
      default:
        return <ResumeTab navigation={navigation} />;
    }
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
          <Text style={styles.headerTitle}>CV</Text>
          <Text style={styles.headerSubtitle}>Gérez votre CV professionnel</Text>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'resume' && styles.activeTab]} 
            onPress={() => setActiveTab('resume')}
          >
            <Text style={[styles.tabText, activeTab === 'resume' && styles.activeTabText]}>Mon CV</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'templates' && styles.activeTab]} 
            onPress={() => setActiveTab('templates')}
          >
            <Text style={[styles.tabText, activeTab === 'templates' && styles.activeTabText]}>Modèles</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'tips' && styles.activeTab]} 
            onPress={() => setActiveTab('tips')}
          >
            <Text style={[styles.tabText, activeTab === 'tips' && styles.activeTabText]}>Conseils</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      {/* Content */}
      {renderContent()}
    </View>
  );
};

const ResumeTab = ({ navigation }) => {
  const resumeData = {
    lastUpdated: '15 Mai 2023',
    views: 28,
    downloads: 12,
    completion: 85,
    skills: ['React Native', 'JavaScript', 'UI/UX Design', 'Node.js', 'MongoDB'],
    education: [
      {
        id: '1',
        institution: 'Université Mohammed V',
        degree: 'Master en Informatique',
        year: '2020 - 2022',
      },
      {
        id: '2',
        institution: 'EMSI Casablanca',
        degree: 'Licence en Génie Logiciel',
        year: '2017 - 2020',
      },
    ],
    experience: [
      {
        id: '1',
        company: 'TechMaroc',
        position: 'Développeur Frontend',
        period: 'Jan 2022 - Présent',
        description: 'Développement d\'applications web et mobiles avec React et React Native.',
      },
      {
        id: '2',
        company: 'StartupMa',
        position: 'Stagiaire en développement',
        period: 'Juin 2021 - Déc 2021',
        description: 'Conception et implémentation de fonctionnalités frontend pour une application SaaS.',
      },
    ],
  };
  
  const renderProgressBar = (progress) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {/* Resume Overview */}
      <View style={styles.resumeOverview}>
        <View style={styles.resumeHeader}>
          <View style={styles.resumeIconContainer}>
            <Icon name="file-document-outline" size={32} color={colors.white} />
          </View>
          <View style={styles.resumeInfo}>
            <Text style={styles.resumeTitle}>Mon_CV_2023.pdf</Text>
            <Text style={styles.resumeSubtitle}>Mis à jour le {resumeData.lastUpdated}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="pencil" size={22} color={colors.graduate} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.resumeStatsContainer}>
          <View style={styles.resumeStat}>
            <Text style={styles.resumeStatValue}>{resumeData.views}</Text>
            <Text style={styles.resumeStatLabel}>Vues</Text>
          </View>
          <View style={styles.resumeStat}>
            <Text style={styles.resumeStatValue}>{resumeData.downloads}</Text>
            <Text style={styles.resumeStatLabel}>Téléchargements</Text>
          </View>
          <View style={styles.resumeStat}>
            <Text style={styles.resumeStatValue}>{resumeData.completion}%</Text>
            <Text style={styles.resumeStatLabel}>Complété</Text>
          </View>
        </View>
        
        <View style={styles.resumeActionButtons}>
          <TouchableOpacity style={styles.resumeActionButton}>
            <Icon name="download" size={20} color={colors.graduate} />
            <Text style={styles.resumeActionButtonText}>Télécharger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resumeActionButton}>
            <Icon name="share-variant" size={20} color={colors.graduate} />
            <Text style={styles.resumeActionButtonText}>Partager</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Profile Completion */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Complétion du profil</Text>
          <Text style={styles.completionText}>{resumeData.completion}%</Text>
        </View>
        {renderProgressBar(resumeData.completion)}
        <TouchableOpacity style={styles.completeProfileButton}>
          <Text style={styles.completeProfileButtonText}>Compléter mon profil</Text>
          <Icon name="arrow-right" size={18} color={colors.graduate} />
        </TouchableOpacity>
      </View>
      
      {/* Skills */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Compétences</Text>
          <TouchableOpacity>
            <Icon name="plus-circle-outline" size={22} color={colors.graduate} />
          </TouchableOpacity>
        </View>
        <View style={styles.skillsContainer}>
          {resumeData.skills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* Education */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Formation</Text>
          <TouchableOpacity>
            <Icon name="plus-circle-outline" size={22} color={colors.graduate} />
          </TouchableOpacity>
        </View>
        {resumeData.education.map((edu) => (
          <View key={edu.id} style={styles.resumeItem}>
            <View style={styles.resumeItemDot} />
            <View style={styles.resumeItemContent}>
              <Text style={styles.resumeItemTitle}>{edu.institution}</Text>
              <Text style={styles.resumeItemSubtitle}>{edu.degree}</Text>
              <Text style={styles.resumeItemDate}>{edu.year}</Text>
            </View>
            <TouchableOpacity style={styles.editItemButton}>
              <Icon name="pencil-outline" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      {/* Experience */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Expérience professionnelle</Text>
          <TouchableOpacity>
            <Icon name="plus-circle-outline" size={22} color={colors.graduate} />
          </TouchableOpacity>
        </View>
        {resumeData.experience.map((exp) => (
          <View key={exp.id} style={styles.resumeItem}>
            <View style={styles.resumeItemDot} />
            <View style={styles.resumeItemContent}>
              <Text style={styles.resumeItemTitle}>{exp.company}</Text>
              <Text style={styles.resumeItemSubtitle}>{exp.position}</Text>
              <Text style={styles.resumeItemDate}>{exp.period}</Text>
              <Text style={styles.resumeItemDescription}>{exp.description}</Text>
            </View>
            <TouchableOpacity style={styles.editItemButton}>
              <Icon name="pencil-outline" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      {/* Bottom padding */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const TemplatesTab = ({ navigation }) => {
  const templates = [
    { id: '1', name: 'Moderne', image: 'https://picsum.photos/id/42/300/400' },
    { id: '2', name: 'Professionnel', image: 'https://picsum.photos/id/43/300/400' },
    { id: '3', name: 'Créatif', image: 'https://picsum.photos/id/44/300/400' },
  ];
  
  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.tabDescription}>
        Choisissez parmi nos modèles professionnels pour créer un CV qui se démarque
      </Text>
      
      <View style={styles.templatesContainer}>
        {templates.map((template) => (
          <TouchableOpacity key={template.id} style={styles.templateCard}>
            <Image source={{ uri: template.image }} style={styles.templateImage} />
            <Text style={styles.templateName}>{template.name}</Text>
            <TouchableOpacity style={styles.useTemplateButton}>
              <Text style={styles.useTemplateButtonText}>Utiliser</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Bottom padding */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const TipsTab = ({ navigation }) => {
  const tips = [
    {
      id: '1',
      title: 'Adaptez votre CV à chaque offre',
      description: 'Personnalisez votre CV pour mettre en avant les compétences et expériences pertinentes pour chaque poste auquel vous postulez.',
      icon: 'file-document-edit-outline',
    },
    {
      id: '2',
      title: 'Utilisez des mots-clés pertinents',
      description: 'Beaucoup de recruteurs utilisent des systèmes automatisés pour filtrer les CV. Incluez des mots-clés du secteur et de l\'offre d\'emploi.',
      icon: 'text-search',
    },
    {
      id: '3',
      title: 'Quantifiez vos réalisations',
      description: 'Au lieu de simplement lister vos responsabilités, précisez vos accomplissements avec des chiffres concrets quand c\'est possible.',
      icon: 'chart-line',
    },
  ];
  
  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.tabDescription}>
        Conseils pour optimiser votre CV et augmenter vos chances de décrocher un entretien
      </Text>
      
      {tips.map((tip) => (
        <View key={tip.id} style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <Icon name={tip.icon} size={24} color={colors.graduate} />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipDescription}>{tip.description}</Text>
          </View>
        </View>
      ))}
      
      <TouchableOpacity style={styles.seeMoreButton}>
        <Text style={styles.seeMoreButtonText}>Voir plus de conseils</Text>
        <Icon name="arrow-right" size={18} color={colors.graduate} />
      </TouchableOpacity>
      
      {/* Bottom padding */}
      <View style={{ height: 100 }} />
    </ScrollView>
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
    paddingBottom: spacing.md,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: colors.white,
  },
  tabText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.white,
  },
  activeTabText: {
    color: colors.graduate,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  tabDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  resumeOverview: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resumeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resumeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.graduate,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  resumeTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  resumeSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.graduate + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  resumeStat: {
    alignItems: 'center',
  },
  resumeStatValue: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  resumeStatLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  resumeActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  resumeActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.graduate,
    borderRadius: 8,
    paddingVertical: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  resumeActionButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.graduate,
    marginLeft: 6,
  },
  sectionContainer: {
    marginTop: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  completionText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.graduate,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.gray100,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.graduate,
    borderRadius: 4,
  },
  completeProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  completeProfileButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.graduate,
    marginRight: 4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    backgroundColor: colors.graduate + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  skillText: {
    fontSize: fontSize.xs,
    color: colors.graduate,
    fontWeight: fontWeight.medium,
  },
  resumeItem: {
    flexDirection: 'row',
    marginTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  resumeItemDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.graduate,
    marginTop: 4,
  },
  resumeItemContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  resumeItemTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  resumeItemSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  resumeItemDate: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    marginTop: 2,
  },
  resumeItemDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 4,
  },
  editItemButton: {
    padding: 4,
  },
  templatesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  templateCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  templateImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  templateName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    padding: spacing.sm,
  },
  useTemplateButton: {
    backgroundColor: colors.graduate,
    padding: spacing.sm,
    alignItems: 'center',
  },
  useTemplateButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.white,
  },
  tipCard: {
    flexDirection: 'row',
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
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.graduate + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  seeMoreButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.graduate,
    marginRight: 4,
  },
});

export default ResumeScreen;