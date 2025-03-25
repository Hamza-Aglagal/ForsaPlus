import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const NewsCard = ({ title, date, source, image, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.newsCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.newsImageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.newsImage} />
        ) : (
          <View style={styles.newsImagePlaceholder}>
            <Icon name="newspaper-variant-outline" size={30} color={colors.student} />
          </View>
        )}
      </View>
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle} numberOfLines={2}>{title}</Text>
        <View style={styles.newsMetaContainer}>
          <Text style={styles.newsDate}>{date}</Text>
          <Text style={styles.newsSource}>{source}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const AllNewsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  
  // Example data
  const newsItems = [
    {
      id: '1',
      title: 'Les inscriptions à la faculté de médecine sont désormais ouvertes',
      date: 'Aujourd hui',
      source: 'Ministère de l Éducation',
      category: 'Inscriptions',
      image: null
    },
    {
      id: '2',
      title: 'Salon de l étudiant: Découvrez les meilleures écoles du pays',
      date: 'Hier',
      source: 'ForsaPlus',
      category: 'Événements',
      image: null
    },
    {
      id: '3',
      title: 'Nouvelles filières en intelligence artificielle disponibles',
      date: '2 jours',
      source: 'ENSIAS',
      category: 'Formations',
      image: null
    },
    {
      id: '4',
      title: 'Bourses d excellence pour les bacheliers mention très bien',
      date: '3 jours',
      source: 'Ministère de l Éducation',
      category: 'Bourses',
      image: null
    },
    {
      id: '5',
      title: 'CPGE: Augmentation du nombre de places pour la rentrée 2024',
      date: '5 jours',
      source: 'Direction des CPGE',
      category: 'CPGE',
      image: null
    },
    {
      id: '6',
      title: 'Inauguration du nouveau campus universitaire à Rabat',
      date: '1 semaine',
      source: 'université Mohammed V',
      category: 'Infrastructures',
      image: null
    },
    {
      id: '7',
      title: 'Ateliers de préparation aux entretiens d admission en grandes écoles',
      date: '1 semaine',
      source: 'Encadrement Plus',
      category: 'Événements',
      image: null
    }
  ];

  const categories = ['Tous', 'Inscriptions', 'Formations', 'Bourses', 'Événements', 'CPGE', 'Infrastructures'];

  const filteredNews = newsItems
    .filter(item => 
      (selectedCategory === 'Tous' || item.category === selectedCategory) &&
      (searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Actualités</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="magnify" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une actualité..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        style={styles.categoriesContainer}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredNews.length > 0 ? (
          filteredNews.map(news => (
            <NewsCard 
              key={news.id}
              title={news.title}
              date={news.date}
              source={news.source}
              image={news.image}
              onPress={() => navigation.navigate('NewsDetail', { newsId: news.id })}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="newspaper-variant-outline" size={60} color={colors.gray300} />
            <Text style={styles.emptyText}>Aucune actualité trouvée</Text>
          </View>
        )}
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginRight: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCategory: {
    backgroundColor: colors.student,
  },
  categoryText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  selectedCategoryText: {
    color: colors.white,
    fontWeight: fontWeight.semiBold,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  newsImageContainer: {
    width: 100,
    height: 100,
  },
  newsImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newsImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.student + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsContent: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  newsTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  newsMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsDate: {
    fontSize: fontSize.xs,
    color: colors.student,
  },
  newsSource: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
});

export default AllNewsScreen; 