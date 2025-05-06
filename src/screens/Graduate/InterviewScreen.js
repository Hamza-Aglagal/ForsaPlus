import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';

const InterviewScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.graduate} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.graduate, '#1E8E7E']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Entretiens</Text>
          <Text style={styles.headerSubtitle}>Préparez vos entretiens d'embauche</Text>
        </View>
      </LinearGradient>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upcoming Interviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Entretiens à venir</Text>
            <TouchableOpacity>
              <Icon name="plus-circle-outline" size={22} color={colors.graduate} />
            </TouchableOpacity>
          </View>
          
          <UpcomingInterviewCard
            company="TechMaroc"
            position="Développeur Full Stack"
            date="22 Mai 2023"
            time="14:00 - 15:00"
            logo="https://randomuser.me/api/portraits/men/1.jpg"
            location="Casablanca, Technopark"
            interviewers={['Ahmed Benali', 'Fatima Zahra']}
            onPrepare={() => {}}
          />
          
          <UpcomingInterviewCard
            company="Digital Solutions"
            position="UI/UX Designer"
            date="28 Mai 2023"
            time="10:30 - 11:30"
            logo="https://randomuser.me/api/portraits/men/6.jpg"
            location="Entretien en ligne"
            interviewers={['Karim Tazi']}
            onPrepare={() => {}}
          />
          
          <TouchableOpacity style={styles.addInterviewButton}>
            <Icon name="plus" size={18} color={colors.graduate} />
            <Text style={styles.addInterviewButtonText}>Ajouter un entretien</Text>
          </TouchableOpacity>
        </View>
        
        {/* Practice Interviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Entraînement</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.practiceCardsContainer}>
            <PracticeInterviewCard
              title="Questions techniques"
              description="Préparez-vous aux questions techniques courantes pour les développeurs"
              numQuestions={25}
              icon="code-braces"
              color="#4A6FFF"
              progress={65}
              onPress={() => {}}
            />
            
            <PracticeInterviewCard
              title="Questions comportementales"
              description="Entraînez-vous à répondre aux questions sur votre expérience et votre comportement"
              numQuestions={20}
              icon="account-group"
              color="#FF7A5A"
              progress={40}
              onPress={() => {}}
            />
            
            <PracticeInterviewCard
              title="Entretien virtuel"
              description="Simulez un entretien vidéo complet et recevez des retours en temps réel sur vos réponses"
              numQuestions={15}
              icon="video"
              color={colors.graduate}
              progress={0}
              onPress={() => navigation.navigate('VirtualInterviewScreen', {
                category: 'technical',
                level: 'intermediate'
              })}
            />
          </View>
        </View>
        
        {/* Interview Tips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Conseils d'entretien</Text>
          </View>
          
          <View style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              <Icon name="lightbulb-on" size={24} color="#FFB400" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Faites des recherches sur l'entreprise</Text>
              <Text style={styles.tipDescription}>
                Connaître la mission, les valeurs et les produits de l'entreprise montre votre intérêt et votre préparation.
              </Text>
            </View>
          </View>
          
          <View style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              <Icon name="star" size={24} color="#FFB400" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Utilisez la méthode STAR</Text>
              <Text style={styles.tipDescription}>
                Pour les questions comportementales, structurez vos réponses avec Situation, Tâche, Action et Résultat.
              </Text>
            </View>
          </View>
          
          <View style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              <Icon name="eye" size={24} color="#FFB400" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Surveillez votre langage corporel</Text>
              <Text style={styles.tipDescription}>
                Maintenez le contact visuel, asseyez-vous droit et évitez de croiser les bras pour projeter de la confiance.
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.viewMoreTipsButton}>
            <Text style={styles.viewMoreTipsText}>Voir plus de conseils</Text>
            <Icon name="arrow-right" size={18} color={colors.graduate} />
          </TouchableOpacity>
        </View>
        
        {/* Interview Resources */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ressources</Text>
          </View>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.resourcesContainer}
          >
            <ResourceCard
              title="Guide des questions techniques"
              image="https://picsum.photos/id/24/300/200"
              onPress={() => {}}
            />
            
            <ResourceCard
              title="Comment négocier son salaire"
              image="https://picsum.photos/id/28/300/200"
              onPress={() => {}}
            />
            
            <ResourceCard
              title="Erreurs à éviter en entretien"
              image="https://picsum.photos/id/29/300/200"
              onPress={() => {}}
            />
          </ScrollView>
        </View>
        
        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const UpcomingInterviewCard = ({ company, position, date, time, logo, location, interviewers, onPrepare }) => {
  return (
    <View style={styles.interviewCard}>
      <View style={styles.interviewCardHeader}>
        <Image source={{ uri: logo }} style={styles.companyLogo} />
        <View style={styles.interviewDetails}>
          <Text style={styles.companyName}>{company}</Text>
          <Text style={styles.positionName}>{position}</Text>
        </View>
      </View>
      
      <View style={styles.interviewInfoContainer}>
        <View style={styles.interviewInfo}>
          <Icon name="calendar" size={16} color={colors.textSecondary} />
          <Text style={styles.interviewInfoText}>{date}</Text>
        </View>
        
        <View style={styles.interviewInfo}>
          <Icon name="clock-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.interviewInfoText}>{time}</Text>
        </View>
        
        <View style={styles.interviewInfo}>
          <Icon name="map-marker" size={16} color={colors.textSecondary} />
          <Text style={styles.interviewInfoText}>{location}</Text>
        </View>
        
        <View style={styles.interviewInfo}>
          <Icon name="account" size={16} color={colors.textSecondary} />
          <Text style={styles.interviewInfoText}>
            {interviewers.length > 1 
              ? `${interviewers[0]} + ${interviewers.length - 1}` 
              : interviewers[0]}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.prepareButton}
        onPress={onPrepare}
      >
        <LinearGradient
          colors={[colors.graduate, '#1E8E7E']}
          style={styles.prepareButtonGradient}
        >
          <Text style={styles.prepareButtonText}>Se préparer</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const PracticeInterviewCard = ({ title, description, numQuestions, icon, color, progress, onPress }) => {
  return (
    <TouchableOpacity style={styles.practiceCard} onPress={onPress}>
      <View style={[styles.practiceIconContainer, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <View style={styles.practiceCardContent}>
        <Text style={styles.practiceCardTitle}>{title}</Text>
        <Text style={styles.practiceCardDescription} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.practiceCardFooter}>
          <Text style={styles.practiceCardQuestions}>{numQuestions} questions</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progress}%`, backgroundColor: color }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ResourceCard = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.resourceCard} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.resourceImage} />
      <Text style={styles.resourceTitle}>{title}</Text>
    </TouchableOpacity>
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
  headerContent: {
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  viewAllText: {
    fontSize: fontSize.sm,
    color: colors.graduate,
    fontWeight: fontWeight.medium,
  },
  interviewCard: {
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
  interviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  interviewDetails: {
    marginLeft: spacing.md,
    flex: 1,
  },
  companyName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  positionName: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  interviewInfoContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
    paddingTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  interviewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  interviewInfoText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  prepareButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  prepareButtonGradient: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  prepareButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    color: colors.white,
  },
  addInterviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  addInterviewButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.graduate,
    marginLeft: 6,
  },
  practiceCardsContainer: {
    flexDirection: 'column',
  },
  practiceCard: {
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
  practiceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  practiceCardContent: {
    flex: 1,
  },
  practiceCardTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  practiceCardDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  practiceCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  practiceCardQuestions: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    width: 60,
    height: 4,
    backgroundColor: colors.gray100,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: fontSize.xs,
    color: colors.textTertiary,
    marginLeft: 8,
  },
  tipCard: {
    flexDirection: 'row',
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
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  viewMoreTipsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  viewMoreTipsText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.graduate,
    marginRight: 4,
  },
  resourcesContainer: {
    paddingVertical: spacing.sm,
    paddingRight: spacing.lg,
  },
  resourceCard: {
    width: 200,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginRight: spacing.md,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  resourceTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    padding: spacing.sm,
  },
});

export default InterviewScreen; 