import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight, lineHeight } from '../../theme/typography';
import LinearGradient from 'react-native-linear-gradient';

// Sample user data
const USER_DATA = {
  name: "Mohammed Hamza",
  email: "m.hamza@student.emsi.ma",
  phone: "+212 612 345 678",
  university: "EMSI - École Marocaine des Sciences de l'Ingénieur",
  major: "Génie Informatique",
  year: "Bac+2",
  bio: "Étudiant passionné par le développement web et mobile. Je recherche un stage qui me permettra d'appliquer mes connaissances et d'acquérir de l'expérience professionnelle.",
  skills: [
    { name: "React.js", level: 80 },
    { name: "JavaScript", level: 85 },
    { name: "Node.js", level: 70 },
    { name: "Python", level: 65 },
    { name: "SQL", level: 75 }
  ],
  languages: [
    { name: "Français", level: "Courant" },
    { name: "Anglais", level: "Professionnel" },
    { name: "Arabe", level: "Natif" }
  ],
  education: [
    {
      id: "1",
      institution: "EMSI Casablanca",
      degree: "Bachelor en Génie Informatique",
      years: "2021 - Présent"
    },
    {
      id: "2",
      institution: "Lycée Al Khawarizmi",
      degree: "Baccalauréat Sciences Mathématiques",
      years: "2020 - 2021"
    }
  ],
  experience: [
    {
      id: "1",
      company: "TechnoLab",
      position: "Stage d'été - Développeur Web",
      years: "Été 2022"
    }
  ],
  projects: [
    {
      id: "1",
      title: "Application de gestion de tâches",
      type: "Mobile"
    },
    {
      id: "2",
      title: "Portfolio personnel",
      type: "Web"
    }
  ]
};

