import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import CategoryCards from '../components/CategoryCards';
import {getSavedItems, SavedItem} from '../services/storageService';
import {categories} from '../utils/CategoryData';

interface Category {
  id: string;
  label: string;
  image: string;
}

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [recentlyAddedLinks, setRecentlyAddedLinks] = useState<string[]>([]);

  useEffect(() => {
    // Fetch recently added links from your storage service
    const fetchRecentlyAddedLinks = async () => {
      const links: SavedItem[] = await getSavedItems(); // Adjust this based on your storage service implementation
      const linkStrings = links.map(savedItem => savedItem.link); // Assuming there's a 'link' property in SavedItem
      setRecentlyAddedLinks(linkStrings);
    };

    fetchRecentlyAddedLinks();
  }, []);

  const renderItem: React.FC<{item: Category}> = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Category', {category: item.label})}>
      <CategoryCards key={item.id} category={item.label} image={item.image} />
    </TouchableOpacity>
  );

  const renderRecentlyAddedItem = (link: string) => (
    <TouchableOpacity
      onPress={() => {
        if (link) {
          Linking.openURL(link).catch(err =>
            console.error('Error opening link:', err),
          );
        } else {
          console.warn('Link is null or undefined.');
        }
      }}
      style={styles.recentItemContainer}>
      <Icon name="link" size={18} color="#0066cc" style={styles.linkIcon} />
      <Text style={styles.link}>{link}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.subHeading}>Recently Added</Text>
            {recentlyAddedLinks.slice(-5).map((link, index) => (
              <View key={index}>{renderRecentlyAddedItem(link)}</View>
            ))}
          </>
        }
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  link: {
    color: 'blue',
  },
  linkIcon: {
    marginRight: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    width: '100%',
    gap: 30,
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',

    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemCategory: {
    color: '#666',
  },

  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },

  recentItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default HomeScreen;
