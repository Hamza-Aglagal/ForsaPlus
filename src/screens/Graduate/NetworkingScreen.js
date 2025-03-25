import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';

// Mock data for professionals
const professionalsData = [
  {
    id: '1',
    name: 'Ahmed Benali',
    position: 'Développeur Senior',
    company: 'TechMaroc',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    mutual: 3,
    isConnected: false,
  },
  {
    id: '2',
    name: 'Fatima Zahra',
    position: 'Chef de Projet IT',
    company: 'Consulting Group',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    mutual: 5,
    isConnected: true,
  },
  {
    id: '3',
    name: 'Karim Tazi',
    position: 'DevOps Engineer',
    company: 'CloudTech',
    avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
    mutual: 2,
    isConnected: false,
  },
  {
    id: '4',
    name: 'Sophia Amrani',
    position: 'Product Manager',
    company: 'Digital Solutions',
    avatar: 'https://randomuser.me/api/portraits/women/59.jpg',
    mutual: 7,
    isConnected: true,
  },
  {
    id: '5',
    name: 'Youssef Hajji',
    position: 'Data Scientist',
    company: 'DataPro',
    avatar: 'https://randomuser.me/api/portraits/men/83.jpg',
    mutual: 1,
    isConnected: false,
  },
];

// Mock data for networking events
const eventsData = [
  {
    id: '1',
    title: 'Forum Emploi Tech',
    date: '15 Mai 2023',
    time: '09:00 - 17:00',
    location: 'Technopark Casablanca',
    image: 'https://picsum.photos/id/26/400/200',
    attendees: 128,
    isRegistered: true,
  },
  {
    id: '2',
    title: 'Workshop LinkedIn et Personal Branding',
    date: '22 Mai 2023',
    time: '14:00 - 16:30',
    location: 'En ligne',
    image: 'https://picsum.photos/id/25/400/200',
    attendees: 85,
    isRegistered: false,
  },
  {
    id: '3',
    title: 'Networking Afterwork IT',
    date: '5 Juin 2023',
    time: '18:30 - 21:00',
    location: 'Café Business, Casablanca',
    image: 'https://picsum.photos/id/24/400/200',
    attendees: 42,
    isRegistered: false,
  },
];

