import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const ParcourTimelineScreen = ({ navigation }) => {
  // Initial timeline steps
  const initialSteps = [
    {
      id: '1',
      title: 'Baccalauréat',
      speciality: 'Sciences Mathématiques',
      date: '2023',
      icon: 'school',
      color: colors.student,
      type: 'education'
    },
    {
      id: '2',
      title: 'Licence',
      speciality: 'Informatique',
      date: '2023-2026',
      icon: 'laptop',
      color: colors.info,
      type: 'education'
    },
    {
      id: '3',
      title: 'Master',
      speciality: 'Intelligence Artificielle',
      date: '2026-2028',
      icon: 'brain',
      color: colors.tertiary,
      type: 'education'
    },
    {
      id: '4',
      title: 'Stage',
      speciality: 'Développeur IA',
      date: '2028',
      icon: 'briefcase-outline',
      color: colors.warning,
      type: 'experience'
    },
    {
      id: '5',
      title: 'Emploi',
      speciality: 'Ingénieur en IA',
      date: '2028-',
      icon: 'office-building',
      color: colors.success,
      type: 'job'
    }
  ];

  const [timelineSteps, setTimelineSteps] = useState(initialSteps);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    speciality: '',
    date: '',
    type: 'education'
  });

  // Function to open edit modal
  const openEditModal = (step) => {
    setCurrentStep(step);
    setEditData({
      title: step.title,
      speciality: step.speciality,
      date: step.date,
      type: step.type
    });
    setEditModalVisible(true);
  };

  // Function to open add modal
  const openAddModal = (position) => {
    setCurrentStep({
      id: String(Date.now()),
      position: position
    });
    setEditData({
      title: '',
      speciality: '',
      date: '',
      type: 'education'
    });
    setAddModalVisible(true);
  };

  // Function to save edits
  const saveEdit = () => {
    if (!editData.title || !editData.speciality || !editData.date) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const updatedSteps = timelineSteps.map(step => {
      if (step.id === currentStep.id) {
        return {
          ...step,
          title: editData.title,
          speciality: editData.speciality,
          date: editData.date,
          type: editData.type,
          icon: getIconForType(editData.type),
          color: getColorForType(editData.type)
        };
      }
      return step;
    });

    setTimelineSteps(updatedSteps);
    setEditModalVisible(false);
  };

  // Function to add new step
  const addNewStep = () => {
    if (!editData.title || !editData.speciality || !editData.date) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const newStep = {
      id: currentStep.id,
      title: editData.title,
      speciality: editData.speciality,
      date: editData.date,
      type: editData.type,
      icon: getIconForType(editData.type),
      color: getColorForType(editData.type)
    };

    const position = currentStep.position;
    const newSteps = [...timelineSteps];
    newSteps.splice(position, 0, newStep);

    setTimelineSteps(newSteps);
    setAddModalVisible(false);
  };

  // Function to delete step
  const deleteStep = (stepId) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cette étape ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => {
            const updatedSteps = timelineSteps.filter(step => step.id !== stepId);
            setTimelineSteps(updatedSteps);
            setEditModalVisible(false);
          }
        },
      ]
    );
  };

  // Helper function to get icon based on type
  const getIconForType = (type) => {
    switch (type) {
      case 'education': return 'school';
      case 'experience': return 'briefcase-outline';
      case 'job': return 'office-building';
      default: return 'school';
    }
  };

  // Helper function to get color based on type
  const getColorForType = (type) => {
    switch (type) {
      case 'education': return colors.info;
      case 'experience': return colors.warning;
      case 'job': return colors.success;
      default: return colors.student;
    }
  };

  // Save timeline to user data
  const saveTimeline = () => {
    // This would connect to your data storage solution
    Alert.alert('Succès', 'Votre parcours a été sauvegardé avec succès!');
    navigation.goBack();
  };

  // Modal for editing a step
  const renderEditModal = () => (
    <Modal
      visible={editModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Modifier l'étape</Text>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Icon name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Titre</Text>
          <TextInput
            style={styles.textInput}
            value={editData.title}
            onChangeText={(text) => setEditData({...editData, title: text})}
            placeholder="Ex: Licence, Master, Stage..."
          />

          <Text style={styles.inputLabel}>Spécialité / Description</Text>
          <TextInput
            style={styles.textInput}
            value={editData.speciality}
            onChangeText={(text) => setEditData({...editData, speciality: text})}
            placeholder="Ex: Informatique, Développeur Web..."
          />

          <Text style={styles.inputLabel}>Période</Text>
          <TextInput
            style={styles.textInput}
            value={editData.date}
            onChangeText={(text) => setEditData({...editData, date: text})}
            placeholder="Ex: 2023-2026"
          />

          <Text style={styles.inputLabel}>Type</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                editData.type === 'education' && styles.typeButtonSelected
              ]}
              onPress={() => setEditData({...editData, type: 'education'})}
            >
              <Icon 
                name="school" 
                size={20} 
                color={editData.type === 'education' ? colors.white : colors.textPrimary} 
              />
              <Text 
                style={[
                  styles.typeText,
                  editData.type === 'education' && styles.typeTextSelected
                ]}
              >
                Éducation
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                editData.type === 'experience' && styles.typeButtonSelected
              ]}
              onPress={() => setEditData({...editData, type: 'experience'})}
            >
              <Icon 
                name="briefcase-outline" 
                size={20} 
                color={editData.type === 'experience' ? colors.white : colors.textPrimary} 
              />
              <Text 
                style={[
                  styles.typeText,
                  editData.type === 'experience' && styles.typeTextSelected
                ]}
              >
                Expérience
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                editData.type === 'job' && styles.typeButtonSelected
              ]}
              onPress={() => setEditData({...editData, type: 'job'})}
            >
              <Icon 
                name="office-building" 
                size={20} 
                color={editData.type === 'job' ? colors.white : colors.textPrimary} 
              />
              <Text 
                style={[
                  styles.typeText,
                  editData.type === 'job' && styles.typeTextSelected
                ]}
              >
                Emploi
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteStep(currentStep.id)}
            >
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveEdit}
            >
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Modal for adding a new step
  const renderAddModal = () => (
    <Modal
      visible={addModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setAddModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Ajouter une étape</Text>
            <TouchableOpacity onPress={() => setAddModalVisible(false)}>
              <Icon name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Titre</Text>
          <TextInput
            style={styles.textInput}
            value={editData.title}
            onChangeText={(text) => setEditData({...editData, title: text})}
            placeholder="Ex: Licence, Master, Stage..."
          />

          <Text style={styles.inputLabel}>Spécialité / Description</Text>
          <TextInput
            style={styles.textInput}
            value={editData.speciality}
            onChangeText={(text) => setEditData({...editData, speciality: text})}
            placeholder="Ex: Informatique, Développeur Web..."
          />

          <Text style={styles.inputLabel}>Période</Text>
          <TextInput
            style={styles.textInput}
            value={editData.date}
            onChangeText={(text) => setEditData({...editData, date: text})}
            placeholder="Ex: 2023-2026"
          />

          <Text style={styles.inputLabel}>Type</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                editData.type === 'education' && styles.typeButtonSelected
              ]}
              onPress={() => setEditData({...editData, type: 'education'})}
            >
              <Icon 
                name="school" 
                size={20} 
                color={editData.type === 'education' ? colors.white : colors.textPrimary} 
              />
              <Text 
                style={[
                  styles.typeText,
                  editData.type === 'education' && styles.typeTextSelected
                ]}
              >
                Éducation
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                editData.type === 'experience' && styles.typeButtonSelected
              ]}
              onPress={() => setEditData({...editData, type: 'experience'})}
            >
              <Icon 
                name="briefcase-outline" 
                size={20} 
                color={editData.type === 'experience' ? colors.white : colors.textPrimary} 
              />
              <Text 
                style={[
                  styles.typeText,
                  editData.type === 'experience' && styles.typeTextSelected
                ]}
              >
                Expérience
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                editData.type === 'job' && styles.typeButtonSelected
              ]}
              onPress={() => setEditData({...editData, type: 'job'})}
            >
              <Icon 
                name="office-building" 
                size={20} 
                color={editData.type === 'job' ? colors.white : colors.textPrimary} 
              />
              <Text 
                style={[
                  styles.typeText,
                  editData.type === 'job' && styles.typeTextSelected
                ]}
              >
                Emploi
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setAddModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={addNewStep}
            >
              <Text style={styles.saveButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mon Parcours</Text>
        <TouchableOpacity 
          style={styles.saveTimelineButton}
          onPress={saveTimeline}
        >
          <Icon name="content-save" size={22} color={colors.student} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.introSection}>
          <LinearGradient
            colors={colors.studentGradient.blue}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.introHeader}
          >
            <Icon name="map-marker-path" size={50} color={colors.white} style={styles.introIcon} />
            <Text style={styles.introTitle}>Mon Parcours d'Orientation</Text>
            <Text style={styles.introSubtitle}>
              Visualisez et planifiez votre parcours académique et professionnel
            </Text>
          </LinearGradient>

          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>Comment ça marche :</Text>
            <View style={styles.instructionItem}>
              <Icon name="pencil" size={18} color={colors.student} />
              <Text style={styles.instructionText}>Touchez une étape pour la modifier</Text>
            </View>
            <View style={styles.instructionItem}>
              <Icon name="plus-circle" size={18} color={colors.student} />
              <Text style={styles.instructionText}>Touchez "+" pour ajouter une nouvelle étape</Text>
            </View>
            <View style={styles.instructionItem}>
              <Icon name="delete" size={18} color={colors.student} />
              <Text style={styles.instructionText}>Vous pouvez supprimer une étape lors de la modification</Text>
            </View>
          </View>
        </View>

        <View style={styles.timelineContainer}>
          <Text style={styles.sectionTitle}>Votre Chronologie</Text>
          
          {/* Add button at the beginning */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => openAddModal(0)}
          >
            <Icon name="plus" size={24} color={colors.student} />
          </TouchableOpacity>

          {timelineSteps.map((step, index) => (
            <View key={step.id} style={styles.timelineItemContainer}>
              <View style={styles.timelineItem}>
                <View style={styles.timelineIconLine}>
                  <LinearGradient
                    colors={[step.color, step.color + 'CC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.timelineIconContainer}
                  >
                    <Icon name={step.icon} size={24} color={colors.white} />
                  </LinearGradient>
                  
                  {index < timelineSteps.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>
                
                <TouchableOpacity 
                  style={styles.timelineContent}
                  onPress={() => openEditModal(step)}
                >
                  <View style={styles.timelineHeader}>
                    <Text style={styles.timelineTitle}>{step.title}</Text>
                    <Icon name="pencil" size={16} color={colors.textSecondary} />
                  </View>
                  <Text style={styles.timelineSpeciality}>{step.speciality}</Text>
                  <Text style={styles.timelineDate}>{step.date}</Text>
                </TouchableOpacity>
              </View>
              
              {/* Add button between items */}
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => openAddModal(index + 1)}
              >
                <Icon name="plus" size={24} color={colors.student} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.mainSaveButton}
          onPress={saveTimeline}
        >
          <LinearGradient
            colors={colors.studentGradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mainSaveButtonGradient}
          >
            <Text style={styles.mainSaveButtonText}>Sauvegarder mon parcours</Text>
            <Icon name="content-save" size={20} color={colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {renderEditModal()}
      {renderAddModal()}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  saveTimelineButton: {
    padding: spacing.xs,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  
  // Intro section
  introSection: {
    marginBottom: spacing.xl,
  },
  introHeader: {
    padding: spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  introIcon: {
    marginBottom: spacing.md,
  },
  introTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  introSubtitle: {
    fontSize: fontSize.md,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  instructions: {
    padding: spacing.lg,
    margin: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  instructionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  instructionText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  
  // Timeline section
  timelineContainer: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  timelineItemContainer: {
    marginBottom: spacing.xs,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineIconLine: {
    alignItems: 'center',
  },
  timelineIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineLine: {
    width: 2,
    height: 60,
    backgroundColor: colors.gray300,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  timelineSpeciality: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
  },
  addButton: {
    alignSelf: 'center',
    marginLeft: 25,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.student,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  
  // Save button
  mainSaveButton: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  mainSaveButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  mainSaveButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
    marginRight: spacing.sm,
  },
  
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  inputLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  textInput: {
    backgroundColor: colors.gray100,
    borderRadius: 10,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  typeButtonSelected: {
    backgroundColor: colors.student,
  },
  typeText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  typeTextSelected: {
    color: colors.white,
    fontWeight: fontWeight.medium,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  saveButton: {
    backgroundColor: colors.student,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    flex: 1,
    marginLeft: spacing.sm,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
  },
  deleteButton: {
    backgroundColor: colors.danger + '15',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    flex: 1,
    marginRight: spacing.sm,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.danger,
  },
  cancelButton: {
    backgroundColor: colors.gray200,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    flex: 1,
    marginRight: spacing.sm,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
});

export default ParcourTimelineScreen; 