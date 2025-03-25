import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Animated,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight, lineHeight } from '../../theme/typography';
import LinearGradient from 'react-native-linear-gradient';

// Test questions by category
const QUESTIONS = [
  {
    id: 1,
    category: "interests",
    question: "Qu'est-ce qui vous intéresse le plus dans votre temps libre ?",
    options: [
      { id: "a", text: "Résoudre des problèmes et des énigmes", 
        tags: ["tech", "engineering", "science"] },
      { id: "b", text: "Créer et concevoir des choses", 
        tags: ["design", "arts", "engineering"] },
      { id: "c", text: "Aider et enseigner aux autres", 
        tags: ["education", "health", "social"] },
      { id: "d", text: "Organiser et planifier des activités", 
        tags: ["business", "management", "finance"] },
      { id: "e", text: "Explorer et découvrir de nouvelles choses", 
        tags: ["science", "research", "journalism"] }
    ]
  },
  {
    id: 2,
    category: "skills",
    question: "Quelles compétences pensez-vous avoir naturellement ?",
    options: [
      { id: "a", text: "Compétences analytiques et logiques", 
        tags: ["tech", "science", "finance"] },
      { id: "b", text: "Créativité et imagination", 
        tags: ["arts", "design", "marketing"] },
      { id: "c", text: "Communication et compétences sociales", 
        tags: ["management", "marketing", "education"] },
      { id: "d", text: "Organisation et attention aux détails", 
        tags: ["engineering", "finance", "health"] },
      { id: "e", text: "Leadership et prise de décision", 
        tags: ["business", "management", "entrepreneurship"] }
    ]
  },
  {
    id: 3,
    category: "values",
    question: "Qu'est-ce qui est le plus important pour vous dans votre future carrière ?",
    options: [
      { id: "a", text: "Innovation et créativité", 
        tags: ["tech", "arts", "entrepreneurship"] },
      { id: "b", text: "Aider les autres et faire une différence", 
        tags: ["health", "education", "social"] },
      { id: "c", text: "Stabilité et sécurité d'emploi", 
        tags: ["finance", "public", "education"] },
      { id: "d", text: "Reconnaissance et succès", 
        tags: ["business", "management", "arts"] },
      { id: "e", text: "Équilibre vie professionnelle/vie privée", 
        tags: ["tech", "remote", "freelance"] }
    ]
  },
  {
    id: 4,
    category: "environment",
    question: "Dans quel environnement préférez-vous travailler ?",
    options: [
      { id: "a", text: "Un bureau dynamique avec beaucoup d'interaction", 
        tags: ["business", "management", "marketing"] },
      { id: "b", text: "Un environnement créatif et non conventionnel", 
        tags: ["arts", "design", "tech"] },
      { id: "c", text: "Un cadre structuré avec des règles claires", 
        tags: ["finance", "legal", "public"] },
      { id: "d", text: "À l'extérieur ou en déplacement fréquent", 
        tags: ["travel", "field", "events"] },
      { id: "e", text: "Un environnement calme et concentré", 
        tags: ["research", "tech", "writing"] }
    ]
  },
  {
    id: 5,
    category: "goals",
    question: "Quel est votre objectif professionnel principal ?",
    options: [
      { id: "a", text: "Devenir expert dans mon domaine", 
        tags: ["science", "engineering", "health"] },
      { id: "b", text: "Créer quelque chose de nouveau et d'innovant", 
        tags: ["tech", "entrepreneurship", "arts"] },
      { id: "c", text: "Avoir un impact positif sur la société", 
        tags: ["education", "health", "environment"] },
      { id: "d", text: "Atteindre une position de leadership", 
        tags: ["management", "business", "finance"] },
      { id: "e", text: "Avoir un bon salaire et des avantages", 
        tags: ["finance", "tech", "legal"] }
    ]
  },
  {
    id: 6,
    category: "education",
    question: "Quel type d'éducation ou de formation vous intéresse ?",
    options: [
      { id: "a", text: "Études techniques ou scientifiques", 
        tags: ["tech", "engineering", "science"] },
      { id: "b", text: "Formation en arts ou design", 
        tags: ["arts", "design", "creative"] },
      { id: "c", text: "Études commerciales ou économiques", 
        tags: ["business", "finance", "marketing"] },
      { id: "d", text: "Formation médicale ou santé", 
        tags: ["health", "medicine", "biology"] },
      { id: "e", text: "Apprentissage sur le terrain ou autodidacte", 
        tags: ["trades", "entrepreneurship", "creative"] }
    ]
  },
  {
    id: 7,
    category: "learning",
    question: "Comment préférez-vous apprendre de nouvelles choses ?",
    options: [
      { id: "a", text: "En lisant et recherchant par moi-même", 
        tags: ["research", "tech", "science"] },
      { id: "b", text: "En observant et en imitant les autres", 
        tags: ["arts", "design", "trades"] },
      { id: "c", text: "En participant à des discussions de groupe", 
        tags: ["education", "business", "social"] },
      { id: "d", text: "En expérimentant et par essai-erreur", 
        tags: ["engineering", "entrepreneurship", "creative"] },
      { id: "e", text: "En suivant des cours structurés", 
        tags: ["finance", "medicine", "legal"] }
    ]
  },
  {
    id: 8,
    category: "personality",
    question: "Comment vous décririez-vous le mieux ?",
    options: [
      { id: "a", text: "Analytique et méthodique", 
        tags: ["tech", "science", "finance"] },
      { id: "b", text: "Créatif et innovant", 
        tags: ["arts", "design", "entrepreneurship"] },
      { id: "c", text: "Social et extraverti", 
        tags: ["marketing", "education", "management"] },
      { id: "d", text: "Organisé et fiable", 
        tags: ["engineering", "health", "legal"] },
      { id: "e", text: "Adaptable et flexible", 
        tags: ["freelance", "travel", "events"] }
    ]
  },
  {
    id: 9,
    category: "challenges",
    question: "Quel type de défi vous motive le plus ?",
    options: [
      { id: "a", text: "Résoudre des problèmes techniques complexes", 
        tags: ["tech", "engineering", "science"] },
      { id: "b", text: "Exprimer des idées créatives", 
        tags: ["arts", "design", "marketing"] },
      { id: "c", text: "Aider les autres à surmonter leurs difficultés", 
        tags: ["education", "health", "social"] },
      { id: "d", text: "Développer des stratégies pour atteindre des objectifs", 
        tags: ["business", "management", "finance"] },
      { id: "e", text: "Explorer des territoires inconnus", 
        tags: ["research", "travel", "journalism"] }
    ]
  },
  {
    id: 10,
    category: "teamwork",
    question: "Comment préférez-vous travailler sur des projets ?",
    options: [
      { id: "a", text: "Indépendamment, avec une autonomie totale", 
        tags: ["research", "writing", "tech"] },
      { id: "b", text: "En petite équipe collaborative", 
        tags: ["design", "engineering", "marketing"] },
      { id: "c", text: "En dirigeant une équipe", 
        tags: ["management", "business", "education"] },
      { id: "d", text: "En soutien à d'autres personnes", 
        tags: ["health", "assistant", "support"] },
      { id: "e", text: "En alternant entre travail solo et collaboration", 
        tags: ["freelance", "consulting", "entrepreneurship"] }
    ]
  }
];

