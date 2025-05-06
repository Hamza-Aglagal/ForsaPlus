import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Text,
  Alert
} from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { spacing } from '../theme/spacing';

// Import Graduate screens
import HomeScreen from '../screens/Graduate/HomeScreen';
import JobsScreen from '../screens/Graduate/JobsScreen';
import ResumeScreen from '../screens/Graduate/ResumeScreen';
import InterviewScreen from '../screens/Graduate/InterviewScreen';
import ProfileScreen from '../screens/Graduate/ProfileScreen';
import JobDetailScreen from '../screens/Graduate/JobDetailScreen';
import NetworkingScreen from '../screens/Graduate/NetworkingScreen';
import VirtualInterviewScreen from '../screens/Graduate/VirtualInterviewScreen';

// Main navigator component
const GraduateNavigator = ({ navigation, route }) => {
  const graduateInfo = route?.params?.graduateInfo || {};
  const isAuthenticated = route?.params?.isAuthenticated || false;
  const [activeTab, setActiveTab] = useState('Home');
  const [currentScreen, setCurrentScreen] = useState(null);
  const [screenParams, setScreenParams] = useState({});
  
  // DEBUG: Track screen changes
  useEffect(() => {
    console.log('Current screen changed to:', currentScreen);
  }, [currentScreen]);
  
  const navigateToScreen = (screenName, params = {}) => {
    console.log('Navigating to:', screenName, params);
    setCurrentScreen(screenName);
    setScreenParams(params);
  };

  const goBack = () => {
    console.log('Going back from:', currentScreen);
    setCurrentScreen(null);
    setScreenParams({});
  };
  
  const renderScreen = () => {
    console.log('Rendering screen:', currentScreen);
    
    // If we have a current non-tab screen, render that
    if (currentScreen) {
      switch(currentScreen) {
        case 'JobDetail':
          return <JobDetailScreen navigation={{ ...navigation, goBack }} route={{ params: screenParams }} />;
        case 'Networking':
          return <NetworkingScreen navigation={{ ...navigation, goBack }} route={{ params: screenParams }} />;
        case 'VirtualInterviewScreen':
          console.log('Rendering VirtualInterviewScreen with params:', screenParams);
          return (
            <VirtualInterviewScreen 
              navigation={{ 
                goBack,
                navigate: navigateToScreen
              }} 
              route={{ 
                params: screenParams 
              }} 
            />
          );
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
      case 'Jobs':
        return <JobsScreen 
          navigation={{ 
            ...navigation, 
            navigate: navigateToScreen 
          }} 
        />;
      case 'Resume':
        return <ResumeScreen 
          navigation={{ 
            ...navigation, 
            navigate: navigateToScreen 
          }} 
        />;
      case 'Interviews':
        return <InterviewScreen navigation={{ ...navigation, navigate: navigateToScreen }} />;
      case 'Profile':
        return <ProfileScreen navigation={{ ...navigation, navigate: navigateToScreen }} />;
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

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    setCurrentScreen(null); // Reset any full-screen content
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      
      {!currentScreen && (
        <View style={styles.tabBarContainer}>
          <View style={styles.tabBar}>
            <TabButton 
              label="Accueil"
              icon="home"
              isActive={activeTab === 'Home'}
              onPress={() => handleTabPress('Home')}
            />
            <TabButton 
              label="Emplois"
              icon="briefcase"
              isActive={activeTab === 'Jobs'}
              onPress={() => handleTabPress('Jobs')}
            />
            <TabButton 
              label="CV"
              icon="file-document-outline"
              isActive={activeTab === 'Resume'}
              onPress={() => handleTabPress('Resume')}
            />
            <TabButton 
              label="Entretiens"
              icon="calendar-clock"
              isActive={activeTab === 'Interviews'}
              onPress={() => handleTabPress('Interviews')}
            />
            <TabButton 
              label="Profil"
              icon="account-circle"
              isActive={activeTab === 'Profile'}
              onPress={() => handleTabPress('Profile')}
            />
          </View>
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
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Icon 
        name={icon}
        size={22} 
        color={isActive ? colors.graduate : colors.gray500}
      />
      <Text style={[
        styles.tabLabel,
        isActive && styles.activeTabLabel
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: fontSize.xs,
    color: colors.gray500,
    marginTop: 4,
  },
  activeTabLabel: {
    color: colors.graduate,
    fontWeight: fontWeight.medium,
  }
});

export default GraduateNavigator; 