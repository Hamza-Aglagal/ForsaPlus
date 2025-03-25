import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
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