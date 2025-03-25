import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight, lineHeight } from '../../theme/typography';
import LinearGradient from 'react-native-linear-gradient';

// Career details by category
const CAREERS = {
  tech: {
    title: "Technologie",
    icon: "laptop",
    color: "#4A6FFF",
    careers: [
      {
        id: "t1",
        title: "Développeur Full Stack",
        description: "Créer des applications web complètes, du front-end au back-end, en utilisant diverses technologies et frameworks.",
        skills: ["JavaScript", "React", "Node.js", "MongoDB", "Git"],
        education: ["Génie Logiciel", "Développement Web", "Computer Science"],
        salary: "10 000 - 25 000 MAD",
        outlook: "Forte demande",
        companies: ["SQLI", "Capgemini", "OCP Group", "CBI"]
      },
      {
        id: "t2",
        title: "Data Scientist",
        description: "Analyser et interpréter des données complexes pour aider les entreprises à prendre des décisions éclairées.",
        skills: ["Python", "Machine Learning", "Statistiques", "SQL", "Data Visualization"],
        education: ["Data Science", "Statistiques", "Mathématiques Appliquées"],
        salary: "15 000 - 30 000 MAD",
        outlook: "En croissance",
        companies: ["OCP Group", "Société Générale", "IBM"]
      },
      {
        id: "t3",
        title: "Ingénieur DevOps",
        description: "Automatiser et optimiser les processus de développement et de déploiement logiciel.",
        skills: ["Linux", "Docker", "AWS/Azure", "CI/CD", "Scripting"],
        education: ["Génie Informatique", "Administration Système", "Cloud Computing"],
        salary: "12 000 - 28 000 MAD",
        outlook: "Très recherché",
        companies: ["Alten Maroc", "CBI", "Microsoft"]
      },
      {
        id: "t4",
        title: "Ingénieur Intelligence Artificielle",
        description: "Concevoir et développer des systèmes d'intelligence artificielle et d'apprentissage automatique.",
        skills: ["Machine Learning", "Deep Learning", "Python", "TensorFlow", "NLP"],
        education: ["Intelligence Artificielle", "Computer Science", "Data Science"],
        salary: "15 000 - 35 000 MAD",
        outlook: "En forte croissance",
        companies: ["IBM", "Microsoft", "OCP Group", "Huawei"]
      },
      {
        id: "t5",
        title: "Développeur Mobile",
        description: "Créer des applications mobiles performantes pour iOS et Android.",
        skills: ["React Native", "Swift", "Kotlin", "Flutter", "Firebase"],
        education: ["Développement Mobile", "Génie Logiciel", "Computer Science"],
        salary: "10 000 - 22 000 MAD",
        outlook: "Demande constante",
        companies: ["BeYable", "Inwi", "Avito", "Jumia"]
      }
    ]
  },
  business: {
    title: "Business & Management",
    icon: "chart-line",
    color: "#FF6B6B",
    careers: [
      {
        id: "b1",
        title: "Chef de Projet Digital",
        description: "Gérer des projets digitaux en coordonnant les équipes techniques et créatives pour livrer des produits de qualité.",
        skills: ["Gestion de projet", "Agile/Scrum", "Communication", "Budgétisation", "Analyse"],
        education: ["Management de Projet", "Commerce", "Informatique"],
        salary: "15 000 - 25 000 MAD",
        outlook: "Demande croissante",
        companies: ["Maroc Telecom", "Royal Air Maroc", "Inwi"]
      },
      {
        id: "b2",
        title: "Consultant Business",
        description: "Aider les entreprises à améliorer leurs performances en identifiant des problèmes et en proposant des solutions.",
        skills: ["Analyse commerciale", "Résolution de problèmes", "Communication", "Présentation"],
        education: ["MBA", "Commerce", "Finance"],
        salary: "18 000 - 35 000 MAD",
        outlook: "Stable",
        companies: ["Deloitte", "KPMG", "EY", "PWC"]
      },
      {
        id: "b3",
        title: "Entrepreneur",
        description: "Créer et développer sa propre entreprise en identifiant des opportunités de marché.",
        skills: ["Leadership", "Créativité", "Résilience", "Sens des affaires", "Négociation"],
        education: ["Entrepreneuriat", "Commerce", "Autodidacte"],
        salary: "Variable",
        outlook: "Opportunités croissantes",
        companies: ["Startups", "PME"]
      }
    ]
  },
  arts: {
    title: "Arts & Design",
    icon: "palette",
    color: "#8F57FF",
    careers: [
      {
        id: "a1",
        title: "Designer UX/UI",
        description: "Concevoir des interfaces utilisateur attrayantes et conviviales pour les applications et sites web.",
        skills: ["Design Thinking", "Wireframing", "Prototypage", "Adobe XD", "Figma"],
        education: ["Design Graphique", "Design d'Interaction", "HCI"],
        salary: "10 000 - 20 000 MAD",
        outlook: "Forte demande",
        companies: ["Agences digitales", "Startups", "SQLI"]
      },
      {
        id: "a2",
        title: "Directeur Artistique",
        description: "Superviser les aspects visuels des campagnes publicitaires ou des productions médiatiques.",
        skills: ["Créativité", "Leadership", "Adobe Creative Suite", "Storytelling"],
        education: ["Arts Graphiques", "Communication Visuelle", "Publicité"],
        salary: "15 000 - 30 000 MAD",
        outlook: "Stable",
        companies: ["Agences de pub", "Studios", "Médias"]
      }
    ]
  },
  science: {
    title: "Sciences & Recherche",
    icon: "microscope",
    color: "#33B679",
    careers: [
      {
        id: "s1",
        title: "Chercheur Scientifique",
        description: "Mener des recherches dans des domaines spécifiques pour faire avancer la connaissance scientifique.",
        skills: ["Méthode scientifique", "Analyse de données", "Rédaction scientifique", "Expérimentation"],
        education: ["Doctorat", "Master en Sciences", "Ingénierie"],
        salary: "12 000 - 25 000 MAD",
        outlook: "Stable",
        companies: ["Universités", "OCP Group", "Instituts de recherche"]
      },
      {
        id: "s2",
        title: "Ingénieur en Biotechnologie",
        description: "Appliquer les principes d'ingénierie aux systèmes biologiques pour créer des produits ou technologies.",
        skills: ["Biologie", "Chimie", "Génie génétique", "Analyse de laboratoire"],
        education: ["Biotechnologie", "Biochimie", "Génie biologique"],
        salary: "15 000 - 28 000 MAD",
        outlook: "Croissance modérée",
        companies: ["Laboratoires", "Industrie pharmaceutique", "Agronomie"]
      }
    ]
  },
  health: {
    title: "Santé",
    icon: "hospital-box",
    color: "#EA4335",
    careers: [
      {
        id: "h1",
        title: "Médecin",
        description: "Diagnostiquer et traiter les maladies, blessures et autres conditions médicales des patients.",
        skills: ["Diagnostic", "Évaluation clinique", "Communication", "Empathie"],
        education: ["Médecine générale", "Spécialités médicales"],
        salary: "20 000 - 50 000 MAD",
        outlook: "Forte demande",
        companies: ["Hôpitaux", "Cliniques", "Cabinets médicaux"]
      },
      {
        id: "h2",
        title: "Ingénieur Biomédical",
        description: "Concevoir des équipements, dispositifs et logiciels utilisés dans le domaine médical.",
        skills: ["Ingénierie", "Biologie", "Électronique", "Informatique médicale"],
        education: ["Génie biomédical", "Électronique médicale"],
        salary: "15 000 - 30 000 MAD",
        outlook: "En croissance",
        companies: ["Fabricants d'équipements médicaux", "Hôpitaux", "R&D médicale"]
      }
    ]
  }
};

