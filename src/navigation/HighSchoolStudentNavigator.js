import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet, Platform, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Import screens
import HomeScreen from '../screens/HighSchoolStudent/HomeScreen';
import OrientationScreen from '../screens/HighSchoolStudent/OrientationScreen';
import OrientationTestScreen from '../screens/HighSchoolStudent/OrientationTestScreen';
import ParcourTimelineScreen from '../screens/HighSchoolStudent/ParcourTimelineScreen';
import ProfileScreen from '../screens/HighSchoolStudent/ProfileScreen';
import SchoolsScreen from '../screens/HighSchoolStudent/SchoolsScreen';
import SchoolDetailScreen from '../screens/HighSchoolStudent/SchoolDetailScreen';
import AllSchoolsScreen from '../screens/HighSchoolStudent/AllSchoolsScreen';
import HowToChooseSchoolScreen from '../screens/HighSchoolStudent/HowToChooseSchoolScreen';
import SchoolSelectionCriteriaScreen from '../screens/HighSchoolStudent/SchoolSelectionCriteriaScreen';
import KeyDatesScreen from '../screens/HighSchoolStudent/KeyDatesScreen';
import NewsDetailScreen from '../screens/HighSchoolStudent/NewsDetailScreen';
import AllNewsScreen from '../screens/HighSchoolStudent/AllNewsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom tab bar icon component with gradient
const TabIcon = ({ focused, color, icon }) => {
  return (
    <View style={styles.iconContainer}>
      {focused ? (
        <LinearGradient
          colors={colors.studentGradient.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.focusedIconBackground}
        >
          <Icon name={icon} color="#ffffff" size={24} />
        </LinearGradient>
      ) : (
        <Icon name={icon} color={color} size={22} />
      )}
    </View>
  );
};

// Stack navigator for Orientation tab
const OrientationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrientationMain" component={OrientationScreen} />
      <Stack.Screen name="OrientationTest" component={OrientationTestScreen} />
      <Stack.Screen name="ParcourTimeline" component={ParcourTimelineScreen} />
    </Stack.Navigator>
  );
};

// Stack navigator for Schools tab
const SchoolsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="SchoolsMain" component={SchoolsScreen} />
      <Stack.Screen name="SchoolDetail" component={SchoolDetailScreen} />
      <Stack.Screen name="AllSchools" component={AllSchoolsScreen} />
      <Stack.Screen name="HowToChooseSchool" component={HowToChooseSchoolScreen} />
      <Stack.Screen name="SchoolSelectionCriteria" component={SchoolSelectionCriteriaScreen} />
    </Stack.Navigator>
  );
};

// Stack navigator for Home tab
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="KeyDates" component={KeyDatesScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <Stack.Screen name="AllNews" component={AllNewsScreen} />
    </Stack.Navigator>
  );
};

const HighSchoolStudentNavigator = ({ route }) => {
  const studentInfo = route?.params?.studentInfo || {};
  const isAuthenticated = route?.params?.isAuthenticated || false;
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.student,
        tabBarInactiveTintColor: colors.gray500,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          height: 65,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: fontWeight.semiBold,
          marginTop: -5,
        },
        headerShown: false,
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        // Only show label when tab is NOT focused
        tabBarLabel: ({ focused, color }) => {
          let label = '';
          
          if (route.name === 'Home') {
            label = 'Accueil';
          } else if (route.name === 'Schools') {
            label = 'Écoles';
          } else if (route.name === 'Orientation') {
            label = 'Orientation';
          } else if (route.name === 'Profile') {
            label = 'Profil';
          }
          
          // Don't return a label when the tab is focused
          if (focused) {
            return null;
          }
          
          return (
            <Text style={styles.inactiveLabelText}>
              {label}
            </Text>
          );
        }
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="Schools" 
        component={SchoolsStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="school" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="Orientation" 
        component={OrientationStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="compass" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="account" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  focusedIconBackground: {
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.student,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  inactiveLabelText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.gray500,
    marginTop: 4,
    textAlign: 'center',
  }
});

export default HighSchoolStudentNavigator; 