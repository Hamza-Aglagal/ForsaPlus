import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const KeyDateCard = ({ title, date, description, icon, color, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.keyDateCard, { borderLeftColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.keyDateIconContainer, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <View style={styles.keyDateContent}>
        <Text style={styles.keyDateTitle}>{title}</Text>
        <Text style={styles.keyDateDate}>{date}</Text>
        {description && <Text style={styles.keyDateDescription}>{description}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const KeyDatesScreen = ({ navigation }) => {
  // Example data - in a real app this would come from an API or state management
  const keyDates = [
    {
      id: '1',
      title: 'Date limite d inscription ENCG',
      date: '15 Juillet 2024',
      description: 'Dernière chance pour soumettre votre dossier pour les écoles de commerce.',
      icon: 'calendar-clock',
      color: colors.warning
    },
    {
      id: '2',
      title: 'Concours des grandes écoles',
      date: '20 Juillet 2024',
      description: 'Début des concours pour les écoles d ingénieurs.',
      icon: 'pencil-box-outline',
      color: colors.error
    },
    {
      id: '3',
      title: 'Début des inscriptions universitaires',
      date: '1 Août 2024',
      description: 'Ouverture des inscriptions pour les facultés publiques.',
      icon: 'school',
      color: colors.student
    },
    {
      id: '4',
      title: 'Salon de l étudiant Casablanca',
      date: '15-17 Août 2024',
      description: 'Rencontrez des représentants de plus de 100 écoles et universités.',
      icon: 'account-group',
      color: colors.info
    },
    {
      id: '5',
      title: 'Date limite dossier de bourse',
      date: '30 Août 2024',
      description: 'Dernier délai pour déposer votre dossier de demande de bourse.',
      icon: 'cash-multiple',
      color: colors.success
    },
    {
      id: '6',
      title: 'Résultats d admission CPGE',
      date: '5 Septembre 2024',
      description: 'Publication des résultats d admission pour les classes préparatoires.',
      icon: 'check-circle',
      color: colors.tertiary
    },
    {
      id: '7',
      title: 'Rentrée universitaire',
      date: '15 Septembre 2024',
      description: 'Début des cours dans la plupart des établissements supérieurs.',
      icon: 'book-open-variant',
      color: colors.primary
    }
  ];

  const upcomingKeyDates = keyDates.sort((a, b) => {
    const dateA = new Date(a.date.split(' ').reverse().join('-'));
    const dateB = new Date(b.date.split(' ').reverse().join('-'));
    return dateA - dateB;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dates Clés</Text>
        <View style={{ width: 24 }} />
      </View>

      <LinearGradient
        colors={colors.studentGradient.secondary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGraphic}
      >
        <View style={styles.headerContent}>
          <Icon name="calendar-month" size={32} color={colors.white} />
          <Text style={styles.headerText}>Restez à jour avec les dates importantes</Text>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filterContainer}>
          <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
            <Text style={styles.activeFilterText}>À venir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Tous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Passés</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.datesContainer}>
          {upcomingKeyDates.map(date => (
            <KeyDateCard 
              key={date.id}
              title={date.title}
              date={date.date}
              description={date.description}
              icon={date.icon}
              color={date.color}
              onPress={() => {}}
            />
          ))}
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
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  headerGraphic: {
    marginHorizontal: spacing.lg,
    borderRadius: 24,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  headerContent: {
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
    marginLeft: spacing.md,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  activeFilter: {
    backgroundColor: colors.student + '20',
  },
  filterText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  activeFilterText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    color: colors.student,
  },
  datesContainer: {
    paddingBottom: spacing.lg,
  },
  keyDateCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: spacing.md,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
  },
  keyDateIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  keyDateContent: {
    flex: 1,
    justifyContent: 'center',
  },
  keyDateTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  keyDateDate: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  keyDateDescription: {
    fontSize: fontSize.sm,
    color: colors.textTertiary,
  },
});

export default KeyDatesScreen; 