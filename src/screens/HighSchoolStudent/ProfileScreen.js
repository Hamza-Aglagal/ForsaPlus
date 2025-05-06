import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Switch,
  TextInput,
  Alert
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { authService } from '../../services/api';
import { useNavigation } from '@react-navigation/native';

const ProfileMenuItem = ({ icon, title, subtitle, badge, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={colors.studentGradient.purple}
        style={styles.menuIconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Icon name={icon} size={22} color={colors.white} />
      </LinearGradient>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {badge ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : (
        <Icon name="chevron-right" size={22} color={colors.gray400} />
      )}
    </TouchableOpacity>
  );
};

const SettingsSwitch = ({ icon, title, value, onToggle }) => {
  return (
    <View style={styles.settingsItem}>
      <LinearGradient
        colors={value ? colors.studentGradient.blue : colors.studentGradient.light}
        style={styles.menuIconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Icon name={icon} size={22} color={colors.white} />
      </LinearGradient>
      <Text style={styles.menuTitle}>{title}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.gray300, true: colors.student + '70' }}
        thumbColor={value ? colors.student : colors.gray100}
      />
    </View>
  );
};

const InterestTag = ({ title, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.interestTag,
        isSelected ? { backgroundColor: colors.student, borderColor: colors.student } : { backgroundColor: 'transparent', borderColor: colors.gray300 }
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.interestTagText,
          isSelected ? { color: colors.white } : { color: colors.textPrimary }
        ]}
      >
        {title}
      </Text>
      {isSelected && (
        <Icon name="check" size={14} color={colors.white} style={styles.checkIcon} />
      )}
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [languagePreference, setLanguagePreference] = useState('Français');
  const [selectedInterests, setSelectedInterests] = useState(['Informatique', 'Design', 'Sciences']);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);

  const userInfo = {
    firstName: 'Karim',
    lastName: 'Benali',
    email: 'karim.benali@gmail.com',
    phone: '+212 6 12 34 56 78',
    profileImage: null,
    bacYear: '2023',
    bacType: 'Sciences Mathématiques',
    bacMention: 'Très Bien',
    bacAverage: '17.5/20',
  };

  const interests = [
    'Informatique', 'Design', 'Sciences', 'Médecine', 'Ingénierie', 
    'Commerce', 'Droit', 'Architecture', 'Langues', 'Psychologie', 
    'Économie', 'Gestion', 'Tourisme', 'Agriculture', 'Arts'
  ];

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Handle logout with confirmation
  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Déconnecter",
          style: "destructive",
          onPress: async () => {
            try {
              await authService.logout();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
              });
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Erreur', 'Échec de la déconnexion. Veuillez réessayer.');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={colors.studentGradient.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.profileImageContainer}>
            {userInfo.profileImage ? (
              <Image source={{ uri: userInfo.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImageText}>{userInfo.firstName.charAt(0)}{userInfo.lastName.charAt(0)}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.editButton}>
              <Icon name="camera" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userInfo.firstName} {userInfo.lastName}</Text>
          <View style={styles.bacInfoContainer}>
            <Icon name="school" size={16} color={colors.white} style={{ marginRight: 4 }} />
            <Text style={styles.bacInfo}>{userInfo.bacType} | {userInfo.bacMention}</Text>
          </View>
        </LinearGradient>

        {/* Personal Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Informations Personnelles</Text>
            <TouchableOpacity onPress={() => setIsEditingPersonalInfo(!isEditingPersonalInfo)}>
              <Text style={styles.editText}>
                {isEditingPersonalInfo ? 'Enregistrer' : 'Modifier'}
              </Text>
            </TouchableOpacity>
          </View>

          {isEditingPersonalInfo ? (
            <View style={styles.editForm}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Prénom</Text>
                <TextInput
                  style={styles.textInput}
                  value={userInfo.firstName}
                  placeholder="Prénom"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nom</Text>
                <TextInput
                  style={styles.textInput}
                  value={userInfo.lastName}
                  placeholder="Nom"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  value={userInfo.email}
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Téléphone</Text>
                <TextInput
                  style={styles.textInput}
                  value={userInfo.phone}
                  placeholder="Téléphone"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          ) : (
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Icon name="email-outline" size={20} color={colors.student} style={styles.infoIcon} />
                <Text style={styles.infoText}>{userInfo.email}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="phone-outline" size={20} color={colors.student} style={styles.infoIcon} />
                <Text style={styles.infoText}>{userInfo.phone}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Academic Profile Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Parcours Scolaire</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>Modifier</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.academicCard}>
            <LinearGradient
              colors={colors.studentGradient.light}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.academicHeader}
            >
              <LinearGradient
                colors={colors.studentGradient.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.academicIconContainer}
              >
                <Icon name="school" size={24} color={colors.white} />
              </LinearGradient>
              <View>
                <Text style={styles.academicTitle}>Baccalauréat {userInfo.bacYear}</Text>
                <Text style={styles.academicSubtitle}>{userInfo.bacType}</Text>
              </View>
            </LinearGradient>
            <View style={styles.academicDetails}>
              <View style={styles.academicDetailItem}>
                <Text style={styles.detailLabel}>Mention</Text>
                <Text style={styles.detailValue}>{userInfo.bacMention}</Text>
              </View>
              <View style={styles.academicDetailItem}>
                <Text style={styles.detailLabel}>Moyenne Générale</Text>
                <Text style={styles.detailValue}>{userInfo.bacAverage}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Centres d'Intérêt</Text>
            <Text style={styles.interestDescription}>Sélectionnez les domaines qui vous intéressent pour améliorer les recommandations</Text>
          </View>

          <View style={styles.interestsContainer}>
            {interests.map((interest) => (
              <InterestTag
                key={interest}
                title={interest}
                isSelected={selectedInterests.includes(interest)}
                onPress={() => toggleInterest(interest)}
              />
            ))}
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          
          <View style={styles.settingsContainer}>
            <SettingsSwitch
              icon="bell-outline"
              title="Notifications"
              value={notificationsEnabled}
              onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
            />
            
            <SettingsSwitch
              icon="theme-light-dark"
              title="Mode sombre"
              value={darkModeEnabled}
              onToggle={() => setDarkModeEnabled(!darkModeEnabled)}
            />
            
            <ProfileMenuItem
              icon="translate"
              title="Langue"
              subtitle={languagePreference}
              onPress={() => {}}
            />
            
            <ProfileMenuItem
              icon="shield-account-outline"
              title="Confidentialité"
              onPress={() => {}}
            />
            
            <ProfileMenuItem
              icon="help-circle-outline"
              title="Aide et support"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Logout Button - Update the onPress handler */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={['#FF6B6B', '#FF4757']}
            style={styles.logoutIconContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="logout-variant" size={20} color={colors.white} />
          </LinearGradient>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>ForsaPlus v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImageText: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.student,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  userName: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bacInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
  },
  bacInfo: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
  },
  section: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  editText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.student,
    alignSelf: 'flex-end',
  },
  infoContainer: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.student + '08',
    borderRadius: 12,
  },
  infoIcon: {
    marginRight: spacing.sm,
  },
  infoText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  editForm: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    backgroundColor: colors.gray100 + '30',
  },
  academicCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  academicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  academicIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  academicTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
  },
  academicSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  academicDetails: {
    padding: spacing.md,
  },
  academicDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  detailLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  interestDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.sm,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  interestTagText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  checkIcon: {
    marginLeft: spacing.xs,
  },
  settingsContainer: {
    backgroundColor: colors.white,
    borderRadius: 18,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  badgeContainer: {
    backgroundColor: colors.student,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 15,
    minWidth: 28,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.xl,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.error,
  },
  versionInfo: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  versionText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  }
});

export default ProfileScreen; 