import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Switch
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';

const ProfileScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleNotifications = () => setNotifications(previousState => !previousState);
  const toggleEmailAlerts = () => setEmailAlerts(previousState => !previousState);
  const toggleDarkMode = () => setDarkMode(previousState => !previousState);
  
  const userData = {
    name: 'Hamza Alami',
    title: 'Développeur Full Stack',
    location: 'Casablanca, Maroc',
    profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'hamza.alami@example.com',
    phone: '+212 612 345 678',
    connections: 43,
    savedJobs: 12,
    applications: 8,
    viewed: 35,
    completionPercentage: 85,
  };

  const renderProgressBar = (progress) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.graduate} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.graduate, '#1E8E7E']}
        style={styles.header}
      >
        <View style={styles.profileInfo}>
          <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileTitle}>{userData.title}</Text>
            <View style={styles.locationContainer}>
              <Icon name="map-marker" size={14} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.profileLocation}>{userData.location}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.profileCompletion}>
          <View style={styles.completionTextContainer}>
            <Text style={styles.completionTitle}>Profil complété à {userData.completionPercentage}%</Text>
            <Text style={styles.completionSubtitle}>Complétez votre profil pour plus de visibilité</Text>
          </View>
          {renderProgressBar(userData.completionPercentage)}
        </View>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userData.connections}</Text>
            <Text style={styles.statLabel}>Relations</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userData.applications}</Text>
            <Text style={styles.statLabel}>Candidatures</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userData.savedJobs}</Text>
            <Text style={styles.statLabel}>Emplois enregistrés</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userData.viewed}</Text>
            <Text style={styles.statLabel}>Vues de profil</Text>
          </View>
        </View>
        
        {/* Account settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Informations du compte</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="account" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Informations personnelles</Text>
              <Text style={styles.settingDescription}>Nom, titre, photo de profil</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="email" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Email</Text>
              <Text style={styles.settingDescription}>{userData.email}</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="phone" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Téléphone</Text>
              <Text style={styles.settingDescription}>{userData.phone}</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="lock" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Mot de passe</Text>
              <Text style={styles.settingDescription}>Modifier votre mot de passe</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.gray400} />
          </TouchableOpacity>
        </View>
        
        {/* Preferences */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="bell" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notifications push</Text>
              <Text style={styles.settingDescription}>Recevoir des notifications dans l'application</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: colors.gray300, true: colors.graduate + '80' }}
              thumbColor={notifications ? colors.graduate : colors.gray400}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="email-outline" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Alertes email</Text>
              <Text style={styles.settingDescription}>Recevoir des offres d'emploi par email</Text>
            </View>
            <Switch
              value={emailAlerts}
              onValueChange={toggleEmailAlerts}
              trackColor={{ false: colors.gray300, true: colors.graduate + '80' }}
              thumbColor={emailAlerts ? colors.graduate : colors.gray400}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="theme-light-dark" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Mode sombre</Text>
              <Text style={styles.settingDescription}>Changer l'apparence de l'application</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.gray300, true: colors.graduate + '80' }}
              thumbColor={darkMode ? colors.graduate : colors.gray400}
            />
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="translate" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Langue</Text>
              <Text style={styles.settingDescription}>Français</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="map-marker-radius" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Emplacement</Text>
              <Text style={styles.settingDescription}>Casablanca, Maroc</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.gray400} />
          </TouchableOpacity>
        </View>
        
        {/* Additional options */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Plus</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="file-document-outline" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>CV et documents</Text>
              <Text style={styles.settingDescription}>Gérez vos CV et lettres de motivation</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="school" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Formation</Text>
              <Text style={styles.settingDescription}>Parcours académique et certifications</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="briefcase" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Expérience professionnelle</Text>
              <Text style={styles.settingDescription}>Postes occupés et entreprises</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="help-circle-outline" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Aide et support</Text>
              <Text style={styles.settingDescription}>FAQ, contact, signaler un problème</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.gray400} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="information-outline" size={22} color={colors.graduate} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>À propos</Text>
              <Text style={styles.settingDescription}>Version de l'application, CGU, confidentialité</Text>
            </View>
            <Icon name="chevron-right" size={22} color={colors.gray400} />
          </TouchableOpacity>
        </View>
        
        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="logout" size={18} color={colors.error} />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
        
        {/* Version info */}
        <Text style={styles.versionText}>ForsaPlus v1.0.0</Text>
        
        {/* Bottom padding */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileTextContainer: {
    marginLeft: spacing.md,
  },
  profileName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  profileTitle: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  profileLocation: {
    fontSize: fontSize.xs,
    color: colors.white,
    opacity: 0.8,
    marginLeft: 4,
  },
  profileCompletion: {
    marginTop: spacing.sm,
  },
  completionTextContainer: {
    marginBottom: spacing.xs,
  },
  completionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.white,
  },
  completionSubtitle: {
    fontSize: fontSize.xs,
    color: colors.white,
    opacity: 0.8,
    marginTop: 2,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: spacing.lg,
    marginTop: -20,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statCard: {
    width: '48%',
    padding: spacing.sm,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.graduate,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  sectionContainer: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.graduate + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.errorLight,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.error,
    marginLeft: spacing.sm,
  },
  versionText: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});

export default ProfileScreen; 