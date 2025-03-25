import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ProgressBar,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const OrientationTestScreen = ({ navigation }) => {
  const [testState, setTestState] = useState('intro'); // 'intro', 'questions', 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const questions = [
    {
      id: 1,
      question: "Aimez-vous travailler avec des chiffres ?",
      options: ["Pas du tout", "Un peu", "Moyennement", "Beaucoup", "Énormément"]
    },
    {
      id: 2,
      question: "Préférez-vous créer des choses ou analyser des données ?",
      options: ["Créer uniquement", "Plutôt créer", "Les deux également", "Plutôt analyser", "Analyser uniquement"]
    },
    {
      id: 3,
      question: "Vous sentez-vous à l'aise pour parler en public ?",
      options: ["Pas du tout", "Un peu", "Moyennement", "Beaucoup", "Énormément"]
    },
    {
      id: 4,
      question: "Aimez-vous travailler en équipe ?",
      options: ["Pas du tout", "Un peu", "Moyennement", "Beaucoup", "Énormément"]
    },
    {
      id: 5,
      question: "Êtes-vous intéressé(e) par la résolution de problèmes techniques ?",
      options: ["Pas du tout", "Un peu", "Moyennement", "Beaucoup", "Énormément"]
    },
    {
      id: 6,
      question: "Aimez-vous lire et écrire ?",
      options: ["Pas du tout", "Un peu", "Moyennement", "Beaucoup", "Énormément"]
    },
    {
      id: 7,
      question: "Êtes-vous attiré(e) par les sciences de la vie (biologie, médecine...) ?",
      options: ["Pas du tout", "Un peu", "Moyennement", "Beaucoup", "Énormément"]
    },
    {
      id: 8,
      question: "Avez-vous des compétences artistiques ou créatives ?",
      options: ["Pas du tout", "Un peu", "Moyennement", "Beaucoup", "Énormément"]
    },
    {
      id: 9,
      question: "Êtes-vous intéressé(e) par l'entrepreneuriat ?",
      options: ["Pas du tout", "Un peu", "Moyennement", "Beaucoup", "Énormément"]
    },
    {
      id: 10,
      question: "Préférez-vous un travail pratique ou théorique ?",
      options: ["Très pratique", "Plutôt pratique", "Équilibré", "Plutôt théorique", "Très théorique"]
    }
  ];

  const startTest = () => {
    setTestState('questions');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const answerQuestion = (questionId, optionIndex) => {
    const newAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (testAnswers) => {
    // Simple algorithm for demonstration
    const scores = {
      sciences: 0,
      engineering: 0,
      business: 0,
      arts: 0,
      healthcare: 0,
      communication: 0
    };

    // Example scoring logic (simplified for demonstration)
    if (testAnswers[1] >= 3) scores.sciences += 2; // Likes numbers
    if (testAnswers[2] <= 2) scores.arts += 2; // Prefers creating
    if (testAnswers[2] >= 4) scores.sciences += 2; // Prefers analyzing
    if (testAnswers[3] >= 3) scores.communication += 2; // Public speaking
    if (testAnswers[4] >= 3) scores.business += 1; // Teamwork
    if (testAnswers[5] >= 3) scores.engineering += 2; // Technical problem-solving
    if (testAnswers[6] >= 3) scores.communication += 1; // Reading/writing
    if (testAnswers[7] >= 3) scores.healthcare += 3; // Life sciences
    if (testAnswers[8] >= 3) scores.arts += 3; // Artistic
    if (testAnswers[9] >= 3) scores.business += 3; // Entrepreneurship
    if (testAnswers[10] <= 2) scores.engineering += 1; // Practical work
    
    // Find top interests
    const sortedInterests = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .filter(item => item[1] > 0)
      .map(item => item[0]);
    
    // Map interests to suggestions
    const suggestions = {
      sciences: ["Faculté des Sciences", "Mathématiques", "Physique", "Informatique"],
      engineering: ["École d'Ingénieurs", "Génie Civil", "Génie Informatique", "Mécanique"],
      business: ["École de Commerce", "Management", "Finance", "Marketing"],
      arts: ["École d'Art et Design", "Architecture", "Design Graphique", "Audiovisuel"],
      healthcare: ["Faculté de Médecine", "Pharmacie", "Sciences Infirmières", "Kinésithérapie"],
      communication: ["Faculté des Lettres", "Journalisme", "Relations Publiques", "Traduction"]
    };

    // Prepare result
    const resultData = {
      topInterests: sortedInterests.slice(0, 3),
      suggestions: sortedInterests.slice(0, 3).flatMap(interest => suggestions[interest] || [])
    };

    setResults(resultData);
    setTestState('results');
  };

  const resetTest = () => {
    setTestState('intro');
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  const renderIntro = () => (
    <View style={styles.introContainer}>
      <LinearGradient
        colors={colors.studentGradient.purple}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.introIconContainer}
      >
        <Icon name="brain" size={50} color={colors.white} />
      </LinearGradient>
      
      <Text style={styles.introTitle}>Test d'Orientation</Text>
      
      <Text style={styles.introText}>
        Ce test vous aide à découvrir ce qui vous intéresse vraiment et vous 
        suggère des filières détudes qui correspondent à votre profil.
      </Text>
      
      <View style={styles.introBullets}>
        <View style={styles.introBulletItem}>
          <Icon name="check-circle" size={20} color={colors.student} />
          <Text style={styles.introBulletText}>10 questions rapides</Text>
        </View>
        <View style={styles.introBulletItem}>
          <Icon name="check-circle" size={20} color={colors.student} />
          <Text style={styles.introBulletText}>Découvrez vos intérêts dominants</Text>
        </View>
        <View style={styles.introBulletItem}>
          <Icon name="check-circle" size={20} color={colors.student} />
          <Text style={styles.introBulletText}>Obtenez des suggestions de filières</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.startButton}
        onPress={startTest}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={colors.studentGradient.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.startButtonGradient}
        >
          <Text style={styles.startButtonText}>Commencer le Test</Text>
          <Icon name="arrow-right" size={20} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderQuestions = () => {
    const question = questions[currentQuestion];
    const progress = (currentQuestion + 1) / questions.length;
    
    return (
      <View style={styles.questionsContainer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} sur {questions.length}
          </Text>
        </View>
        
        <Text style={styles.questionText}>{question.question}</Text>
        
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                answers[question.id] === index ? styles.optionButtonSelected : null
              ]}
              onPress={() => answerQuestion(question.id, index)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.optionText,
                answers[question.id] === index ? styles.optionTextSelected : null
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.navigationButtons}>
          {currentQuestion > 0 && (
            <TouchableOpacity
              style={styles.prevButton}
              onPress={() => setCurrentQuestion(currentQuestion - 1)}
            >
              <Icon name="arrow-left" size={20} color={colors.student} />
              <Text style={styles.prevButtonText}>Précédent</Text>
            </TouchableOpacity>
          )}
          
          <View style={{ flex: 1 }} />
          
          {currentQuestion === questions.length - 1 && answers[question.id] !== undefined && (
            <TouchableOpacity
              style={styles.finishButton}
              onPress={() => calculateResults(answers)}
            >
              <Text style={styles.finishButtonText}>Terminer</Text>
              <Icon name="check-circle" size={20} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderResults = () => {
    if (!results) return null;
    
    // Map interest codes to readable names
    const interestNames = {
      sciences: "Sciences & Mathématiques",
      engineering: "Ingénierie & Technologie",
      business: "Commerce & Management",
      arts: "Arts & Design",
      healthcare: "Santé & Médecine",
      communication: "Communication & Langues"
    };
    
    return (
      <View style={styles.resultsContainer}>
        <LinearGradient
          colors={colors.studentGradient.blue}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.resultsHeader}
        >
          <Icon name="check-circle" size={50} color={colors.white} style={styles.resultsIcon} />
          <Text style={styles.resultsTitle}>Résultats</Text>
          <Text style={styles.resultsSubtitle}>
            Voici ce que votre profil révèle sur vos intérêts
          </Text>
        </LinearGradient>
        
        <View style={styles.resultsContent}>
          <Text style={styles.sectionTitle}>Vos intérêts principaux</Text>
          
          {results.topInterests.map((interest, index) => (
            <View key={index} style={styles.interestItem}>
              <View style={[styles.interestIconContainer, { backgroundColor: getInterestColor(interest) }]}>
                <Icon name={getInterestIcon(interest)} size={24} color={colors.white} />
              </View>
              <View style={styles.interestTextContainer}>
                <Text style={styles.interestName}>{interestNames[interest]}</Text>
                <Text style={styles.interestDescription}>{getInterestDescription(interest)}</Text>
              </View>
            </View>
          ))}
          
          <Text style={styles.sectionTitle}>Filières suggérées</Text>
          
          <View style={styles.suggestionsContainer}>
            {results.suggestions.slice(0, 6).map((suggestion, index) => (
              <View key={index} style={styles.suggestionItem}>
                <Icon name="school-outline" size={16} color={colors.student} />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.resultsButtons}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                // Logic to save results would go here
                navigation.goBack();
              }}
            >
              <LinearGradient
                colors={colors.studentGradient.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.saveButtonGradient}
              >
                <Text style={styles.saveButtonText}>Sauvegarder et fermer</Text>
                <Icon name="content-save" size={20} color={colors.white} />
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={resetTest}
            >
              <Text style={styles.retakeButtonText}>Refaire le test</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Helper functions for results
  const getInterestColor = (interest) => {
    const interestColors = {
      sciences: colors.info,
      engineering: colors.student,
      business: colors.tertiary,
      arts: colors.warning,
      healthcare: colors.success,
      communication: colors.primary
    };
    return interestColors[interest] || colors.student;
  };

  const getInterestIcon = (interest) => {
    const interestIcons = {
      sciences: "atom",
      engineering: "calculator-variant",
      business: "chart-line",
      arts: "palette",
      healthcare: "medical-bag",
      communication: "message-text"
    };
    return interestIcons[interest] || "star";
  };

  const getInterestDescription = (interest) => {
    const descriptions = {
      sciences: "Vous aimez comprendre comment les choses fonctionnent et résoudre des problèmes abstraits.",
      engineering: "Vous êtes attiré(e) par la technologie et la résolution de problèmes concrets.",
      business: "Vous appréciez le leadership et avez un esprit entrepreneurial.",
      arts: "Vous avez un esprit créatif et aimez exprimer vos idées visuellement.",
      healthcare: "Vous êtes intéressé(e) par le bien-être des autres et les sciences biologiques.",
      communication: "Vous excellez dans les langues et l'expression d'idées complexes."
    };
    return descriptions[interest] || "";
  };

  // Main render
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            if (testState === 'questions' && currentQuestion > 0) {
              setCurrentQuestion(currentQuestion - 1);
            } else if (testState === 'questions' || testState === 'results') {
              // Show confirmation dialog before exiting
              resetTest();
              navigation.goBack();
            } else {
              navigation.goBack();
            }
          }}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test d'Orientation</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {testState === 'intro' && renderIntro()}
        {testState === 'questions' && renderQuestions()}
        {testState === 'results' && renderResults()}
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
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  
  // Intro section styles
  introContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  introIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  introTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  introText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  introBullets: {
    alignSelf: 'stretch',
    marginBottom: spacing.xl,
  },
  introBulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  introBulletText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  startButton: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  startButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
    marginRight: spacing.sm,
  },
  
  // Questions section styles
  questionsContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  progressContainer: {
    marginBottom: spacing.lg,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    marginBottom: spacing.xs,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.student,
    borderRadius: 4,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  questionText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
  },
  optionsContainer: {
    marginBottom: spacing.xl,
  },
  optionButton: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray300,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionButtonSelected: {
    backgroundColor: colors.student + '15',
    borderColor: colors.student,
  },
  optionText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: colors.student,
    fontWeight: fontWeight.semiBold,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  prevButtonText: {
    fontSize: fontSize.md,
    color: colors.student,
    marginLeft: spacing.xs,
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.student,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  finishButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
    marginRight: spacing.xs,
  },
  
  // Results section styles
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    padding: spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  resultsIcon: {
    marginBottom: spacing.md,
  },
  resultsTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  resultsSubtitle: {
    fontSize: fontSize.md,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  resultsContent: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  interestItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 15,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  interestIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  interestTextContainer: {
    flex: 1,
  },
  interestName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  interestDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    margin: spacing.xs,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  suggestionText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  resultsButtons: {
    marginTop: spacing.xl,
  },
  saveButton: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: spacing.md,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  saveButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
    marginRight: spacing.sm,
  },
  retakeButton: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  retakeButtonText: {
    fontSize: fontSize.md,
    color: colors.student,
  },
});

export default OrientationTestScreen; 