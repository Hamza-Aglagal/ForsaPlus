import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight, lineHeight } from '../../theme/typography';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

// Sample user data - could be fetched from profile or context
const USER_DATA = {
  name: "Mohammed Hamza",
  email: "m.hamza@student.emsi.ma",
  phone: "+212 612 345 678",
  university: "EMSI - École Marocaine des Sciences de l'Ingénieur",
  major: "Génie Informatique",
  hasCV: false, // This would be true if user already has a CV
};

const CV_TEMPLATES = [
  {
    id: "modern",
    name: "Moderne",
    image: "https://via.placeholder.com/120x160/1E88E5/FFFFFF?text=Moderne",
    color: "#1E88E5"
  },
  {
    id: "classic",
    name: "Classique",
    image: "https://via.placeholder.com/120x160/33B679/FFFFFF?text=Classique",
    color: "#33B679"
  },
  {
    id: "creative",
    name: "Créatif",
    image: "https://via.placeholder.com/120x160/FF6B6B/FFFFFF?text=Creatif",
    color: "#FF6B6B"
  }
];

const CV_SECTIONS = [
  { id: 'info', title: 'Informations Personnelles', icon: 'account', isCompleted: false },
  { id: 'education', title: 'Formation', icon: 'school', isCompleted: false },
  { id: 'experience', title: 'Expérience Professionnelle', icon: 'briefcase', isCompleted: false },
  { id: 'skills', title: 'Compétences', icon: 'lightbulb-on', isCompleted: false },
  { id: 'languages', title: 'Langues', icon: 'translate', isCompleted: false },
  { id: 'projects', title: 'Projets', icon: 'layers', isCompleted: false },
];

