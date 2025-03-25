import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Share,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSize, fontWeight, lineHeight } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const NewsDetailScreen = ({ route, navigation }) => {
  // In a real app, we'd get this from the route params
  // const { newsId } = route.params;
  // Example data - would be fetched based on newsId in a real app
  const newsItem = {
    id: '1',
    title: 'Les inscriptions à la faculté de médecine sont désormais ouvertes',
    date: '22 Juin 2024',
    source: 'Ministère de l Éducation',
    author: 'Dr. Karim Benani',
    image: null,
    content: `Les inscriptions pour la faculté de médecine sont officiellement ouvertes pour l'année académique 2024-2025. Les étudiants titulaires dun baccalauréat scientifique avec une mention Très Bien sont invités à soumettre leurs candidatures.

Cette année, le processus d'admission a été simplifié pour permettre aux candidats de soumettre leurs dossiers en ligne via la plateforme nationale dédiée. Les documents requis comprennent les relevés de notes du baccalauréat, une copie de la carte d'identité nationale, et une lettre de motivation.

Le Ministère de l'Éducation a annoncé que 1500 places seront disponibles cette année, réparties entre les différentes facultés de médecine du royaume. Les étudiants seront sélectionnés selon leur moyenne générale au baccalauréat et leurs résultats au concours d'entrée qui se tiendra le 15 juillet 2024.

Pour plus d'informations, les candidats peuvent consulter le site officiel du ministère ou contacter directement les facultés de médecine de leur choix.`,
    tags: ['Médecine', 'Inscription', 'université', 'Concours'],
    relatedNews: [
      {
        id: '2',
        title: 'Nouvelles filières en intelligence artificielle disponibles',
        source: 'ENSIAS',
      },
      {
        id: '3',
        title: 'Salon de l étudiant: Découvrez les meilleures écoles du pays',
        source: 'ForsaPlus',
      }
    ]
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${newsItem.title} - Consultez cet article sur OrientApp!`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Icon name="share-variant" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{newsItem.title}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.date}>{newsItem.date}</Text>
            <View style={styles.sourceBadge}>
              <Text style={styles.source}>{newsItem.source}</Text>
            </View>
          </View>
          <Text style={styles.author}>Par {newsItem.author}</Text>
        </View>

        <View style={styles.imageContainer}>
          {newsItem.image ? (
            <Image source={{ uri: newsItem.image }} style={styles.image} />
          ) : (
            <LinearGradient
              colors={colors.studentGradient.secondary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.imagePlaceholder}
            >
              <Icon name="newspaper-variant" size={60} color={colors.white} />
            </LinearGradient>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>{newsItem.content}</Text>

          <View style={styles.tagsContainer}>
            {newsItem.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.relatedNewsSection}>
            <Text style={styles.relatedNewsTitle}>Articles connexes</Text>
            {newsItem.relatedNews.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.relatedNewsItem}
                onPress={() => {}}
              >
                <View style={styles.relatedNewsDot} />
                <Text style={styles.relatedNewsText} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.relatedNewsSource}>{item.source}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
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
  shareButton: {
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
  titleContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    lineHeight: lineHeight.xxl,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  date: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginRight: spacing.md,
  },
  sourceBadge: {
    backgroundColor: colors.student + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 4,
  },
  source: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semiBold,
    color: colors.student,
  },
  author: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  imageContainer: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  contentText: {
    fontSize: fontSize.md,
    lineHeight: lineHeight.lg,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xl,
  },
  tag: {
    backgroundColor: colors.gray100,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  relatedNewsSection: {
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    paddingTop: spacing.lg,
  },
  relatedNewsTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  relatedNewsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  relatedNewsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.student,
    marginRight: spacing.sm,
  },
  relatedNewsText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    fontWeight: fontWeight.medium,
    paddingRight: spacing.sm,
  },
  relatedNewsSource: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
});

export default NewsDetailScreen; 