// Professional Card Component
const ProfessionalCard = ({ professional, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate API call
    setTimeout(() => {
      onConnect(professional.id);
      setIsConnecting(false);
    }, 1000);
  };
  
  return (
    <View style={styles.professionalCard}>
      <Image source={{ uri: professional.avatar }} style={styles.avatar} />
      
      <View style={styles.professionalInfo}>
        <Text style={styles.professionalName}>{professional.name}</Text>
        <Text style={styles.professionalPosition}>{professional.position}</Text>
        <Text style={styles.professionalCompany}>{professional.company}</Text>
        
        {professional.mutual > 0 && (
          <View style={styles.mutualContainer}>
            <Icon name="account-group" size={12} color={colors.textSecondary} />
            <Text style={styles.mutualText}>
              {professional.mutual} {professional.mutual === 1 ? 'relation' : 'relations'} en commun
            </Text>
          </View>
        )}
      </View>
      
      <TouchableOpacity 
        style={[
          styles.connectButton, 
          professional.isConnected && styles.connectedButton
        ]}
        onPress={handleConnect}
        disabled={professional.isConnected || isConnecting}
      >
        {isConnecting ? (
          <Text style={styles.connectButtonText}>...</Text>
        ) : (
          <Text style={styles.connectButtonText}>
            {professional.isConnected ? 'Connecté' : 'Connecter'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// Event Card Component
const EventCard = ({ event, onRegister }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  
  const handleRegister = () => {
    setIsRegistering(true);
    // Simulate API call
    setTimeout(() => {
      onRegister(event.id);
      setIsRegistering(false);
    }, 1000);
  };
  
  return (
    <View style={styles.eventCard}>
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        
        <View style={styles.eventDetail}>
          <Icon name="calendar" size={14} color={colors.textSecondary} />
          <Text style={styles.eventDetailText}>{event.date}</Text>
        </View>
        
        <View style={styles.eventDetail}>
          <Icon name="clock-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.eventDetailText}>{event.time}</Text>
        </View>
        
        <View style={styles.eventDetail}>
          <Icon name="map-marker" size={14} color={colors.textSecondary} />
          <Text style={styles.eventDetailText}>{event.location}</Text>
        </View>
        
        <View style={styles.eventFooter}>
          <View style={styles.attendeesContainer}>
            <Icon name="account-group" size={14} color={colors.textSecondary} />
            <Text style={styles.attendeesText}>{event.attendees} participants</Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.registerButton, 
              event.isRegistered && styles.registeredButton
            ]}
            onPress={handleRegister}
            disabled={event.isRegistered || isRegistering}
          >
            {isRegistering ? (
              <Text style={styles.registerButtonText}>...</Text>
            ) : (
              <Text style={styles.registerButtonText}>
                {event.isRegistered ? 'Inscrit' : "S'inscrire"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const NetworkingScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfessionals, setShowProfessionals] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  
  const [professionals, setProfessionals] = useState(professionalsData);
  const [events, setEvents] = useState(eventsData);
  
  const handleConnect = (id) => {
    setProfessionals(
      professionals.map(prof => 
        prof.id === id ? { ...prof, isConnected: true } : prof
      )
    );
  };
  
  const handleRegisterEvent = (id) => {
    setEvents(
      events.map(event => 
        event.id === id ? { ...event, isRegistered: true } : event
      )
    );
  };
  
  const filteredProfessionals = professionals.filter(prof => 
    searchQuery === '' || 
    prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredEvents = events.filter(event => 
    searchQuery === '' || 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleProfessionals = () => {
    setShowProfessionals(!showProfessionals);
  };
  
  const toggleEvents = () => {
    setShowEvents(!showEvents);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.graduate} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.graduate, '#1E8E7E']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Networking</Text>
          <Text style={styles.headerSubtitle}>Développez votre réseau professionnel</Text>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="magnify" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher des professionnels ou des événements"
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </LinearGradient>
      
      <ScrollView style={styles.content}>
        {/* Network Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Relations</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Invitations</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Événements</Text>
          </View>
        </View>
        
        {/* Build Network Banner */}
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={[colors.graduate, '#1E8E7E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Développez votre réseau professionnel</Text>
              <Text style={styles.bannerDescription}>
                Connectez-vous avec des professionnels de votre secteur pour découvrir des opportunités
              </Text>
            </View>
            <View style={styles.bannerIcon}>
              <Icon name="account-network" size={40} color="rgba(255, 255, 255, 0.8)" />
            </View>
          </LinearGradient>
        </View>
        
        {/* Professionals Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Professionnels recommandés</Text>
          
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map(professional => (
              <ProfessionalCard 
                key={professional.id} 
                professional={professional} 
                onConnect={handleConnect}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>
              Aucun professionnel ne correspond à votre recherche
            </Text>
          )}
        </View>
        
        {/* Upcoming Networking Events */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Événements de networking à venir</Text>
          
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onRegister={handleRegisterEvent}
            />
          ))}
        </View>
        
        {/* Networking Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Conseils pour réussir votre networking</Text>
          
          <View style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              <Icon name="card-account-details-outline" size={24} color={colors.graduate} />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Préparez votre pitch</Text>
              <Text style={styles.tipDescription}>
                Ayez une présentation claire et concise de votre parcours et de vos objectifs professionnels.
              </Text>
            </View>
          </View>
          
          <View style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              <Icon name="ear-hearing" size={24} color={colors.graduate} />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Écoutez activement</Text>
              <Text style={styles.tipDescription}>
                Le networking n'est pas qu'une question de parler, mais aussi d'écouter et de poser des questions pertinentes.
              </Text>
            </View>
          </View>
          
          <View style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              <Icon name="handshake" size={24} color={colors.graduate} />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Suivez et entretenez vos contacts</Text>
              <Text style={styles.tipDescription}>
                Après une rencontre, envoyez un message personnalisé pour maintenir la connexion.
              </Text>
            </View>
          </View>
        </View>
        
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
    padding: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    width: '30%',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.graduate,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  bannerContainer: {
    marginTop: spacing.lg,
  },
  banner: {
    borderRadius: 16,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.graduate,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginBottom: 4,
  },
  bannerDescription: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  bannerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  sectionContainer: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  professionalCard: {
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  professionalInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  professionalName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  professionalPosition: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  professionalCompany: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  mutualContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mutualText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  connectButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.graduate,
    borderRadius: 8,
  },
  connectedButton: {
    backgroundColor: colors.graduate + '15',
  },
  connectButtonText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.graduate,
  },
  eventCard: {
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
  eventImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: spacing.md,
  },
  eventTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventDetailText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  registerButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    backgroundColor: colors.graduate,
    borderRadius: 8,
  },
  registeredButton: {
    backgroundColor: colors.gray400,
  },
  registerButtonText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.white,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: spacing.xl,
  },
  tipsContainer: {
    marginTop: spacing.xl,
    backgroundColor: colors.gray50,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  tipsTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  tipCard: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.graduate + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});

export default NetworkingScreen; 