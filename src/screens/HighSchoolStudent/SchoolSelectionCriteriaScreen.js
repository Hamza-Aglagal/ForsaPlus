import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const CriteriaCategory = ({ title, description, iconName, criteria, expanded, onToggleExpand, onToggleCriterion }) => {
  return (
    <View style={styles.categoryCard}>
      <TouchableOpacity 
        style={styles.categoryHeader}
        onPress={onToggleExpand}
        activeOpacity={0.8}
      >
        <View style={styles.categoryIconContainer}>
          <Icon name={iconName} size={24} color={colors.white} />
        </View>
        <View style={styles.categoryTitleContainer}>
          <Text style={styles.categoryTitle}>{title}</Text>
          <Icon 
            name={expanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color={colors.textPrimary} 
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.categoryContent}>
          <Text style={styles.categoryDescription}>{description}</Text>
          
          <View style={styles.criteriaList}>
            {criteria.map((criterion) => (
              <View key={criterion.id} style={styles.criterionItem}>
                <View style={styles.criterionInfo}>
                  <Text style={styles.criterionTitle}>{criterion.title}</Text>
                  {criterion.subtitle && (
                    <Text style={styles.criterionSubtitle}>{criterion.subtitle}</Text>
                  )}
                </View>
                <Switch
                  value={criterion.selected}
                  onValueChange={() => onToggleCriterion(criterion.id)}
                  trackColor={{ false: colors.gray300, true: colors.student + '70' }}
                  thumbColor={criterion.selected ? colors.student : colors.gray100}
                />
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const SchoolSelectionCriteriaScreen = ({ navigation }) => {
  // State to track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState(['academic']);

  // State for criteria selection
  const [criteriaState, setCriteriaState] = useState({
    academic: [
      { id: 'a1', title: 'Programmes et filières proposés', subtitle: 'Les programmes correspondent-ils à vos intérêts ?', selected: false },
      { id: 'a2', title: 'Qualité académique', subtitle: 'Réputation, accréditations, classements', selected: false },
      { id: 'a3', title: 'Taux de réussite aux examens', subtitle: null, selected: false },
      { id: 'a4', title: 'Qualité du corps enseignant', subtitle: 'Expertise, expérience professionnelle, disponibilité', selected: false },
      { id: 'a5', title: 'Taille des classes', subtitle: 'Ratio enseignants/étudiants', selected: false },
      { id: 'a6', title: 'Méthodes pédagogiques', subtitle: 'Cours magistraux, TD, projets, stages', selected: false },
      { id: 'a7', title: 'Spécialisation et options disponibles', subtitle: null, selected: false },
    ],
    career: [
      { id: 'c1', title: 'Taux d insertion professionnelle', subtitle: null, selected: false },
      { id: 'c2', title: 'Réseaux professionnels et partenariats', subtitle: 'Liens avec les entreprises', selected: false },
      { id: 'c3', title: 'Stage et alternance', subtitle: 'Opportunités et accompagnement', selected: false },
      { id: 'c4', title: 'Salaire moyen des diplômés', subtitle: null, selected: false },
      { id: 'c5', title: 'Service carrière et aide à l emploi', subtitle: null, selected: false },
      { id: 'c6', title: 'Réseau des anciens élèves', subtitle: 'Alumni et leur accessibilité', selected: false },
    ],
    infrastructure: [
      { id: 'i1', title: 'Qualité des installations', subtitle: 'Salles de cours, laboratoires, bibliothèques', selected: false },
      { id: 'i2', title: 'Outils technologiques et numériques', subtitle: null, selected: false },
      { id: 'i3', title: 'Accessibilité des locaux', subtitle: 'PMR, transports en commun', selected: false },
      { id: 'i4', title: 'Espaces de vie étudiante', subtitle: 'Cafétéria, espaces détente, espaces de travail', selected: false },
      { id: 'i5', title: 'Infrastructures sportives', subtitle: null, selected: false },
    ],
    life: [
      { id: 'l1', title: 'Vie associative et clubs', subtitle: null, selected: false },
      { id: 'l2', title: 'Ambiance générale du campus', subtitle: null, selected: false },
      { id: 'l3', title: 'Diversité étudiante', subtitle: null, selected: false },
      { id: 'l4', title: 'Logement étudiant', subtitle: 'Résidences, coût, disponibilité', selected: false },
      { id: 'l5', title: 'Lieux culturels à proximité', subtitle: null, selected: false },
      { id: 'l6', title: 'Sécurité du campus et de ses environs', subtitle: null, selected: false },
    ],
    international: [
      { id: 'int1', title: 'Programmes d échange à l étranger', subtitle: null, selected: false },
      { id: 'int2', title: 'Partenariats internationaux', subtitle: null, selected: false },
      { id: 'int3', title: 'Cours en langues étrangères', subtitle: null, selected: false },
      { id: 'int4', title: 'Diversité internationale des étudiants', subtitle: null, selected: false },
      { id: 'int5', title: 'Reconnaissance du diplôme à l international', subtitle: null, selected: false },
    ],
    practical: [
      { id: 'p1', title: 'Frais de scolarité', subtitle: null, selected: false },
      { id: 'p2', title: 'Bourses et aides financières', subtitle: 'Disponibilité et conditions', selected: false },
      { id: 'p3', title: 'Coût de la vie dans la ville', subtitle: null, selected: false },
      { id: 'p4', title: 'Durée du programme', subtitle: null, selected: false },
      { id: 'p5', title: 'Modalités d admission', subtitle: 'Concours, dossier, entretien', selected: false },
      { id: 'p6', title: 'Possibilités de travail à temps partiel', subtitle: null, selected: false },
    ]
  });

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const toggleCriterion = (criterionId) => {
    setCriteriaState(prev => {
      const newState = { ...prev };
      
      // Find the category that contains this criterion
      for (const category in newState) {
        const criterionIndex = newState[category].findIndex(item => item.id === criterionId);
        if (criterionIndex !== -1) {
          // Toggle the selected state
          newState[category][criterionIndex].selected = !newState[category][criterionIndex].selected;
          break;
        }
      }
      
      return newState;
    });
  };

  const getSelectedCriteriaCount = () => {
    let count = 0;
    for (const category in criteriaState) {
      criteriaState[category].forEach(criterion => {
        if (criterion.selected) count++;
      });
    }
    return count;
  };

  const getTotalCriteriaCount = () => {
    let count = 0;
    for (const category in criteriaState) {
      count += criteriaState[category].length;
    }
    return count;
  };

  const resetAllCriteria = () => {
    setCriteriaState(prev => {
      const newState = { ...prev };
      for (const category in newState) {
        newState[category] = newState[category].map(criterion => ({
          ...criterion,
          selected: false
        }));
      }
      return newState;
    });
  };

  const selectAllCriteria = () => {
    setCriteriaState(prev => {
      const newState = { ...prev };
      for (const category in newState) {
        newState[category] = newState[category].map(criterion => ({
          ...criterion,
          selected: true
        }));
      }
      return newState;
    });
  };

  const selectedCount = getSelectedCriteriaCount();
  const totalCount = getTotalCriteriaCount();

  const categories = [
    { 
      id: 'academic', 
      title: 'Académique', 
      iconName: 'book-open-variant',
      description: 'Critères liés à la qualité de l enseignement, aux programmes proposés et aux méthodes pédagogiques.'
    },
    { 
      id: 'career', 
      title: 'Débouchés professionnels', 
      iconName: 'briefcase',
      description: 'Éléments concernant l insertion professionnelle, les stages et les opportunités de carrière.'
    },
    { 
      id: 'infrastructure', 
      title: 'Infrastructures', 
      iconName: 'domain',
      description: 'Qualité des installations, équipements et ressources disponibles sur le campus.'
    },
    { 
      id: 'life', 
      title: 'Vie étudiante', 
      iconName: 'account-group',
      description: 'Aspects liés à l environnement social, aux activités extra-scolaires et à la qualité de vie.'
    },
    { 
      id: 'international', 
      title: 'Dimension internationale', 
      iconName: 'earth',
      description: 'Opportunités d échanges internationaux et exposition à un environnement multiculturel.'
    },
    { 
      id: 'practical', 
      title: 'Aspects pratiques', 
      iconName: 'cog',
      description: 'Considérations financières, logistiques et administratives.'
    }
  ];

  const exportCriteria = () => {
    // In a real app, this would generate a PDF or allow sharing
    // For now, just show a success message
    alert('Vos critères de sélection ont été exportés');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Critères de sélection</Text>
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
            <Text style={styles.heroTitle}>Évaluez les établissements selon vos critères</Text>
            <Text style={styles.heroSubtitle}>
              Sélectionnez les critères qui comptent pour vous
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressTracker}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressCount}>{selectedCount}/{totalCount}</Text>
              <Text style={styles.progressLabel}>critères sélectionnés</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${(selectedCount / totalCount) * 100}%` }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={resetAllCriteria}
            >
              <Text style={styles.resetButtonText}>Tout réinitialiser</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.selectAllButton}
              onPress={selectAllCriteria}
            >
              <Text style={styles.selectAllButtonText}>Tout sélectionner</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.criteriaSection}>
          <Text style={styles.sectionDescription}>
            Sélectionnez les critères importants pour vous afin de comparer les établissements de manière objective.
          </Text>
          
          {categories.map(category => (
            <CriteriaCategory
              key={category.id}
              title={category.title}
              description={category.description}
              iconName={category.iconName}
              criteria={criteriaState[category.id]}
              expanded={expandedCategories.includes(category.id)}
              onToggleExpand={() => toggleCategory(category.id)}
              onToggleCriterion={toggleCriterion}
            />
          ))}
        </View>

        <View style={styles.exportSection}>
          <Text style={styles.exportTitle}>Prêt à comparer des établissements ?</Text>
          <Text style={styles.exportDescription}>
            Vous pouvez exporter ces critères pour évaluer chaque établissement que vous visitez.
          </Text>
          
          <TouchableOpacity 
            style={styles.exportButton}
            onPress={exportCriteria}
          >
            <LinearGradient
              colors={colors.studentGradient.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.exportButtonGradient}
            >
              <Text style={styles.exportButtonText}>Exporter ma liste de critères</Text>
              <Icon name="download" size={20} color={colors.white} />
            </LinearGradient>
          </TouchableOpacity>
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
  },
  heroTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: fontSize.md,
    color: colors.white,
    opacity: 0.9,
  },
  progressSection: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressTracker: {
    marginBottom: spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  progressCount: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginRight: spacing.xs,
  },
  progressLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.student,
    borderRadius: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.student,
    backgroundColor: colors.white,
  },
  resetButtonText: {
    fontSize: fontSize.sm,
    color: colors.student,
    fontWeight: fontWeight.medium,
  },
  selectAllButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.student,
  },
  selectAllButtonText: {
    fontSize: fontSize.sm,
    color: colors.white,
    fontWeight: fontWeight.medium,
  },
  criteriaSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  sectionDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  categoryCard: {
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
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  categoryIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.student,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
  },
  categoryContent: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  categoryDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  criteriaList: {},
  criterionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  criterionInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  criterionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  criterionSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  exportSection: {
    margin: spacing.lg,
    marginTop: 0,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  exportTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  exportDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  exportButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  exportButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  exportButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
    marginRight: spacing.sm,
  },
});

export default SchoolSelectionCriteriaScreen; 