const OrientationQuestionsScreen = ({ navigation, route }) => {
  const currentStep = route.params?.step || 1;
  const userAnswers = route.params?.answers || [];
  const progressValue = new Animated.Value((currentStep - 1) / QUESTIONS.length);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const currentQuestion = QUESTIONS[currentStep - 1];

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progressValue, {
      toValue: currentStep / QUESTIONS.length,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Reset selection when moving to a new question
    setSelectedOption(null);
  }, [currentStep]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [...userAnswers, selectedOption];
    
    if (currentStep < QUESTIONS.length) {
      // Move to next question and reset selection
      setSelectedOption(null);
      navigation.navigate("OrientationQuestions", {
        step: currentStep + 1,
        answers: newAnswers
      });
    } else {
      // Complete test and navigate to results
      navigation.navigate("OrientationResults", { answers: newAnswers });
    }
  };

  const renderProgressBar = () => {
    const width = progressValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBarFill, { width }]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.universityStudent}
      />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.universityStudent, '#4776E6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Test d'Orientation</Text>
          <Text style={styles.headerProgress}>Question {currentStep}/{QUESTIONS.length}</Text>
        </View>
      </LinearGradient>
      
      {renderProgressBar()}
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
          <Text style={styles.questionCategory}>
            {currentQuestion.category.toUpperCase()} - QUESTION {currentStep}/{QUESTIONS.length}
          </Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  selectedOption?.id === option.id && styles.optionButtonSelected
                ]}
                onPress={() => handleOptionSelect(option)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.optionIndicator,
                    selectedOption?.id === option.id && styles.optionIndicatorSelected
                  ]}>
                    {selectedOption?.id === option.id && (
                      <Icon name="check" size={16} color="#fff" />
                    )}
                  </View>
                  <Text style={[
                    styles.optionText,
                    selectedOption?.id === option.id && styles.optionTextSelected
                  ]}>
                    {option.text}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !selectedOption && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!selectedOption}
        >
          <Text style={styles.nextButtonText}>
            {currentStep < QUESTIONS.length ? "Suivant" : "Voir les résultats"}
          </Text>
          <Icon name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  headerProgress: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(30, 136, 229, 0.2)',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.universityStudent,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 40,
  },
  questionContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
  questionCategory: {
    fontSize: fontSize.xs,
    color: colors.universityStudent,
    fontWeight: fontWeight.bold,
    marginBottom: 8,
    letterSpacing: 1,
  },
  questionText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 20,
    lineHeight: lineHeight.xl,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(30, 136, 229, 0.05)',
    borderColor: colors.universityStudent,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray300,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIndicatorSelected: {
    backgroundColor: colors.universityStudent,
    borderColor: colors.universityStudent,
  },
  optionText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    lineHeight: lineHeight.md,
  },
  optionTextSelected: {
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  footer: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  nextButton: {
    backgroundColor: colors.universityStudent,
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: colors.gray300,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginRight: 8,
  },
});

export default OrientationQuestionsScreen; 