const CareerPathsScreen = ({ navigation, route }) => {
  const category = route.params?.category || 'tech';
  const categoryData = CAREERS[category];
  
  const renderCareerItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.careerCard}
      activeOpacity={0.9}
    >
      <View style={[styles.careerCardHeader, { backgroundColor: categoryData.color + '15' }]}>
        <View style={styles.careerCardTitle}>
          <Text style={styles.careerTitle}>{item.title}</Text>
          <Text style={[styles.careerOutlook, { color: categoryData.color }]}>
            {item.outlook}
          </Text>
        </View>
        <Text style={styles.careerDescription}>{item.description}</Text>
      </View>
      
      <View style={styles.careerCardBody}>
        <View style={styles.careerSection}>
          <Text style={styles.sectionTitle}>Compétences requises</Text>
          <View style={styles.skillsContainer}>
            {item.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.careerSection}>
          <Text style={styles.sectionTitle}>Formation recommandée</Text>
          {item.education.map((edu, index) => (
            <View key={index} style={styles.eduItem}>
              <Icon name="school-outline" size={16} color={categoryData.color} />
              <Text style={styles.eduText}>{edu}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.careerInfoRow}>
          <View style={styles.careerInfoItem}>
            <Text style={styles.infoLabel}>Salaire mensuel</Text>
            <View style={styles.infoValueContainer}>
              <Icon name="currency-usd" size={16} color={categoryData.color} />
              <Text style={styles.infoValue}>{item.salary}</Text>
            </View>
          </View>
          
          <View style={styles.careerInfoItem}>
            <Text style={styles.infoLabel}>Entreprises qui recrutent</Text>
            <Text style={styles.companyList}>{item.companies.join(', ')}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.exploreButton, { borderColor: categoryData.color }]}
          onPress={() => navigation.navigate('Internships')}
        >
          <Text style={[styles.exploreButtonText, { color: categoryData.color }]}>
            Voir les stages dans ce domaine
          </Text>
          <Icon name="arrow-right" size={16} color={categoryData.color} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={categoryData.color}
      />
      
      {/* Header */}
      <LinearGradient
        colors={[categoryData.color, categoryData.color + 'AA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Icon name={categoryData.icon} size={24} color={colors.white} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Carrières en</Text>
            <Text style={styles.headerSubtitle}>{categoryData.title}</Text>
          </View>
        </View>
      </LinearGradient>
      
      <FlatList
        data={categoryData.careers}
        renderItem={renderCareerItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.introSection}>
            <Text style={styles.introText}>
              Découvrez les différentes carrières dans le domaine {categoryData.title.toLowerCase()}, 
              les compétences requises et les formations recommandées pour chaque métier.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerTitle: {
    fontSize: fontSize.md,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  headerSubtitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  introSection: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  introText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: lineHeight.md,
  },
  careerCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
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
  careerCardHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  careerCardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  careerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  careerOutlook: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  careerDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: lineHeight.md,
  },
  careerCardBody: {
    padding: 20,
  },
  careerSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: 'rgba(30, 136, 229, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: fontSize.sm,
    color: colors.universityStudent,
  },
  eduItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eduText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginLeft: 8,
  },
  careerInfoRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  careerInfoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    marginLeft: 5,
  },
  companyList: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: lineHeight.sm,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
  },
  exploreButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    marginRight: 8,
  }
});

export default CareerPathsScreen; 