const ProfileScreen = ({ navigation }) => {
  const [userData] = useState(USER_DATA);
  
  // Skill progress bar component
  const SkillBar = ({ name, level }) => (
    <View style={styles.skillItem}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{name}</Text>
        <Text style={styles.skillLevel}>{level}%</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${level}%` }]} />
      </View>
    </View>
  );

  // Project Item component
  const ProjectItem = ({ title, type }) => (
    <View style={styles.projectItem}>
      <View style={[styles.projectTypeTag, 
        {backgroundColor: type === "Mobile" ? "rgba(74, 111, 255, 0.1)" : "rgba(143, 87, 255, 0.1)"}]}>
        <Icon 
          name={type === "Mobile" ? "cellphone" : "web"} 
          size={14} 
          color={type === "Mobile" ? "#4A6FFF" : "#8F57FF"} 
        />
        <Text style={[styles.projectTypeText, 
          {color: type === "Mobile" ? "#4A6FFF" : "#8F57FF"}]}>
          {type}
        </Text>
      </View>
      <Text style={styles.projectTitle}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.universityStudent}
      />
      
      {/* Header with Gradient */}
      <LinearGradient
        colors={[colors.universityStudent, "#4776E6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.userImageContainer}>
            <Image 
              source={{ uri: "https://via.placeholder.com/150/1E88E5/FFFFFF?text=MH" }}
              style={styles.userImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Icon name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userMajor}>{userData.major}</Text>
            <View style={styles.universityContainer}>
              <Icon name="school-outline" size={14} color="rgba(255, 255, 255, 0.8)" />
              <Text style={styles.universityText} numberOfLines={1}>
                {userData.university}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Icon name="pencil" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bio Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="account-outline" size={20} color={colors.universityStudent} />
            <Text style={styles.sectionTitle}>À propos de moi</Text>
          </View>
          <Text style={styles.bioText}>{userData.bio}</Text>
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Icon name="email-outline" size={16} color={colors.universityStudent} />
              <Text style={styles.contactText}>{userData.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="phone-outline" size={16} color={colors.universityStudent} />
              <Text style={styles.contactText}>{userData.phone}</Text>
            </View>
          </View>
        </View>
        
        {/* Skills Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="lightbulb-outline" size={20} color={colors.universityStudent} />
            <Text style={styles.sectionTitle}>Compétences</Text>
          </View>
          
          <View style={styles.skillsContainer}>
            {userData.skills.map((skill, index) => (
              <SkillBar key={index} name={skill.name} level={skill.level} />
            ))}
          </View>
        </View>
        
        {/* Languages Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="translate" size={20} color={colors.universityStudent} />
            <Text style={styles.sectionTitle}>Langues</Text>
          </View>
          
          <View style={styles.languagesContainer}>
            {userData.languages.map((language, index) => (
              <View key={index} style={styles.languageItem}>
                <Text style={styles.languageName}>{language.name}</Text>
                <View style={styles.languageBadge}>
                  <Text style={styles.languageLevel}>{language.level}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Education Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="school-outline" size={20} color={colors.universityStudent} />
            <Text style={styles.sectionTitle}>Formation</Text>
          </View>
          
          <View style={styles.timelineContainer}>
            {userData.education.map((edu, index) => (
              <View key={edu.id} style={styles.timelineItem}>
                <View style={styles.timelineLine}>
                  <View style={styles.timelineDot} />
                  {index < userData.education.length - 1 && <View style={styles.timelineTrail} />}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>{edu.institution}</Text>
                  <Text style={styles.timelineSubtitle}>{edu.degree}</Text>
                  <Text style={styles.timelineYears}>{edu.years}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Experience Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="briefcase-outline" size={20} color={colors.universityStudent} />
            <Text style={styles.sectionTitle}>Expérience</Text>
          </View>
          
          <View style={styles.timelineContainer}>
            {userData.experience.map((exp, index) => (
              <View key={exp.id} style={styles.timelineItem}>
                <View style={styles.timelineLine}>
                  <View style={styles.timelineDot} />
                  {index < userData.experience.length - 1 && <View style={styles.timelineTrail} />}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>{exp.company}</Text>
                  <Text style={styles.timelineSubtitle}>{exp.position}</Text>
                  <Text style={styles.timelineYears}>{exp.years}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Projects Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="cube-outline" size={20} color={colors.universityStudent} />
            <Text style={styles.sectionTitle}>Projets</Text>
          </View>
          
          <View style={styles.projectsContainer}>
            {userData.projects.map((project) => (
              <ProjectItem key={project.id} title={project.title} type={project.type} />
            ))}
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate("CV")}
          >
            <Icon name="file-document-outline" size={20} color={colors.universityStudent} />
            <Text style={styles.actionButtonText}>Voir mon CV</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share-variant" size={20} color={colors.universityStudent} />
            <Text style={styles.actionButtonText}>Partager mon profil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 25,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImageContainer: {
    position: 'relative',
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.universityStudent,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: 2,
  },
  userMajor: {
    fontSize: fontSize.md,
    color: colors.white,
    marginBottom: 4,
  },
  universityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  universityText: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  editProfileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 15,
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginLeft: 8,
  },
  bioText: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.md,
    color: colors.textSecondary,
    marginBottom: 15,
  },
  contactInfo: {
    marginTop: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  skillsContainer: {
    marginBottom: 5,
  },
  skillItem: {
    marginBottom: 12,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  skillName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  skillLevel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.universityStudent,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: colors.gray100,
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.universityStudent,
    borderRadius: 3,
  },
  languagesContainer: {
    marginBottom: 5,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  languageName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  languageBadge: {
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  languageLevel: {
    fontSize: fontSize.xs,
    color: colors.universityStudent,
    fontWeight: fontWeight.medium,
  },
  timelineContainer: {
    marginLeft: 5,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timelineLine: {
    width: 20,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.universityStudent,
  },
  timelineTrail: {
    width: 2,
    height: '90%',
    backgroundColor: colors.gray200,
    position: 'absolute',
    top: 12,
    left: 5,
  },
  timelineContent: {
    flex: 1,
    marginLeft: 10,
    paddingBottom: 5,
  },
  timelineTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  timelineSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  timelineYears: {
    fontSize: fontSize.xs,
    color: colors.gray500,
  },
  projectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  projectItem: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  projectTypeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  projectTypeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    marginLeft: 4,
  },
  projectTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 50,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: '48%',
  },
  actionButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.universityStudent,
    marginLeft: 8,
  }
});

export default ProfileScreen; 