import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/Navigation';
import {getSavedItems} from '../services/storageService';
import Icon from 'react-native-vector-icons/Feather'; // Import the icon library you choose

interface CategoryViewScreenProps {
  route: RouteProp<RootStackParamList, 'Category'>;
  navigation: any;
}

interface SavedItem {
  id: string;
  title: string;
  category: string;
  note: string;
  link: string;
}

const CategoryViewScreen: React.FC<CategoryViewScreenProps> = ({
  route,
  navigation,
}) => {
  const {category} = route.params;

  const [categoryData, setCategoryData] = useState<SavedItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedItems = await getSavedItems();
        const categoryItems = savedItems.filter(
          item => item.category === category,
        );
        setCategoryData(categoryItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [category]);

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const renderCategoryItem: React.FC<{item: SavedItem}> = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.note}>{item.note}</Text>
      <TouchableOpacity onPress={() => openLink(item.link)}>
        <View style={styles.linkContainer}>
          <Icon name="link" size={20} color="blue" style={styles.linkIcon} />
          <Text style={styles.link}>{item.link}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyCategory = () => (
    <View style={styles.emptyCategoryContainer}>
      <Text style={styles.emptyCategoryText}>No links in this category.</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddLink');
        }}>
        <Text style={styles.addButtonLabel}>Add Link</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      {categoryData.length === 0 ? (
        renderEmptyCategory()
      ) : (
        <FlatList
          data={categoryData}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  note: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkIcon: {
    marginRight: 8,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  emptyCategoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyCategoryText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoryViewScreen;
