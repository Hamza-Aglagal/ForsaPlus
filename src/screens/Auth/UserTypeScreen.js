import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

// Responsive spacing based on screen height
const dynamicSpacing = (value) => {
  return height * (value / 800);
};

const UserTypeCard = ({ title, description, icon, color, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card, 
        isSelected && { 
          borderColor: color, 
          borderWidth: 2,
          shadowColor: color,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={isSelected ? [color, color + 'EE'] : ['#ffffff', '#f8f9fa']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={[styles.cardIconContainer, { backgroundColor: isSelected ? colors.white : color }]}>
          <Icon name={icon} size={32} color={isSelected ? color : colors.white} />
        </View>
        <Text style={[styles.cardTitle, isSelected && { color: colors.white }]}>{title}</Text>
        <Text 
          style={[styles.cardDescription, isSelected && { color: colors.white }]} 
          numberOfLines={2}
        >
          {description}
        </Text>
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Icon name="check" size={16} color={colors.white} />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const UserTypeScreen = ({ navigation, route }) => {
  const [selectedType, setSelectedType] = useState(null);
  const isAuthenticated = route.params?.isAuthenticated || false;

  const handleContinue = () => {
    if (!selectedType) return;
    
    if (isAuthenticated) {
      // User is already authenticated, navigate directly to the app
      if (selectedType === 'highschool') {
        navigation.replace('HighSchoolStudentApp');
      } else if (selectedType === 'university') {
        navigation.replace('UniversityStudentApp');
      } else if (selectedType === 'graduate') {
        navigation.replace('GraduateApp');
      }
    } else {
      // User is not authenticated, save the user type and navigate to register/login
      if (selectedType === 'highschool') {
        navigation.navigate('StudentInfo', { userType: selectedType });
      } else if (selectedType === 'university') {
        // For university students, navigate to Login with the userType parameter
        navigation.navigate('Login', { userType: selectedType });
      } else if (selectedType === 'graduate') {
        // For graduates, navigate to Login with the userType parameter
        navigation.navigate('Login', { userType: selectedType });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Qui êtes-vous?</Text>
          <Text style={styles.subtitle}>
            Sélectionnez votre profil pour personnaliser votre expérience
          </Text>
        </View>

        {/* User Type Cards */}
        <View style={styles.cardsContainer}>
          <UserTypeCard
            title="Étudiant BAC"
            description="Orientation post-bac et filières d'études"
            icon="school"
            color={colors.student}
            isSelected={selectedType === 'highschool'}
            onPress={() => setSelectedType('highschool')}
          />

          <UserTypeCard
            title="Étudiant BAC+2"
            description="Parcours universitaires et opportunités"
            icon="book-education"
            color={colors.universityStudent}
            isSelected={selectedType === 'university'}
            onPress={() => setSelectedType('university')}
          />

          <UserTypeCard
            title="Diplômé"
            description="Emploi et insertion professionnelle"
            icon="account-tie"
            color={colors.graduate}
            isSelected={selectedType === 'graduate'}
            onPress={() => setSelectedType('graduate')}
          />
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={selectedType ? [colors.primary, colors.secondary] : ['#E5E7EB', '#D1D5DB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.buttonGradient, !selectedType && styles.buttonDisabled]}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={handleContinue}
              disabled={!selectedType}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Continuer</Text>
              <Icon name="arrow-right" size={20} color={colors.white} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    padding: dynamicSpacing(24),
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginTop: dynamicSpacing(20),
    marginBottom: dynamicSpacing(30),
  },
  title: {
    fontSize: Math.min(fontSize.xxl, width * 0.08),
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: dynamicSpacing(8),
  },
  subtitle: {
    fontSize: Math.min(fontSize.md, width * 0.045),
    color: colors.textSecondary,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: dynamicSpacing(16),
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.gray200,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: dynamicSpacing(16),
    borderRadius: 16,
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: dynamicSpacing(12),
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: Math.min(fontSize.lg, width * 0.05),
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: dynamicSpacing(4),
  },
  cardDescription: {
    fontSize: Math.min(fontSize.sm, width * 0.035),
    color: colors.textSecondary,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: dynamicSpacing(20),
    alignItems: 'center',
  },
  buttonGradient: {
    width: '100%',
    borderRadius: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: dynamicSpacing(14),
    paddingHorizontal: dynamicSpacing(20),
  },
  buttonText: {
    color: colors.white,
    fontSize: Math.min(fontSize.lg, width * 0.05),
    fontWeight: fontWeight.bold,
    marginRight: dynamicSpacing(8),
  },
});

export default UserTypeScreen; 