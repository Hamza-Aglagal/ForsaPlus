import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { authService } from '../services/api';

// Import screens
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import UserTypeScreen from '../screens/Auth/UserTypeScreen';
import StudentInfoScreen from '../screens/Auth/StudentInfoScreen';
import StudentInterestsScreen from '../screens/Auth/StudentInterestsScreen';
import HighSchoolStudentNavigator from './HighSchoolStudentNavigator';
import UniversityStudentNavigator from './UniversityStudentNavigator';
import GraduateNavigator from './GraduateNavigator';

// Create a stack navigator
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userSession, setUserSession] = useState(null);
  
  useEffect(() => {
    // Check if user is already logged in   
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await authService.isLoggedIn();
        if (isLoggedIn) {
          const user = await authService.getStoredUser();
          setUserSession(user);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLoginStatus();
  }, []);
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  
  // Determine initial route based on auth status
  const initialRoute = userSession ? getInitialRouteForUserType(userSession.userType) : 'Welcome';
  
  // Helper function to determine initial route based on user type
  function getInitialRouteForUserType(userType) {
    switch(userType) {
      case 'highschool':
        return 'HighSchoolStudentApp';
      case 'university':
        return 'UniversityStudentApp';
      case 'graduate':
        return 'GraduateApp';
      default:
        return 'Welcome';
    }
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="UserType" component={UserTypeScreen} />
      <Stack.Screen name="StudentInfo" component={StudentInfoScreen} />
      <Stack.Screen name="StudentInterests" component={StudentInterestsScreen} />
      <Stack.Screen name="HighSchoolStudentApp" component={HighSchoolStudentNavigator} />
      <Stack.Screen name="UniversityStudentApp" component={UniversityStudentNavigator} />
      <Stack.Screen name="GraduateApp" component={GraduateNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator; 