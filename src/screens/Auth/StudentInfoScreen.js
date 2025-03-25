import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const StudentInfoScreen = ({ navigation, route }) => {
  const userType = route?.params?.userType || 'highschool';
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    schoolName: '',
    bacType: '',
    bacYear: '',
    bacMention: '',
    userType: userType
  });

  const [activeField, setActiveField] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const bacTypes = [
    'Sciences Mathématiques A',
    'Sciences Mathématiques B', 
    'Sciences Physiques',
    'Sciences de la Vie et de la Terre',
    'Sciences Économiques',
    'Sciences Technologies Électriques',
    'Sciences Technologies Mécaniques',
    'Sciences de Gestion Comptable',
    'Lettres',
    'Sciences Humaines',
    'Arts Appliqués',
    'Sciences Agronomiques',
  ];

  const mentions = [
    'Passable',
    'Assez Bien',
    'Bien',
    'Très Bien',
    'Excellent',
  ];

  // Current year and previous years for bac graduation selection
  const currentYear = new Date().getFullYear();
  const bacYears = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleSubmit = () => {
    // Here you'd normally validate and save the data
    // Navigate to interests screen with the collected data
    navigation.navigate('StudentInterests', { studentInfo: formData });
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.firstName.trim() !== '' && formData.lastName.trim() !== '' && formData.schoolName.trim() !== '';
    } else if (currentStep === 2) {
      return formData.bacType !== '' && formData.bacYear !== '' && formData.bacMention !== '';
    }
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil d'étudiant</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>Étape {currentStep} sur {totalSteps}</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {currentStep === 1 && (
              <View style={styles.stepContainer}>
                <Text style={styles.stepTitle}>Informations personnelles</Text>
                <Text style={styles.stepDescription}>
                  Entrez vos informations personnelles et scolaires pour personnaliser votre expérience
                </Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Prénom</Text>
                  <TextInput
                    style={[
                      styles.input,
                      activeField === 'firstName' && styles.inputActive,
                    ]}
                    placeholder="Votre prénom"
                    placeholderTextColor={colors.textTertiary}
                    value={formData.firstName}
                    onChangeText={(text) => handleInputChange('firstName', text)}
                    onFocus={() => setActiveField('firstName')}
                    onBlur={() => setActiveField(null)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nom</Text>
                  <TextInput
                    style={[
                      styles.input,
                      activeField === 'lastName' && styles.inputActive,
                    ]}
                    placeholder="Votre nom"
                    placeholderTextColor={colors.textTertiary}
                    value={formData.lastName}
                    onChangeText={(text) => handleInputChange('lastName', text)}
                    onFocus={() => setActiveField('lastName')}
                    onBlur={() => setActiveField(null)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Lycée</Text>
                  <TextInput
                    style={[
                      styles.input,
                      activeField === 'schoolName' && styles.inputActive,
                    ]}
                    placeholder="Nom de votre lycée"
                    placeholderTextColor={colors.textTertiary}
                    value={formData.schoolName}
                    onChangeText={(text) => handleInputChange('schoolName', text)}
                    onFocus={() => setActiveField('schoolName')}
                    onBlur={() => setActiveField(null)}
                  />
                </View>
              </View>
            )}

            {currentStep === 2 && (
              <View style={styles.stepContainer}>
                <Text style={styles.stepTitle}>Informations baccalauréat</Text>
                <Text style={styles.stepDescription}>
                  Ces informations nous aideront à vous suggérer les meilleures options pour votre orientation
                </Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Type de baccalauréat</Text>
                  <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                      style={[
                        styles.dropdown,
                        activeField === 'bacType' && styles.inputActive,
                      ]}
                      onPress={() => setActiveField(activeField === 'bacType' ? null : 'bacType')}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          !formData.bacType && styles.dropdownPlaceholderText,
                        ]}
                      >
                        {formData.bacType || 'Sélectionner votre filière'}
                      </Text>
                      <Icon name="chevron-down" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                    {activeField === 'bacType' && (
                      <View style={styles.optionsContainer}>
                        <ScrollView style={styles.optionsScrollView} nestedScrollEnabled={true}>
                          {bacTypes.map((type) => (
                            <TouchableOpacity
                              key={type}
                              style={styles.optionItem}
                              onPress={() => {
                                handleInputChange('bacType', type);
                                setActiveField(null);
                              }}
                            >
                              <Text style={[styles.optionText, formData.bacType === type && styles.selectedOptionText]}>
                                {type}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Année d'obtention</Text>
                  <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                      style={[
                        styles.dropdown,
                        activeField === 'bacYear' && styles.inputActive,
                      ]}
                      onPress={() => setActiveField(activeField === 'bacYear' ? null : 'bacYear')}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          !formData.bacYear && styles.dropdownPlaceholderText,
                        ]}
                      >
                        {formData.bacYear || 'Année d obtention du bac'}
                      </Text>
                      <Icon name="chevron-down" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                    {activeField === 'bacYear' && (
                      <View style={styles.optionsContainer}>
                        <ScrollView style={styles.optionsScrollView} nestedScrollEnabled={true}>
                          {bacYears.map((year) => (
                            <TouchableOpacity
                              key={year}
                              style={styles.optionItem}
                              onPress={() => {
                                handleInputChange('bacYear', year);
                                setActiveField(null);
                              }}
                            >
                              <Text style={[styles.optionText, formData.bacYear === year && styles.selectedOptionText]}>
                                {year}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Mention</Text>
                  <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                      style={[
                        styles.dropdown,
                        activeField === 'bacMention' && styles.inputActive,
                      ]}
                      onPress={() => setActiveField(activeField === 'bacMention' ? null : 'bacMention')}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          !formData.bacMention && styles.dropdownPlaceholderText,
                        ]}
                      >
                        {formData.bacMention || 'Votre mention au bac'}
                      </Text>
                      <Icon name="chevron-down" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                    {activeField === 'bacMention' && (
                      <View style={styles.optionsContainer}>
                        <ScrollView style={styles.optionsScrollView} nestedScrollEnabled={true}>
                          {mentions.map((mention) => (
                            <TouchableOpacity
                              key={mention}
                              style={styles.optionItem}
                              onPress={() => {
                                handleInputChange('bacMention', mention);
                                setActiveField(null);
                              }}
                            >
                              <Text
                                style={[styles.optionText, formData.bacMention === mention && styles.selectedOptionText]}
                              >
                                {mention}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title={currentStep < totalSteps ? 'Suivant' : 'Commencer'}
            onPress={handleNext}
            variant="primary"
            fullWidth
            disabled={!isStepValid()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  progressContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: colors.gray200,
    borderRadius: 3,
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.student,
    borderRadius: 3,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
  stepContainer: {
    marginBottom: spacing.xl,
  },
  stepTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  stepDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.gray100,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? spacing.md : spacing.sm,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  inputActive: {
    borderColor: colors.student,
    backgroundColor: colors.white,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdown: {
    backgroundColor: colors.gray100,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? spacing.md : spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  dropdownText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  dropdownPlaceholderText: {
    color: colors.textTertiary,
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    maxHeight: 200,
    zIndex: 999,
    marginTop: spacing.xs,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  optionsScrollView: {
    padding: spacing.sm,
  },
  optionItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  optionText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  selectedOptionText: {
    color: colors.student,
    fontWeight: fontWeight.semiBold,
  },
  buttonContainer: {
    padding: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? spacing.xl : spacing.lg,
  },
});

export default StudentInfoScreen; 