const CVScreen = ({ navigation, setActiveTab }) => {
  const [userData] = useState(USER_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [step, setStep] = useState(0); // 0: main screen, 1: upload, 2: create

  const handleBackPress = () => {
    if (step > 0) {
      setStep(0);
      return;
    }
    
    if (setActiveTab) {
      setActiveTab('Home');
    } else {
      navigation.goBack();
    }
  };

  const handleCVUpload = () => {
    // This would trigger native file picker
    console.log('Upload CV');
  };

  const renderMainScreen = () => (
    <>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>
            {userData.hasCV ? "Votre CV est prêt!" : "Créez votre CV professionnel"}
          </Text>
          <Text style={styles.welcomeDescription}>
            {userData.hasCV 
              ? "Vous pouvez le modifier, le partager ou en créer un nouveau." 
              : "Un CV bien conçu augmente vos chances d'obtenir un stage ou un emploi."}
          </Text>
        </View>
        <Image 
          source={{ uri: "https://via.placeholder.com/120/4776E6/FFFFFF?text=CV" }} 
          style={styles.welcomeImage}
        />
      </View>

      {/* Options */}
      <View style={styles.optionsSection}>
        {userData.hasCV && (
          <TouchableOpacity style={styles.optionCard}>
            <LinearGradient
              colors={[colors.universityStudent, '#4776E6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.optionGradient}
            >
              <View style={styles.optionContent}>
                <Icon name="file-document-outline" size={32} color="#FFF" />
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>Voir mon CV</Text>
                  <Text style={styles.optionDescription}>Consulter et partager votre CV actuel</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => setStep(1)}
        >
          <View style={styles.optionContent}>
            <View style={[styles.optionIcon, { backgroundColor: '#4A6FFF' }]}>
              <Icon name="file-upload-outline" size={28} color="#FFF" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitleDark}>Importer un CV</Text>
              <Text style={styles.optionDescriptionDark}>Téléchargez votre CV existant (PDF)</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => setStep(2)}
        >
          <View style={styles.optionContent}>
            <View style={[styles.optionIcon, { backgroundColor: '#FF6B6B' }]}>
              <Icon name="file-plus-outline" size={28} color="#FFF" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitleDark}>Créer un CV</Text>
              <Text style={styles.optionDescriptionDark}>Remplissez les informations étape par étape</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* CV Tips */}
      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>Conseils pour votre CV</Text>
        <View style={styles.tipCard}>
          <Icon name="lightbulb-outline" size={20} color="#FFB400" />
          <Text style={styles.tipText}>
            Adaptez votre CV à chaque offre en mettant en avant les compétences pertinentes.
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Icon name="lightbulb-outline" size={20} color="#FFB400" />
          <Text style={styles.tipText}>
            Utilisez des mots-clés correspondant à l'offre d'emploi visée.
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Icon name="lightbulb-outline" size={20} color="#FFB400" />
          <Text style={styles.tipText}>
            Quantifiez vos réalisations avec des chiffres et des résultats concrets.
          </Text>
        </View>
      </View>
    </>
  );

  const renderUploadScreen = () => (
    <View style={styles.uploadSection}>
      <View style={styles.uploadContainer}>
        <View style={styles.uploadIconContainer}>
          <Icon name="file-upload-outline" size={60} color={colors.universityStudent} />
        </View>
        <Text style={styles.uploadTitle}>Importer votre CV</Text>
        <Text style={styles.uploadDescription}>
          Formats supportés: PDF, DOC, DOCX{'\n'}
          Taille maximum: 5 MB
        </Text>
        
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={handleCVUpload}
        >
          <Text style={styles.uploadButtonText}>Sélectionner un fichier</Text>
          <Icon name="file-search-outline" size={20} color="#FFF" />
        </TouchableOpacity>
        
        <Text style={styles.uploadNote}>
          Votre CV sera analysé et les informations seront extraites automatiquement.
        </Text>
      </View>
    </View>
  );

  const renderCreateScreen = () => (
    <>
      {/* Template Selection */}
      <View style={styles.createSection}>
        <Text style={styles.sectionTitle}>Choisissez un modèle</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.templatesContainer}
        >
          {CV_TEMPLATES.map(template => (
            <TouchableOpacity 
              key={template.id}
              style={[
                styles.templateCard,
                selectedTemplate === template.id && styles.selectedTemplateCard
              ]}
              onPress={() => setSelectedTemplate(template.id)}
            >
              <Image 
                source={{ uri: template.image }} 
                style={styles.templateImage}
              />
              <Text style={styles.templateName}>{template.name}</Text>
              {selectedTemplate === template.id && (
                <View style={[styles.selectedIndicator, { borderColor: template.color }]}>
                  <Icon name="check" size={16} color={template.color} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* CV Sections */}
      <View style={styles.sectionsSection}>
        <Text style={styles.sectionTitle}>Complétez les sections</Text>
        <View style={styles.sectionsContainer}>
          {CV_SECTIONS.map(section => (
            <TouchableOpacity key={section.id} style={styles.sectionCard}>
              <View style={[styles.sectionIconContainer, { backgroundColor: section.isCompleted ? 'rgba(76, 175, 80, 0.1)' : 'rgba(30, 136, 229, 0.1)' }]}>
                <Icon 
                  name={section.icon} 
                  size={22} 
                  color={section.isCompleted ? '#4CAF50' : colors.universityStudent} 
                />
              </View>
              <View style={styles.sectionInfo}>
                <Text style={styles.sectionCardTitle}>{section.title}</Text>
                <Text style={styles.sectionStatus}>
                  {section.isCompleted ? 'Complété' : 'À compléter'}
                </Text>
              </View>
              <Icon 
                name="chevron-right" 
                size={22} 
                color={colors.gray400} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.previewButton}>
          <Text style={styles.previewButtonText}>Aperçu</Text>
          <Icon name="eye-outline" size={20} color={colors.universityStudent} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton}>
          <LinearGradient
            colors={[colors.universityStudent, '#4776E6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButtonGradient}
          >
            <Text style={styles.saveButtonText}>Enregistrer le CV</Text>
            <Icon name="content-save" size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );

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
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {step === 0 ? "Gérer votre CV" : 
             step === 1 ? "Importer un CV" : "Créer un CV"}
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {step === 0 && renderMainScreen()}
        {step === 1 && renderUploadScreen()}
        {step === 2 && renderCreateScreen()}
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
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  welcomeSection: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    margin: 16,
    padding: 16,
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
  welcomeContent: {
    flex: 1,
    paddingRight: 10,
  },
  welcomeTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  welcomeDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: lineHeight.md,
  },
  welcomeImage: {
    width: 90,
    height: 120,
    borderRadius: 8,
  },
  optionsSection: {
    paddingHorizontal: 16,
    marginBottom:
    16,
  },
  optionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  optionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 16,
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: 4,
  },
  optionTitleDark: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  optionDescriptionDark: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  tipsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  tipText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 10,
    flex: 1,
  },
  uploadSection: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  uploadContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
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
  uploadIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  uploadDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: colors.universityStudent,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal:
    20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginRight: 8,
  },
  uploadNote: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: lineHeight.md,
  },
  createSection: {
    padding: 16,
  },
  templatesContainer: {
    paddingVertical: 8,
  },
  templateCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    alignItems: 'center',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedTemplateCard: {
    borderWidth: 2,
    borderColor: colors.universityStudent,
  },
  templateImage: {
    width: 120,
    height: 160,
    borderRadius: 6,
    marginBottom: 8,
  },
  templateName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  sectionsSection: {
    padding: 16,
  },
  sectionsContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  sectionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionInfo: {
    flex: 1,
  },
  sectionCardTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  sectionStatus: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 8,
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 12,
  },
  previewButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.universityStudent,
    marginRight: 8,
  },
  saveButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.white,
    marginRight: 8,
  }
});

export default CVScreen; 