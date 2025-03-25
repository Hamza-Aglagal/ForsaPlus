import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Platform, 
  Animated, 
  Dimensions 
} from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

// Import screens
import HomeScreen from '../screens/UniversityStudent/HomeScreen';
import InterviewScreen from '../screens/UniversityStudent/InterviewScreen';
import ProfileScreen from '../screens/UniversityStudent/ProfileScreen';
import InternshipsScreen from '../screens/UniversityStudent/InternshipsScreen';
import SchoolsScreen from '../screens/UniversityStudent/SchoolsScreen';
import CVScreen from '../screens/UniversityStudent/CVScreen';
import InternshipDetailScreen from '../screens/UniversityStudent/InternshipDetailScreen';
import SchoolDetailsScreen from '../screens/UniversityStudent/SchoolDetailsScreen';
import OrientationTestScreen from '../screens/UniversityStudent/OrientationTestScreen';
import OrientationResultsScreen from '../screens/UniversityStudent/OrientationResultsScreen';
import OrientationQuestionsScreen from '../screens/UniversityStudent/OrientationQuestionsScreen';
import CareerPathsScreen from '../screens/UniversityStudent/CareerPathsScreen';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 5;

// Main navigator component
const UniversityStudentNavigator = ({ navigation, route }) => {
  const studentInfo = route?.params?.studentInfo || {};
  const isAuthenticated = route?.params?.isAuthenticated || false;
  const [activeTab, setActiveTab] = useState('Home');
  const [currentScreen, setCurrentScreen] = useState(null);
  const [screenParams, setScreenParams] = useState({});
  const slideAnimation = useState(new Animated.Value(0))[0];
  const scaleAnimation = useState(new Animated.Value(1))[0];
  const [showFab, setShowFab] = useState(true);
  
  const navigateToScreen = (screenName, params = {}) => {
    setCurrentScreen(screenName);
    setScreenParams(params);
  };

  const goBack = () => {
    setCurrentScreen(null);
    setScreenParams({});
  };
  
  const renderScreen = () => {
    // If we have a current non-tab screen, render that
    if (currentScreen) {
      switch(currentScreen) {
        case 'CV':
          return <CVScreen navigation={{ ...navigation, goBack }} setActiveTab={setActiveTab} />;
        case 'InternshipDetail':
          return <InternshipDetailScreen navigation={{ ...navigation, goBack }} route={{ params: screenParams }} />;
        case 'SchoolDetails':
          return <SchoolDetailsScreen navigation={{ ...navigation, goBack }} route={{ params: screenParams }} />;
        case 'OrientationTest':
          return <OrientationTestScreen navigation={{ ...navigation, goBack, navigate: navigateToScreen }} />;
        case 'OrientationQuestions':
          return <OrientationQuestionsScreen navigation={{ ...navigation, goBack, navigate: navigateToScreen }} route={{ params: screenParams }} />;
        case 'OrientationResults':
          return <OrientationResultsScreen navigation={{ ...navigation, goBack, navigate: navigateToScreen }} route={{ params: screenParams }} />;
        case 'CareerPaths':
          return <CareerPathsScreen navigation={{ ...navigation, goBack }} route={{ params: screenParams }} />;
        default:
          return null;
      }
    }
    
    // Otherwise render the active tab
    switch(activeTab) {
      case 'Home':
        return <HomeScreen 
          navigation={{ 
            ...navigation, 
            navigate: navigateToScreen,
            setActiveTab: setActiveTab 
          }} 
        />;
      case 'Internships':
        return <InternshipsScreen 
          navigation={{ 
            ...navigation, 
            navigate: navigateToScreen 
          }} 
        />;
      case 'Schools':
        return <SchoolsScreen 
          navigation={{ 
            ...navigation, 
            navigate: navigateToScreen 
          }} 
        />;
      case 'Interviews':
        return <InterviewScreen navigation={navigation} />;
      case 'Profile':
        return <ProfileScreen navigation={navigation} />;
      default:
        return <HomeScreen 
          navigation={{ 
            ...navigation, 
            navigate: navigateToScreen,
            setActiveTab: setActiveTab 
          }} 
        />;
    }
  };

  const animateSlider = (index) => {
    Animated.parallel([
      Animated.spring(slideAnimation, {
        toValue: index * ITEM_WIDTH,
        velocity: 10,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const handleTabPress = (tabName, index) => {
    setActiveTab(tabName);
    setCurrentScreen(null); // Reset any full-screen content
    animateSlider(index);
    setShowFab(tabName === 'Internships');
  };

  // Initial animation
  useEffect(() => {
    const index = getTabIndex(activeTab);
    slideAnimation.setValue(index * ITEM_WIDTH);
  }, []);

  const getTabIndex = (tabName) => {
    switch(tabName) {
      case 'Home': return 0;
      case 'Internships': return 1;
      case 'Schools': return 2;
      case 'Interviews': return 3;
      case 'Profile': return 4;
      default: return 0;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      
      {showFab && !currentScreen && (
        <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
          <LinearGradient
            colors={[colors.universityStudent, '#7C4DFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fabGradient}
          >
            <Icon name="magnify" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      )}
      
      {!currentScreen && (
        <View style={styles.tabBarContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.85)', '#fff']}
            style={styles.tabBarGradient}
          >
            <View style={styles.tabBar}>
              <Animated.View 
                style={[
                  styles.slider, 
                  { 
                    transform: [
                      { translateX: slideAnimation },
                      { scale: scaleAnimation }
                    ] 
                  }
                ]}
              >
                <LinearGradient
                  colors={[colors.universityStudent, '#7C4DFF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.sliderGradient}
                />
              </Animated.View>
              
              <TabButton 
                label="Accueil"
                icon="home"
                isActive={activeTab === 'Home'}
                onPress={() => handleTabPress('Home', 0)}
              />
              <TabButton 
                label="Stages/Emploi"
                icon="briefcase"
                isActive={activeTab === 'Internships'}
                onPress={() => handleTabPress('Internships', 1)}
              />
              <TabButton 
                label="Écoles"
                icon="school-outline"
                isActive={activeTab === 'Schools'}
                onPress={() => handleTabPress('Schools', 2)}
              />
              <TabButton 
                label="Entretiens"
                icon="calendar-clock"
                isActive={activeTab === 'Interviews'}
                onPress={() => handleTabPress('Interviews', 3)}
              />
              <TabButton 
                label="Profil"
                icon="account-circle"
                isActive={activeTab === 'Profile'}
                onPress={() => handleTabPress('Profile', 4)}
              />
            </View>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

// Custom Tab Button component
const TabButton = ({ label, icon, isActive, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.tabButton} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon 
        name={icon} 
        size={22} 
        color={isActive ? colors.universityStudent : colors.gray500} 
      />
      <Text 
        style={[
          styles.tabLabel, 
          { color: isActive ? colors.universityStudent : colors.gray500 }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarGradient: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 12,
  },
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 80 : 65,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    top: 6,
    width: width / 5 - 20,
    marginHorizontal: 10,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  sliderGradient: {
    width: '100%',
    height: '100%',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
  },
  tabLabel: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 90 : 75,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: colors.universityStudent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 100,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default UniversityStudentNavigator; 