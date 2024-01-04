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
}

interface SavedItem {
  id: string;
  title: string;
  category: string;
  note: string;
  link: string;
}

const CategoryViewScreen: React.FC<CategoryViewScreenProps> = ({route}) => {
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

  return (
    <View>
      <FlatList
        data={categoryData}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
      />
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
});

export default CategoryViewScreen;
