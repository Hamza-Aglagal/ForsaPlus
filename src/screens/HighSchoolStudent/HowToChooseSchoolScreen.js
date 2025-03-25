import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const StepCard = ({ number, title, description, iconName, expanded, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.stepCard, expanded && styles.expandedCard]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.stepHeader}>
        <View style={styles.stepNumberContainer}>
          <Text style={styles.stepNumber}>{number}</Text>
        </View>

        <View style={styles.stepTitleContainer}>
          <Text style={styles.stepTitle}>{title}</Text>
          <Icon 
            name={expanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color={colors.textPrimary} 
          />
        </View>
      </View>

      {expanded && (
        <View style={styles.stepContent}>
          <View style={styles.stepIconContainer}>
            <Icon name={iconName} size={40} color={colors.student} />
          </View>
          <Text style={styles.stepDescription}>{description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const QuestionCard = ({ question, answer, expanded, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.questionCard, expanded && styles.expandedCard]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.questionHeader}>
        <View style={styles.questionContainer}>
          <Icon name="help-circle" size={20} color={colors.student} style={styles.questionIcon} />
          <Text style={styles.questionText}>{question}</Text>
        </View>
        <Icon 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={colors.textPrimary} 
        />
      </View>

      {expanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const HowToChooseSchoolScreen = ({ navigation }) => {
  const [expandedStep, setExpandedStep] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleStep = (stepId) => {
    if (expandedStep === stepId) {
      setExpandedStep(null);
    } else {
      setExpandedStep(stepId);
    }
  };

  const toggleQuestion = (questionId) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(questionId);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Identifier vos intérêts et aptitudes",
      description: "Commencez par réfléchir à ce qui vous passionne et aux matières dans lesquelles vous excellez. Faites le bilan de vos forces, faiblesses, et de ce qui vous motive réellement. Vous pouvez utiliser notre test d'orientation pour vous aider à identifier vos domaines d'intérêt et aptitudes naturelles. Plus votre choix sera aligné avec votre personnalité et vos aptitudes, plus vous aurez de chances de réussir et d'être épanoui dans votre parcours.",
      iconName: "lightbulb"
    },
    {
      id: 2,
      title: "Explorer les filières et métiers",
      description: "Renseignez-vous sur les différentes filières détudes et les débouchés professionnels qu'elles offrent. Recherchez des informations sur les métiers qui vous intéressent : conditions de travail, salaires, perspectives d'évolution. N'hésitez pas à rencontrer des professionnels ou à effectuer des stages d'observation pour vous faire une idée concrète. Vous pouvez également utiliser notre section \"Découvrez les filières\" pour explorer les possibilités.",
      iconName: "compass"
    },
    {
      id: 3,
      title: "Évaluer les établissements",
      description: "Comparez les établissements qui proposent les formations correspondant à votre projet. Critères à considérer : réputation académique, taux de réussite, qualité de l'enseignement, infrastructures, vie étudiante, frais de scolarité, accessibilité. Consultez les classements, mais prenez-les avec recul. Visitez si possible les campus lors des journées portes ouvertes pour vous imprégner de l'ambiance et rencontrer étudiants et enseignants.",
      iconName: "school"
    },
    {
      id: 4,
      title: "Considérer les aspects pratiques",
      description: "Prenez en compte des facteurs comme la localisation (distance de votre domicile, coût de la vie dans la ville), les possibilités de logement, les bourses et aides financières disponibles. Réfléchissez également à la durée des études et aux possibilités de poursuite détudes. Ces éléments pratiques peuvent avoir un impact significatif sur votre expérience étudiante et votre réussite.",
      iconName: "map-marker"
    },
    {
      id: 5,
      title: "Examiner les conditions d'admission",
      description: "Informez-vous sur les prérequis et procédures d'admission des établissements qui vous intéressent. Certaines écoles organisent des concours, d'autres sélectionnent sur dossier ou proposent des admissions parallèles. Vérifiez les dates importantes et préparez-vous adéquatement aux épreuves ou entretiens éventuels. Anticipez pour ne pas manquer les périodes d'inscription.",
      iconName: "clipboard-check"
    },
    {
      id: 6,
      title: "Consulter et demander conseil",
      description: "Échangez avec vos professeurs, conseillers d'orientation, famille et amis. Leurs perspectives peuvent vous aider à clarifier votre réflexion. N'hésitez pas à contacter directement les établissements pour des informations spécifiques. Vous pouvez également consulter les forums et groupes d'étudiants sur les réseaux sociaux pour avoir des retours d'expérience.",
      iconName: "account-group"
    },
    {
      id: 7,
      title: "Prendre une décision réfléchie",
      description: "Après avoir rassemblé toutes ces informations, prenez le temps de peser le pour et le contre de chaque option. Faites confiance à votre jugement tout en restant réaliste. Gardez à l'esprit que vous pouvez toujours vous réorienter si nécessaire - votre premier choix n'est pas définitif. L'important est de faire un choix éclairé qui correspond à vos aspirations et possibilités actuelles.",
      iconName: "check-circle"
    }
  ];

  const questions = [
    {
      id: 1,
      question: "Comment savoir si une filière me convient ?",
      answer: "Pour déterminer si une filière vous convient, analysez votre affinité pour les matières principales enseignées, vos résultats antérieurs dans ces domaines, et votre intérêt pour les débouchés professionnels associés. Effectuez des tests d'orientation, discutez avec des étudiants déjà dans la filière, et si possible, assistez à des cours ou des journées d'information. L'adéquation entre vos aptitudes naturelles, vos centres d'intérêt et les exigences de la filière est essentielle pour votre réussite et épanouissement."
    },
    {
      id: 2,
      question: "Faut-il privilégier une grande école ou une université ?",
      answer: "Le choix entre grande école et université dépend de votre projet personnel et professionnel. Les grandes écoles offrent généralement un encadrement plus personnalisé, un réseau d'anciens élèves actif et une forte reconnaissance par les employeurs dans certains secteurs. Les universités proposent une plus grande diversité de filières, davantage d'autonomie, et souvent des frais moins élevés. Considérez aussi la pédagogie (théorique vs pratique), la sélectivité, et les possibilités de réorientation. L'important est de choisir l'établissement qui correspond le mieux à votre profil et à vos objectifs."
    },
    {
      id: 3,
      question: "Les classements des écoles sont-ils fiables ?",
      answer: "Les classements des écoles fournissent des indicateurs utiles mais doivent être considérés avec précaution. Ils se basent sur des critères variables (recherche, insertion professionnelle, internationalisation) qui peuvent ne pas correspondre à vos priorités personnelles. Certains aspects qualitatifs importants comme l'ambiance, la pédagogie ou l'adéquation avec votre profil n'y figurent pas. Utilisez les classements comme un outil parmi d'autres dans votre recherche, mais complétez cette information par des visites, des échanges avec des étudiants, et une analyse des programmes en fonction de vos objectifs spécifiques."
    },
    {
      id: 4,
      question: "Comment financer mes études supérieures ?",
      answer: "Pour financer vos études, explorez diverses options : bourses sur critères sociaux ou d'excellence, prêts étudiants à taux préférentiels, alternance (contrat apprentissage ou de professionnalisation), jobs étudiants compatibles avec votre emploi du temps universitaire. Renseignez-vous également sur les aides au logement, les résidences universitaires à tarifs modérés, et les avantages fiscaux pour vos parents. Établissez un budget réaliste incluant frais de scolarité, logement, transport, alimentation et loisirs. Anticipez vos démarches car certaines aides nécessitent des dossiers à constituer plusieurs mois à l'avance."
    },
    {
      id: 5,
      question: "Vaut-il mieux choisir une formation généraliste ou spécialisée ?",
      answer: "Le choix entre formation généraliste ou spécialisée dépend de votre projet et du contexte économique. Une formation généraliste (sciences politiques, écoles de commerce, etc.) offre polyvalence et adaptabilité, permettant d'accéder à divers secteurs et de pivoter plus facilement en cas d'évolution du marché du travail. Une formation spécialisée (ingénierie spécifique, médecine, etc.) peut favoriser une insertion professionnelle rapide dans des domaines techniques ou en tension. Considérez votre degré de certitude quant à votre projet professionnel et votre capacité d'adaptation. Une approche équilibrée peut consister à suivre un tronc commun généraliste avant de vous spécialiser progressivement."
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comment choisir son école</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <LinearGradient
            colors={colors.studentGradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <Icon name="school" size={60} color={colors.white} style={styles.heroIcon} />
            <Text style={styles.heroTitle}>Guide pour choisir le bon établissement</Text>
            <Text style={styles.heroSubtitle}>
              7 étapes pour trouver l'établissement qui vous correspond
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.introSection}>
          <Text style={styles.introText}>
            Choisir où poursuivre vos études est une décision importante qui peut influencer votre parcours professionnel et personnel. Ce guide vous accompagne étape par étape pour faire un choix éclairé qui correspond à vos aspirations, aptitudes et objectifs.
          </Text>
        </View>

        <View style={styles.stepsSection}>
          <Text style={styles.sectionTitle}>Les 7 étapes clés</Text>
          
          {steps.map(step => (
            <StepCard
              key={step.id}
              number={step.id}
              title={step.title}
              description={step.description}
              iconName={step.iconName}
              expanded={expandedStep === step.id}
              onPress={() => toggleStep(step.id)}
            />
          ))}
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Questions fréquentes</Text>
          
          {questions.map(question => (
            <QuestionCard
              key={question.id}
              question={question.question}
              answer={question.answer}
              expanded={expandedQuestion === question.id}
              onPress={() => toggleQuestion(question.id)}
            />
          ))}
        </View>

        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>Ressources utiles</Text>
          
          <TouchableOpacity style={styles.resourceCard}>
            <View style={styles.resourceIconContainer}>
              <Icon name="clipboard-text" size={24} color={colors.white} />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Critères de sélection dun établissement</Text>
              <Text style={styles.resourceDescription}>Une liste de critères à prendre en compte</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.resourceCard}
            onPress={() => navigation.navigate('SchoolSelectionCriteria')}
          >
            <View style={styles.resourceIconContainer}>
              <Icon name="format-list-checks" size={24} color={colors.white} />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Grille d'évaluation des établissements</Text>
              <Text style={styles.resourceDescription}>Outil pour comparer objectivement les écoles</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceCard}>
            <View style={styles.resourceIconContainer}>
              <Icon name="lightbulb" size={24} color={colors.white} />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Test d'orientation</Text>
              <Text style={styles.resourceDescription}>Découvrez les filières qui vous correspondent</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.gray400} />
          </TouchableOpacity>
        </View>

        <View style={styles.ctaSection}>
          <LinearGradient
            colors={colors.studentGradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaTitle}>Prêt à explorer les établissements ?</Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => navigation.navigate('AllSchools')}
            >
              <Text style={styles.ctaButtonText}>Voir tous les établissements</Text>
              <Icon name="arrow-right" size={20} color={colors.student} />
            </TouchableOpacity>
          </LinearGradient>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  heroSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  heroGradient: {
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: 'center',
  },
  heroIcon: {
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: fontSize.md,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  introSection: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  introText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  stepsSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  stepCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  expandedCard: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.student,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stepNumber: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  stepTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    flex: 1,
  },
  stepContent: {
    padding: spacing.lg,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  stepIconContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  stepDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  faqSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  questionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  questionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionIcon: {
    marginRight: spacing.sm,
  },
  questionText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    flex: 1,
  },
  answerContainer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  answerText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  resourcesSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.student,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  resourceDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  ctaSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  ctaGradient: {
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 30,
  },
  ctaButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.student,
    marginRight: spacing.sm,
  },
});

export default HowToChooseSchoolScreen; 