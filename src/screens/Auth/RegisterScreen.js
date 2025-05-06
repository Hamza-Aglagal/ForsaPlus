import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { authService } from '../../services/api';

const RegisterScreen = ({ navigation, route }) => {
  const userType = route?.params?.userType || 'university'; // Default to university if not specified
  const studentInfo = route?.params?.studentInfo || {};
  
  const [firstName, setFirstName] = useState(studentInfo.firstName || '');
  const [lastName, setLastName] = useState(studentInfo.lastName || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    // First Name validation
    if (!firstName) {
      newErrors.firstName = 'Le prénom est requis';
    }

    // Last Name validation
    if (!lastName) {
      newErrors.lastName = 'Le nom est requis';
    }

    // Email validation
    if (!email) {
      newErrors.email = 'L email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Adresse email invalide';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmez votre mot de passe';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validate()) {
      setIsLoading(true);
      
      try {
        // Prepare user data
        const userData = {
          firstName,
          lastName,
          email,
          password,
          userType,
          // Include studentInfo for highschool students
          ...(userType === 'highschool' && studentInfo ? {
            schoolName: studentInfo.schoolName,
            bacType: studentInfo.bacType,
            bacYear: studentInfo.bacYear,
            bacMention: studentInfo.bacMention,
            interests: studentInfo.interests || []
          } : {})
        };
        
        console.log('Registering with data:', {
          ...userData,
          password: '********' // Don't log actual password
        });
        
        // Call register API
        const response = await authService.register(userData);
        console.log('Registration successful:', response);
        
        // Navigate based on user type after successful registration
        const userTypeFromResponse = response.user.userType;
        
        if (userTypeFromResponse === 'university') {
          navigation.replace('UniversityStudentApp');
        } else if (userTypeFromResponse === 'graduate') {
          navigation.replace('GraduateApp');
        } else if (userTypeFromResponse === 'highschool') {
          navigation.replace('HighSchoolStudentApp');
        } else {
          // If no specific user type, go to user type selection
          navigation.replace('UserType');
        }
      } catch (error) {
        // Handle registration error
        console.error('Registration error:', error);
        
        // Display appropriate error message
        let errorMessage = 'Une erreur s\'est produite lors de la création du compte.';
        
        if (error.error === 'Network Error') {
          errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
        } else if (error.error === 'User already exists with this email') {
          errorMessage = 'Un utilisateur existe déjà avec cet email.';
        } else if (error.error) {
          errorMessage = error.error;
        }
        
        Alert.alert(
          'Échec de l\'inscription',
          errorMessage
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.logoBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.logoText}>F+</Text>
              </LinearGradient>
            </View>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>
              Rejoignez ForsaPlus pour commencer votre parcours
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Input
              label="Prénom"
              placeholder="Entrez votre prénom"
              value={firstName}
              onChangeText={setFirstName}
              error={errors.firstName}
              leftIcon={<Icon name="account-outline" size={20} color={colors.gray600} />}
            />

            <Input
              label="Nom"
              placeholder="Entrez votre nom"
              value={lastName}
              onChangeText={setLastName}
              error={errors.lastName}
              leftIcon={<Icon name="account-outline" size={20} color={colors.gray600} />}
            />

            <Input
              label="Email"
              placeholder="Entrez votre email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              leftIcon={<Icon name="email-outline" size={20} color={colors.gray600} />}
            />

            <Input
              label="Mot de passe"
              placeholder="Créez votre mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
              leftIcon={<Icon name="lock-outline" size={20} color={colors.gray600} />}
            />

            <Input
              label="Confirmer le mot de passe"
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={errors.confirmPassword}
              leftIcon={<Icon name="lock-check-outline" size={20} color={colors.gray600} />}
            />

            <View style={styles.termsContainer}>
              <Icon name="checkbox-marked" size={20} color={colors.primary} />
              <Text style={styles.termsText}>
                J'accepte les{' '}
                <Text style={styles.termsLink}>conditions d'utilisation</Text> et la{' '}
                <Text style={styles.termsLink}>politique de confidentialité</Text>
              </Text>
            </View>

            <Button 
              title="S'inscrire" 
              onPress={handleRegister} 
              variant="primary"
              loading={isLoading}
              fullWidth
              style={styles.registerButton}
            />
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.loginText}>
              Vous avez déjà un compte?{' '}
              <Text 
                style={styles.loginLink}
                onPress={handleLogin}
              >
                Se connecter
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logoBackground: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  termsText: {
    marginLeft: spacing.sm,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
  registerButton: {
    marginTop: spacing.md,
  },
  footerContainer: {
    width: '100%',
  },
  loginText: {
    textAlign: 'center',
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
});

export default RegisterScreen; 