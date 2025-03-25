import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const InterestItem = ({ interest, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.interestItem, isSelected && styles.interestItemSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.interestContent}>
        <Icon
          name={interest.icon}
          size={24}
          color={isSelected ? colors.white : colors.student}
          style={styles.interestIcon}
        />
        <Text
          style={[styles.interestText, isSelected && styles.interestTextSelected]}
        >
          {interest.name}
        </Text>
      </View>
      {isSelected && (
        <View style={styles.checkIconContainer}>
          <Icon name="check" size={16} color={colors.white} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const StudentInterestsScreen = ({ navigation, route }) => {
  const studentInfo = route?.params?.studentInfo || {};
  
  const [selectedInterests, setSelectedInterests] = useState([]);
  
  const interests = [
    { id: '1', name: 'Informatique', icon: 'laptop' },
    { id: '2', name: 'Sciences', icon: 'flask' },
    { id: '3', name: 'Médecine', icon: 'medical-bag' },
    { id: '4', name: 'Économie', icon: 'cash' },
    { id: '5', name: 'Commerce', icon: 'store' },
    { id: '6', name: 'Ingénierie', icon: 'wrench' },
    { id: '7', name: 'Arts', icon: 'palette' },
    { id: '8', name: 'Langues', icon: 'translate' },
    { id: '9', name: 'Droit', icon: 'gavel' },
    { id: '10', name: 'Architecture', icon: 'home' },
    { id: '11', name: 'Agriculture', icon: 'leaf' },
    { id: '12', name: 'Design', icon: 'pencil-ruler' },
    { id: '13', name: 'Tourisme', icon: 'airplane' },
    { id: '14', name: 'Communication', icon: 'message-text' },
    { id: '15', name: 'Psychologie', icon: 'brain' },
  ];

  const toggleInterest = (interestId) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    } else {
      if (selectedInterests.length < 5) {
        setSelectedInterests([...selectedInterests, interestId]);
      }
    }
  };

  const handleSubmit = () => {
    // Combine student info with interests
    const selectedInterestsData = interests
      .filter(interest => selectedInterests.includes(interest.id))
      .map(interest => interest.name);
    
    const updatedStudentInfo = {
      ...studentInfo,
      interests: selectedInterestsData,
    };
    
    // Navigate to the app with the complete profile
    navigation.replace('HighSchoolStudentApp', { studentInfo: updatedStudentInfo });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vos centres d'intérêt</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.progressText}>Étape finale</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Quels sont vos centres d'intérêt?</Text>
        <Text style={styles.subtitle}>
          Sélectionnez jusqu'à 5 domaines qui vous intéressent pour obtenir des recommandations personnalisées
        </Text>

        <View style={styles.countContainer}>
          <View style={styles.selectedCount}>
            <Text style={styles.countText}>
              {selectedInterests.length}/5 sélectionnés
            </Text>
          </View>
        </View>

        <View style={styles.interestsContainer}>
          {interests.map((interest) => (
            <InterestItem
              key={interest.id}
              interest={interest}
              isSelected={selectedInterests.includes(interest.id)}
              onPress={() => toggleInterest(interest.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Commencer"
          onPress={handleSubmit}
          variant="primary"
          fullWidth
          disabled={selectedInterests.length === 0}
        />
      </View>
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
    width: '100%',
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
    paddingBottom: spacing.xxxl,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.md,
  },
  selectedCount: {
    backgroundColor: colors.student + '15',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  countText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    color: colors.student,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestItem: {
    width: '48%',
    backgroundColor: colors.gray100,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  interestItemSelected: {
    backgroundColor: colors.student,
  },
  interestContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  interestIcon: {
    marginRight: spacing.sm,
  },
  interestText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  interestTextSelected: {
    color: colors.white,
  },
  checkIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? spacing.xl : spacing.lg,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
});

export default StudentInterestsScreen; 