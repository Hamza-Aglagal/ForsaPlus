import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Image, 
  Animated, 
  TouchableOpacity,
  StatusBar 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;
  const translateYButtonAnim = useRef(new Animated.Value(100)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYButtonAnim, {
        toValue: 0,
        duration: 1200,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Create a continuous floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('UserType');
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const floatTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15]
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#f5f7fa', '#e4e9f2']} 
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Decorative circles */}
      <Animated.View 
        style={[
          styles.decorCircle1, 
          { 
            transform: [{ scale: scaleAnim }, { rotate: spin }],
            opacity: fadeAnim
          }
        ]}
      >
        <LinearGradient
          colors={colors.studentGradient.secondary}
          style={styles.circleGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <Animated.View 
        style={[
          styles.decorCircle2, 
          { 
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim
          }
        ]}
      >
        <LinearGradient
          colors={colors.universityGradient.secondary}
          style={styles.circleGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <View style={styles.content}>
        {/* Logo and Title Section */}
        <Animated.View
          style={[
            styles.headerContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: translateYAnim },
              ],
            },
          ]}
        >
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                transform: [{ translateY: floatTranslateY }]
              }
            ]}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={styles.logoBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.logoText}>F+</Text>
            </LinearGradient>
          </Animated.View>
          <Text style={styles.title}>ForsaPlus</Text>
          <Text style={styles.subtitle}>
            Votre orientation académique et professionnelle au Maroc
          </Text>
        </Animated.View>

        {/* User Types Section */}
        <Animated.View
          style={[
            styles.userTypesContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateYAnim }],
            },
          ]}
        >
          {/* Student type card */}
          <LinearGradient
            colors={['#ffffff', '#f8f9fa']}
            style={styles.userTypeCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.student }]}>
              <Icon name="school" size={28} color={colors.white} />
            </View>
            <Text style={styles.cardTitle}>Étudiants BAC</Text>
            <Text style={styles.cardDescription}>Orientation post-bac</Text>
          </LinearGradient>

          {/* University student type card */}
          <LinearGradient
            colors={['#ffffff', '#f8f9fa']}
            style={styles.userTypeCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.universityStudent }]}>
              <Icon name="book-education" size={28} color={colors.white} />
            </View>
            <Text style={styles.cardTitle}>Étudiants BAC+2</Text>
            <Text style={styles.cardDescription}>Parcours universitaire</Text>
          </LinearGradient>

          {/* Graduate type card */}
          <LinearGradient
            colors={['#ffffff', '#f8f9fa']}
            style={styles.userTypeCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.graduate }]}>
              <Icon name="account-tie" size={28} color={colors.white} />
            </View>
            <Text style={styles.cardTitle}>Diplômés</Text>
            <Text style={styles.cardDescription}>Insertion professionnelle</Text>
          </LinearGradient>
        </Animated.View>

        {/* Start Button */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateYButtonAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#6C63FF', '#4A6FFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Commencer</Text>
              <Icon name="arrow-right" size={20} color={colors.white} />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  decorCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    top: -50,
    right: -50,
    opacity: 0.3,
  },
  decorCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    bottom: 50,
    left: -40,
    opacity: 0.2,
  },
  circleGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'space-between',
    paddingTop: height * 0.1,
    paddingBottom: height * 0.05,
  },
  headerContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logoBackground: {
    width: 90,
    height: 90,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.white,
  },
  title: {
    fontSize: 38,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 22,
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.xl,
    flexWrap: 'wrap',
  },
  userTypeCard: {
    width: '31%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  buttonGradient: {
    borderRadius: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    borderRadius: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginRight: spacing.sm,
  }
});

export default WelcomeScreen; 