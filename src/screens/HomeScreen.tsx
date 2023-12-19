// screens/HomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import CategoryCards from '../components/CategoryCards';

interface Link {
  id: string;
  title: string;
  image: string;
  category: string;
}

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // Sample data for saved links
  const savedLinks: Link[] = [
    {
      id: '1',
      title: 'Product 1',
      image: 'https://picsum.photos/200/300',
      category: 'Clothing',
    },
    {
      id: '2',
      title: 'Product 2',
      image: 'https://picsum.photos/200/300',
      category: 'Electronics',
    },
    {
      id: '3',
      title: 'Product 2',
      image: 'https://picsum.photos/200/300',
      category: 'Electronics',
    },
    {
      id: '4',
      title: 'Product 2',
      image: 'https://picsum.photos/200/300',
      category: 'Electronics',
    },
    {
      id: '5',
      title: 'Product 2',
      image: 'https://picsum.photos/200/300',
      category: 'Electronics',
    },
    {
      id: '6',
      title: 'Product 2',
      image: 'https://picsum.photos/200/300',
      category: 'Electronics',
    },
    {
      id: '8',
      title: 'Product 2',
      image: 'https://picsum.photos/200/300',
      category: 'Electronics',
    },
    {
      id: '10',
      title: 'Product 2',
      image: 'https://picsum.photos/200/300',
      category: 'Electronics',
    },
    // Add more sample data as needed
  ];

  const renderItem = ({item}: {item: Link}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('Category', {category: item.category})
      }>
      <CategoryCards
        key={item.id}
        title={item.title}
        category={item.category}
        image={item.image}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Links</Text>
      <FlatList
        data={savedLinks}
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
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
});

export default HomeScreen;
